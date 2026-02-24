import { Component, DestroyRef, ElementRef, inject, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ILottieConfig } from '@interfaces';
import { LanguageService, LayoutService } from '@services';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';
import { TranslatePipe } from '@ngx-translate/core';
import { LangToggleComponent } from '../lang-toggle/lang-toggle';

@Component({
    selector: 'setting',
    templateUrl: './setting.html',
    imports: [LottieAnimationComponent, ThemeToggleComponent, LangToggleComponent, TranslatePipe],
})
export class SettingComponent implements OnInit {
    @ViewChild('rollingCat') lottieAnimation!: LottieAnimationComponent;
    @ViewChild('settingMenu') settingMenu!: ElementRef;
    @ViewChild('settingBtn') settingBtn!: ElementRef;

    protected readonly visibleSetting = signal(false);
    private readonly _destroyRef = inject(DestroyRef);
    private readonly _renderer = inject(Renderer2);
    private _unlistenDocumentClick?: () => void;

    protected readonly layoutService = inject(LayoutService);
    protected readonly langService = inject(LanguageService);
    protected readonly lottie: WritableSignal<ILottieConfig> = signal({
        src: 'https://lottie.host/23a6234e-15a8-4525-a318-fd223f51eb4d/EOWggRjGh8.lottie',
        loop: false,
        autoplay: false,
    });

    constructor() {}

    ngOnInit() {
        this.layoutService.setting$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(resp => {
            this.visibleSetting.set(resp);
            if (resp) {
                setTimeout(() => {
                    this._addDocumentClickListener();
                });
            } else {
                this._removeDocumentClickListener();
            }
        });
    }

    private _addDocumentClickListener() {
        if (!this._unlistenDocumentClick && this.layoutService.isBrowser()) {
            this._unlistenDocumentClick = this._renderer.listen('document', 'click', (event: MouseEvent) => {
                this._handleDocumentClick(event);
            });
        }
    }

    private _removeDocumentClickListener() {
        if (this._unlistenDocumentClick) {
            this._unlistenDocumentClick();
            this._unlistenDocumentClick = undefined;
        }
    }

    private _handleDocumentClick(event: MouseEvent) {
        if (this.visibleSetting()) {
            const isMenu = this.settingMenu?.nativeElement?.contains(event.target);
            const isBtn = this.settingBtn?.nativeElement?.contains(event.target);

            if (!isMenu && !isBtn) {
                this.toggleExpandSetting();
            }
        }
    }

    toggleExpandSetting() {
        this.layoutService.toggleSetting();
        this.lottieAnimation?.play();
    }
}
