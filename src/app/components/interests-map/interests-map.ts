import { Component, DestroyRef, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { LayoutService, SvgLoaderService } from '@services';
import * as d3 from 'd3';
import { CATEGORY_COLORS, CATEGORY_COLORS_DARK, INTERESTS_DATA } from '@data';
import { InterestNode } from '@interfaces';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { THEME_ENUM } from '@enums';
import { merge } from 'rxjs';

@Component({
    selector: 'interests-map',
    templateUrl: './interests-map.html',
})
export class InterestsMapComponent implements OnInit {
    @ViewChild('interestMap', { static: true }) interestMap!: ElementRef<HTMLElement>;

    protected readonly me = signal('assets/svg/me.svg').asReadonly();
    protected readonly meDark = signal('assets/svg/me-dark.svg').asReadonly();

    private readonly _layoutService: LayoutService = inject(LayoutService);
    private readonly _svgService: SvgLoaderService = inject(SvgLoaderService);
    private readonly _translateService = inject(TranslateService);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {}

    ngOnInit() {
        if (this._layoutService.isBrowser()) {
            merge(
                this._translateService.onLangChange,
                this._layoutService.theme$
            )
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this.createGraph();
            });
        }
    }

    createGraph() {
        const width = 888;
        const height = 696;
        const isDark = this._layoutService.theme$.value === THEME_ENUM.DARK;
        const colors = isDark ? CATEGORY_COLORS_DARK : CATEGORY_COLORS;
        const baseStroke = isDark ? '#374151' : '#e0e0e0'; // gray-700 : gray-300
        const activeStroke = isDark ? '#4b5563' : '#e8e8e8'; // gray-600 : gray-200
        const textColor = isDark ? '#F5F5F5' : '#00000080'; // gray-300 : #666
        const rootImg = isDark ? this.meDark() : this.me();
        
        // Clear previous if any
        d3.select(this.interestMap.nativeElement).select('svg').remove();

        const svg = d3.create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", `0 0 ${width} ${height}`);

        const centerX = width / 2;
        const centerY = height / 2;

        const mainGroup = svg
            .append('g')
            .attr('transform', `translate(${centerX}, ${centerY})`);

        // 1. Background Concentric Circles
        const circles = [100, 200, 300, 400];
        mainGroup.append('g')
            .attr('class', 'circles')
            .selectAll('circle')
            .data(circles)
            .enter()
            .append('circle')
            .attr('r', d => d)
            .attr('fill', 'none')
            .attr('stroke', baseStroke)
            .attr('stroke-width', 1)
            .each(function(d, i) {
                const circle = d3.select(this);
                // Stagger the start of the animation based on index (smallest first)
                setTimeout(() => {
                    (function repeat() {
                        circle.transition()
                            .duration(5000)
                            .attr('stroke-width', 1)
                            .attr("stroke", activeStroke)
                            .transition()
                            .duration(1000)
                            .attr('stroke-width', 1.5)
                            .attr("stroke", baseStroke)
                            .transition()
                            .duration(1000)
                            .attr('stroke-width', 1)
                            .attr("stroke", activeStroke)
                            .on("end", repeat);
                    })();
                }, i * 200); 
            });

        // 2. Data
        const nodes = INTERESTS_DATA.nodes.map(d => ({ ...d }));
        const links = INTERESTS_DATA.links.map(d => ({ ...d }));

        // Calculate depths
        const depthMap = new Map<string, number>();
        const queue: { id: string, depth: number }[] = [{ id: 'root', depth: 0 }];
        const visited = new Set<string>();
        visited.add('root');
        depthMap.set('root', 0);

        // Precompute adjacency (assuming undirected for traversal)
        const adjacency = new Map<string, string[]>();
        links.forEach(l => {
            const sid = l.source as string;
            const tid = l.target as string;
            if (!adjacency.has(sid)) adjacency.set(sid, []);
            if (!adjacency.has(tid)) adjacency.set(tid, []);
            adjacency.get(sid)!.push(tid);
            adjacency.get(tid)!.push(sid);
        });

        while (queue.length > 0) {
            const current = queue.shift()!;
            const neighbors = adjacency.get(current.id) || [];
            
            neighbors.forEach(nid => {
                if (!visited.has(nid)) {
                    visited.add(nid);
                    const newDepth = current.depth + 1;
                    depthMap.set(nid, newDepth);
                    queue.push({ id: nid, depth: newDepth });
                }
            });
        }

        // 3. Force Simulation
        const simulation = d3.forceSimulation(nodes as any)
            .velocityDecay(0.5) // Higher friction for slower, smoother movement
            .force('link', d3.forceLink(links).id((d: any) => d.id).distance((d) => {
                // Different distances for root connections vs item connections
                if (d.source === 'root' || d.target === 'root') return 60;
                return 80;
            }))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('collide', d3.forceCollide().radius(30))
            .force('radial', d3.forceRadial((d: any) => {
                if (d.type === 'root') return 0;
                if (d.type === 'category') return 120;
                return 320;
            }, 0, 0).strength(0.8));

        // 4. Draw Links
        const link = mainGroup.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter()
            .append('line')
            .attr('stroke', (d: any) => {
                const targetGroup = (d.target as InterestNode).group;
                return colors[targetGroup] || '#ccc';
            })
            .attr('stroke-width', 1.5)
            .attr('opacity', 0.7);

        // 5. Draw Nodes
        const node = mainGroup.append('g')
            .attr('class', 'nodes')
            .selectAll('g')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node');

        // Circle dots for non-root
        node.filter((d: any) => d.type !== 'root')
            .append('circle')
            .attr('r', (d: any) => {
                const depth = depthMap.get(d.id) || 1; 
                // Level 1 (Category): depth 1 -> r=4
                // Level 2 (Item): depth 2 -> r=3
                // Level 3 (Sub-item): depth 3 -> r=2
                // Formula: 5 - depth
                return Math.max(2, 5 - depth); 
            })
            .attr('fill', (d: any) => colors[d.group] || '#ccc');

        // Root Node (Image)
        const rootNode = node.filter((d: any) => d.type === 'root');

        // Placeholder for user image - using a generic person icon if no specific asset
        // User image in screenshot shows a person on stool. 
        // I will use a placeholder circle/rect or try to load an asset if I knew one.
        // For now, I'll use a larger circle or a foreignObject with an img tag if I had a URL.
        // I'll stick to a styled circle/text for "ME" or similar for now, 
        // as I don't have the "person on chair" asset.
        // Actually, let's make it invisible but present, and maybe put an image tag if user provides one.
        // Or better, just a central black dot as placeholder or "Me" text.
        // User requested "match UI picture". 
        // I'll add an image element but point to a placeholder.
        rootNode.append('image')
            .attr('href', rootImg)
            .attr('width', 100)
            .attr('height', 100)
            .attr('x', -50)
            .attr('y', -50);

        // Labels
        node.append('text')
            .text((d: any) => d.type === 'root' ? '' : this._translateService.instant(d.label))
            .attr('font-size', '10px')
            .attr('fill', textColor)
            .attr('dx', 8)
            .attr('dy', 4)
            // .style('pointer-events', 'none')
            // Add background to text for readability?
            // Image shows text next to dots.

        // 6. Simulation Tick
        simulation.on('tick', () => {
            link
                .attr('x1', (d: any) => d.source.x)
                .attr('y1', (d: any) => d.source.y)
                .attr('x2', (d: any) => d.target.x)
                .attr('y2', (d: any) => d.target.y);

            node
                .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
        
            // Update positions of the background glows as well
            bgGroup.selectAll('circle')
                 .attr('cx', (d: any) => d.x)
                 .attr('cy', (d: any) => d.y);
        });

        // 7. Hover Effects
        const bgGroup = mainGroup.insert('g', '.links').attr('class', 'backgrounds'); // Insert before links

        const handleMouseOver = (event: any, d: any) => {
            if (d.type === 'root') return;

            const connectedNodes = new Set<string>();
            connectedNodes.add(d.id);

            // Recursive function to find all descendants
            const findDescendants = (parentId: string) => {
                links.forEach((l: any) => {
                    // Check if link source is the parent
                    const sourceId = typeof l.source === 'object' ? l.source.id : l.source;
                    const targetId = typeof l.target === 'object' ? l.target.id : l.target;
                    
                    if (sourceId === parentId) {
                        if (!connectedNodes.has(targetId)) {
                            connectedNodes.add(targetId);
                            findDescendants(targetId); // Recurse
                        }
                    }
                });
            };

            findDescendants(d.id);

            const nodesToHighlight = nodes.filter((n: any) => connectedNodes.has(n.id));

            // Add glow circles
            const glows = bgGroup.selectAll('.glow')
                .data(nodesToHighlight, (n: any) => n.id);

            glows.enter()
                .append('circle')
                .attr('class', 'glow')
                .attr('r', 0)
                .attr('fill', (n: any) => colors[n.group])
                .attr('opacity', .07)
                .attr('cx', (n: any) => n.x)
                .attr('cy', (n: any) => n.y)
                .transition().duration(200)
                .attr('r', 40);
        };

        const handleMouseOut = (event: any, d: any) => {
            // Remove glows
            bgGroup.selectAll('.glow')
                .transition().duration(200)
                .attr('r', 0)
                .attr('opacity', 0)
                .remove();
        };

        // Attach listeners to groupings mostly (so text and dot trigger it)
        // But maybe just the dot/text? The <g> contains both.
        // Attaching to the <g> element node.
        node.on('mouseover', handleMouseOver)
            .on('mouseout', handleMouseOut)
            .style('cursor', 'pointer');

        // 8. Drag Behavior
        const drag = (simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>) => {
            function dragstarted(event: any) {
                if (!event.active) simulation.alphaTarget(0.1).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
                // Store original position
                event.subject.ox = event.subject.x;
                event.subject.oy = event.subject.y;
            }

            function dragged(event: any) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            }

            function dragended(event: any) {
                if (!event.active) simulation.alphaTarget(0);

                const node = event.subject;
                const startX = node.ox;
                const startY = node.oy;

                // Animate back to original position
                d3.transition()
                    .duration(1000)
                    .ease(d3.easePolyOut)
                    .tween("return", () => {
                        const iX = d3.interpolateNumber(node.fx, startX);
                        const iY = d3.interpolateNumber(node.fy, startY);
                        return (t) => {
                            node.fx = iX(t);
                            node.fy = iY(t);
                            // Keep simulation alive or nudge it? 
                            // Actually since we are setting fx/fy, the tick updates the SVG.
                            // Simulation tick updates node.x/y based on fx/fy.
                            // But we need to make sure 'tick' is running or manually update?
                            // Simulation runs because we set alphaTarget(0) but alpha decays slowly.
                            // If alpha hits 0, simulation stops.
                            // We can manually call simulation.tick() here? 
                            // Or just simulation.alpha(0.1).restart() if it stopped?
                            // Let's rely on fx/fy updates usually propagating if valid.
                            // Wait, if simulation stopped, 'tick' event won't fire.
                            // We should probably just rely on the force layout to pull it back 
                            // by NOT using this manual tween if 'velocityDecay' was enough.
                            // But user explicitly asked to "find first begin x y then move it".
                            // So manual tween is safer for "exact return".
                            simulation.alpha(0.1).restart(); 
                        };
                    })
                    .on("end", () => {
                        node.fx = null;
                        node.fy = null;
                    });
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        }

        // Apply drag
        node.call(drag(simulation) as any);

        this.interestMap.nativeElement.appendChild(svg.node() as Node);
    }
}
