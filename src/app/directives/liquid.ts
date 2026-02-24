import { DestroyRef, Directive, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { LayoutService } from "@services";
import { BehaviorSubject } from "rxjs";

@Directive({
    selector: '[liquid]',
})
export class LiquidDirective implements OnInit {
    @Input() customLiquidClass: string = '';

    @Input()
    get applyLiquid() {
        return this._applyLiquid;
    }
    set applyLiquid(value: boolean) {
        this._applyLiquid = !!value;
        this._renderLiquid.next(this._applyLiquid);
    }
    private _applyLiquid = true;

    private readonly _liquidWrap: string = 'tfe-liquid';
    private readonly _liquiIdPrefix: string = new Date().valueOf().toString();
    private readonly _liquidClass: string[] = [
        'tfe-liquid-effect',
        'tfe-liquid-tint',
        'tfe-liquid-shine',
    ];
    private readonly _renderLiquid: BehaviorSubject<boolean> = new BehaviorSubject(true);
    private readonly _element: ElementRef<HTMLElement> = inject(ElementRef);
    private readonly _layoutService = inject(LayoutService);
    private readonly _destroyRef = inject(DestroyRef);

    constructor() {}

    ngOnInit(): void {
        this._renderLiquid.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(resp => {
            if (this._layoutService.isBrowser()) {
                if (resp) {
                    this._mapLiquidStyle();
                } else {
                    this._removeLiquidStyle();
                }
            }
        });
    }

    private _mapLiquidStyle() {
        this._addLiquidClass();
        this._addBGElement();
    }

    private _removeLiquidStyle() {
        this._removeLiquidClass();
        this._removeBGElement();
    }

    private _addLiquidClass() {
        const cls = this._element.nativeElement.className;
        this._element.nativeElement.className = [cls, this._liquidWrap].join(' ');
    }

    private _removeLiquidClass() {
        const cls = this._element.nativeElement.className;
        this._element.nativeElement.className = cls.split(' ').filter(cls => cls !== this._liquidWrap).join(' ');
    }

    private _addBGElement() {
        const styleElms: HTMLDivElement[] = this._liquidClass.map(cls => {
            const div = document.createElement('div');
            const id = `${cls}-${this._liquiIdPrefix}`;
            const divCls = [cls, this.customLiquidClass].filter(cls => cls).join(' ');
            div.setAttribute('id', id);
            div.setAttribute('class', divCls);

            return div;
        });
        this._element.nativeElement.prepend(...styleElms);
    }

    private _removeBGElement() {
        this._liquidClass.forEach(cls => {
            const id = `${cls}-${this._liquiIdPrefix}`;
            const div = document.getElementById(id);
            if (div) {
                this._element.nativeElement.removeChild(div);
            }
        });
    }
}
