import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    inject,
    Input,
    OnChanges,
    Renderer2,
    signal,
    SimpleChanges
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgLoaderService } from '@services';

@Component({
    selector: 'svg-loader',
    standalone: true,
    templateUrl: './svg-loader.html',
})
export class SvgLoaderComponent implements AfterViewInit, OnChanges {
    @Input({required: true}) src!: string;
    @Input() size!: number | string;
    @Input() width!: number | string;
    @Input() height!: number | string;
    @Input() viewBox: string = '';
    @Input() color: string = 'currentColor';

    private _renderer: Renderer2 = inject(Renderer2);
    private _svgService: SvgLoaderService = inject(SvgLoaderService);
    private _elementRef: ElementRef = inject(ElementRef<HTMLElement>);
    private _sanitizer: DomSanitizer = inject(DomSanitizer);
    private readonly defaultSize: number = 24;
    protected svgContent = signal('');

    constructor() {
        effect(() => {
            if (this.svgContent()) {
                this._renderSvg();
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['src']?.currentValue) {
            this._loadSvg();
        } else if (!changes['src']?.currentValue) {
            this._clear();
        }
    }

    ngAfterViewInit() {
        this._loadSvg();
    }

    private _clear() {
        while (this._elementRef.nativeElement.firstChild) {
            this._renderer.removeChild(
                this._elementRef.nativeElement,
                this._elementRef.nativeElement.firstChild
            );
        }
    }

    private _loadSvg() {
        if (!this.src) return;

        this._svgService.getSvg(this.src).subscribe((raw) => {
            this.svgContent.set(raw);
        });
    }

    private _renderSvg() {
        this._clear();
        const svgContent = this._sanitizer.bypassSecurityTrustHtml(this.svgContent());
        if (!svgContent) {
            this._showErrorIcon();
            return;
        }

        const div = this._renderer.createElement('div');
        div.innerHTML = svgContent;

        let svgEl: SVGElement = div.querySelector('svg');
        if (!svgEl) return;

        svgEl = this._svgSize(svgEl);
        const stroke = svgEl.getAttribute('stroke');
        if (!stroke) {
            svgEl.setAttribute('stroke', this.color);
        }
        const fill = svgEl.getAttribute('fill');
        if (!fill) {
            svgEl.setAttribute('fill', this.color);
        }

        // Insert into container
        this._renderer.appendChild(this._elementRef.nativeElement, svgEl);
    }

    private _svgSize(svgEl: SVGElement): SVGElement {
        if (this.size) {
            if (typeof this.size === 'number') {
                svgEl.style.width = `${this.size}px`;
                svgEl.style.height = `${this.size}px`;
            } else {
                svgEl.style.width = this.size;
                svgEl.style.height = this.size;
            }
            return svgEl;
        }

        if (this.width) {
            if (typeof this.width === 'number') {
                svgEl.style.width = `${this.width}px`;
                svgEl.style.height = `auto`;
            } else {
                svgEl.style.width = this.width;
                svgEl.style.height = `auto`;
            }
            return svgEl;
        }

        if (this.height) {
            if (typeof this.height === 'number') {
                svgEl.style.height = `${this.height}px`;
                svgEl.style.width = `auto`;
            } else {
                svgEl.style.height = this.height;
                svgEl.style.width = `auto`;
            }
            return svgEl;
        }

        svgEl.style.width = `${this.defaultSize}px`;
        svgEl.style.height = `${this.defaultSize}px`;
        return svgEl;
    }

    private _showErrorIcon(): void {
        const errorSvg = `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`;
        const div = this._renderer.createElement('div');
        div.innerHTML = errorSvg;
        let svgElement = div.querySelector('svg');
        if (svgElement) {
            svgElement = this._svgSize(svgElement);
            this._renderer.appendChild(this._elementRef.nativeElement, svgElement);
        }
    }
}
