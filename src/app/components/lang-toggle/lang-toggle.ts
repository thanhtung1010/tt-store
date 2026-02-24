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
    selector: 'lang-toggle',
    templateUrl: './lang-toggle.html',
    imports: [
        NgClass,
        AsyncPipe,
    ],
})
export class LangToggleComponent implements OnChanges {
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

    protected readonly border = signal('/assets/svg/lang-toggle/border.svg').asReadonly();
    protected readonly start = signal('/assets/svg/lang-toggle/star.svg').asReadonly();
    protected readonly en = signal('/assets/svg/lang-toggle/en.svg').asReadonly();
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
