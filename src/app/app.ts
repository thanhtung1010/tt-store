import {
    AfterViewInit,
    Component,
    DestroyRef,
    inject,
    signal,
    WritableSignal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    FooterComponent,
    HeaderComponent,
    LottieAnimationComponent,
    MainComponent,
    SettingComponent,
} from '@components';
import { LayoutService, LanguageService, ConsoleGuardService } from '@services';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, skip } from 'rxjs';

@Component({
    selector: 'tfe-root',
    templateUrl: './app.html',
    imports: [
        HeaderComponent,
        MainComponent,
        FooterComponent,
        SettingComponent,
        LottieAnimationComponent,
    ],
})
export class App implements AfterViewInit {
    protected readonly lottie = signal(
        'https://lottie.host/9b524a98-c3d4-415f-b4f3-a79bf4c3d395/b1FArc0UlB.lottie'
    );
    protected loading: WritableSignal<boolean> = signal(true);
    private _timeoutLoading!: NodeJS.Timeout;

    private readonly _destroyRef = inject(DestroyRef);
    private readonly _languageService = inject(LanguageService);
    private readonly _layoutService = inject(LayoutService);
    private readonly _titleService = inject(Title);
    private readonly _translateService = inject(TranslateService);
    private readonly _consoleGuardService = inject(ConsoleGuardService);

    constructor() {
        this._languageService.init();
        this._consoleGuardService.init();
    }

    ngAfterViewInit(): void {
        this._layoutService.loading$
            .pipe(
                skip(1),
                takeUntilDestroyed(this._destroyRef),
                debounceTime(500),
            )
            .subscribe((resp) => {
                this.loading.set(resp);

                if (this._layoutService.isBrowser()) {
                    this._layoutService.toggleScroll('app-root');
                }
            });

        this._layoutService.theme$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(theme => {
            this._layoutService.updateThemeClass(theme);
        });

        this._translateService.stream('PAGE_TITLE').pipe(takeUntilDestroyed(this._destroyRef)).subscribe((title: string) => {
            this._titleService.setTitle(title);
        });
    }

    lottieStartLoad() {
        if (this._timeoutLoading) {
            clearTimeout(this._timeoutLoading);
        }

        this._timeoutLoading = setTimeout(() => {
            this._layoutService.loading$ = !this.loading();
            clearTimeout(this._timeoutLoading);
        }, 1500);
    }
}
