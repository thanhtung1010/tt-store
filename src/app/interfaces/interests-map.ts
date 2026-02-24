export interface InterestNode {
    id: string;
    label: string;
    group: string; // Used for coloring
    type: 'root' | 'category' | 'item';
    x?: number;
    y?: number;
    fx?: number | null;
    fy?: number | null;
}

export interface InterestLink {
    source: string;
    target: string;
}

export interface InterestGraph {
    nodes: InterestNode[];
    links: InterestLink[];
}
