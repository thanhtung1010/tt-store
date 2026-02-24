import { AsyncPipe, NgClass } from '@angular/common';
import {
    Component,
    effect,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    Output,
    signal,
    SimpleChanges,
    WritableSignal,
} from '@angular/core';
import { SvgLoaderService } from '@services';

@Component({
    selector: 'theme-toggle',
    templateUrl: './theme-toggle.html',
    imports: [
        NgClass,
        AsyncPipe,
    ],
})
export class ThemeToggleComponent implements OnChanges {
    /**
     * Width of the component.
     *   - A number (e.g. `10`) → interpreted as `number * 4px`. So `10` → `'40px'`.
     *   - Height = width / 2.
     */
    @Input() width: number = 10;
    @Input()
    get value(): boolean {
        return this._value();
    }
    set value(value: boolean) {
        this._value.set(value);
    }
    private _value: WritableSignal<boolean> = signal(false);
    @Output() valueChange: EventEmitter<boolean> = new EventEmitter();

    @Input()
    get disabled(): boolean {
        return this._disabled();
    }
    set disabled(disabled: boolean) {
        this._disabled.set(disabled);
    }
    private _disabled: WritableSignal<boolean> = signal(false);
    @Output() disabledChange: EventEmitter<boolean> = new EventEmitter();

    protected readonly mdPolygonToggle = signal('/assets/svg/theme-toggle/md-polygon-toggle.svg').asReadonly();
    protected readonly smPolygonToggle = signal('/assets/svg/theme-toggle/sm-polygon-toggle.svg').asReadonly();
    protected readonly bgLightToggle = signal('/assets/svg/theme-toggle/bg-light-toggle.svg').asReadonly();
    protected readonly cloudBlurToggle = signal('/assets/svg/theme-toggle/cloud-blur-toggle.svg').asReadonly();
    protected readonly cloudLightToggle = signal('/assets/svg/theme-toggle/cloud-light-toggle.svg').asReadonly();
    protected readonly moonToggle = signal('/assets/svg/theme-toggle/moon-toggle.svg').asReadonly();
    protected readonly sunToggle = signal('/assets/svg/theme-toggle/sun-toogle.svg').asReadonly();
    protected readonly duration: number = 1000;
    protected readonly step: number = 4;
    protected height: number = 5;

    btnWidth: number = this.width * this.step;
    btnHeight: number = this.height * this.step;
    durationCls: string = `*:duration-500!`;

    protected readonly svg = inject(SvgLoaderService);

    constructor() {
        effect(() => {
            this.valueChange.emit(this.value);
        });

        effect(() => {
            this.disabledChange.emit(this.disabled);
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['width'] && typeof this.width === 'number') {
            this.height = this.width / 2;
            this.btnWidth = this.width * this.step;
            this.btnHeight = this.height * this.step;
        }
    }

    onClickToggle() {
        this.onDisableChange();
        this.onValueChange();
        const _timeout = setTimeout(() => {
            this.onDisableChange();
            clearTimeout(_timeout);
        }, this.duration);
    }

    onValueChange(value?: boolean) {
        if (typeof value === 'boolean') {
            this.value = value;
        } else {
            this.value = !this.value;
        }
        this.valueChange.emit(this.value);
    }

    onDisableChange(disabled?: boolean) {
        if (typeof disabled === 'boolean') {
            this.disabled = disabled;
        } else {
            this.disabled = !this.disabled;
        }
        this.disabledChange.emit(this.disabled);
    }
}
