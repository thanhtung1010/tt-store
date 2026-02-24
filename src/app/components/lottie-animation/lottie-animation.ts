import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    signal,
    SimpleChanges,
    ViewChild,
    WritableSignal
} from '@angular/core';
import {
    CompleteEvent,
    DestroyEvent,
    DotLottie,
    LoadErrorEvent,
    LoadEvent,
    PlayEvent,
    ReadyEvent,
    RenderErrorEvent,
    RenderEvent
} from '@lottiefiles/dotlottie-web';
import { ILottieConfig } from '@interfaces';
import { LayoutService } from '@services';

@Component({
    selector: 'lottie-animation',
    templateUrl: './lottie-animation.html',
})
export class LottieAnimationComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild('dotlottieCanvas') dotlottieCanvas!: ElementRef<HTMLCanvasElement>;
    @Input() config!: ILottieConfig | string;

    @Input()
    get width(): number {
        return this._width();
    }
    set width(width: any) {
        width = Number.isNaN(+width) ? this._defaultWidth : +width;
        this._width.set(width);
    }
    private _width: WritableSignal<number> = signal(300);

    @Input()
    get height(): number {
        return this._height();
    }
    set height(height: any) {
        height = Number.isNaN(+height) ? this._defaultHeight : +height;
        this._height.set(height);
    }
    private _height: WritableSignal<number> = signal(300);

    @Output() loadChange = new EventEmitter<LoadEvent>();
    @Output() loadErrorChange = new EventEmitter<LoadErrorEvent>();
    @Output() renderChange = new EventEmitter<RenderEvent>();
    @Output() renderErrorChange = new EventEmitter<RenderErrorEvent>();
    @Output() readyChange = new EventEmitter<ReadyEvent>();
    @Output() destroyChange = new EventEmitter<DestroyEvent>();
    @Output() completeChange = new EventEmitter<CompleteEvent>();
    @Output() playChange = new EventEmitter<PlayEvent>();

    private readonly _layoutService = inject(LayoutService);
    private _dotLottie: WritableSignal<DotLottie | null> = signal(null);
    private _canvas: WritableSignal<HTMLCanvasElement | null> = signal(null);;
    private _config: WritableSignal<ILottieConfig> = signal({});;
    private readonly _defaultWidth: number = 300;
    private readonly _defaultHeight: number = 300;
    protected readonly defaultConfig: ILottieConfig = {
        autoplay: true,
        loop: true,
    };

    constructor() {}

    ngOnInit() {
        // this.loadLottie();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && !changes['config'].firstChange && this.config) {
            this.loadLottie();
        }
    }

    ngAfterViewInit(): void {
        this.loadLottie();
    }

    ngOnDestroy(): void {
        this.destroy();
        this._removeListener();
    }

    loadLottie() {
        this._combineConfig();
        if (!this._dotLottie()) {
            this.initLottie();
        } else {
            this._dotLottie()?.load({...this._config()});
        }
    }

    initLottie() {
        if (this._layoutService.isBrowser()) {
            const canvas = this.dotlottieCanvas?.nativeElement;
            if (canvas) {
                this._canvas.set(canvas);
                this._dotLottie.set(new DotLottie({
                    ...this._config(),
                    canvas,
                }));
                this._setupListener();
            }
        }
    }

    stop() {
        this._dotLottie()?.stop();
    }

    pause() {
        this._dotLottie()?.pause();
    }

    play() {
        this._dotLottie()?.play();
    }

    destroy() {
        this._dotLottie()?.destroy();
    }

    private _setupListener() {
        this._dotLottie()?.addEventListener("load", this._listenerLoad);
        this._dotLottie()?.addEventListener("loadError", this._listenerLoadError);
        // this._dotLottie()?.addEventListener("render", this._listenerRender);
        this._dotLottie()?.addEventListener("renderError", this._listenerRenderError);
        this._dotLottie()?.addEventListener("ready", this._listenerReady);
        this._dotLottie()?.addEventListener("complete", this._listenerComplete);
        this._dotLottie()?.addEventListener("destroy", this._listenerDestroy);
        this._dotLottie()?.addEventListener("play", this._listenerPlay);
    }

    private _removeListener() {
        this._dotLottie()?.removeEventListener("load", this._listenerLoad);
        this._dotLottie()?.removeEventListener("loadError", this._listenerLoadError);
        // this._dotLottie()?.removeEventListener("render", this._listenerRender);
        this._dotLottie()?.removeEventListener("renderError", this._listenerRenderError);
        this._dotLottie()?.removeEventListener("ready", this._listenerReady);
        this._dotLottie()?.removeEventListener("complete", this._listenerComplete);
        this._dotLottie()?.removeEventListener("destroy", this._listenerDestroy);
        this._dotLottie()?.removeEventListener("play", this._listenerPlay);
    }

    private _listenerRender = (e: RenderEvent) => {
        this.renderChange.emit(e);
    }

    private _listenerRenderError = (e: RenderErrorEvent) => {
        this.renderErrorChange.emit(e);
    }

    private _listenerLoad = (e: LoadEvent) => {
        this.loadChange.emit(e);
    }

    private _listenerLoadError = (e: LoadErrorEvent) => {
        this.loadErrorChange.emit(e);
    }

    private _listenerReady = (e: ReadyEvent) => {
        this.readyChange.emit(e);
    }

    private _listenerComplete = (e: CompleteEvent) => {
        this.completeChange.emit(e);
    }

    private _listenerDestroy = (e: DestroyEvent) => {
        this.destroyChange.emit(e);
    }

    private _listenerPlay = (e: PlayEvent) => {
        this.playChange.emit(e);
    }

    private _combineConfig() {
        const defaultConfig = {
            ...this.defaultConfig,
        };
        if (typeof this.config === 'string') {
            this._config.set({
                ...defaultConfig,
                src: this.config,
            });
        } else {
            this._config.set({
                ...defaultConfig,
                ...this.config,
            });
        }
    }
}
