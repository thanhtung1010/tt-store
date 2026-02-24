import { isPlatformBrowser } from "@angular/common";
import { inject, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { THEME_ENUM } from "@enums";
import { DEFAULT_THEME } from "@data";
import { COOKIE_THEME } from "@data";
import { CookieService } from "./cookie";

@Injectable({
    providedIn: 'any'
})
export class LayoutService {

    get loading$(): BehaviorSubject<boolean> {
        return this._loading$;
    }
    set loading$(loading: boolean) {
        const value = !!loading;
        if (value !== this._loading$.value) {
            this._loading$.next(value);
        }
    }
    private readonly _loading$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    get setting$(): BehaviorSubject<boolean> {
        return this._setting$;
    }
    set setting$(visible: boolean) {
        const value = !!visible;
        if (value !== this._setting$.value) {
            this._setting$.next(value);
        }
    }
    private readonly _setting$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    get theme$(): BehaviorSubject<THEME_ENUM> {
        return this._theme$;
    }
    set theme$(theme: THEME_ENUM) {
        if (theme !== this._theme$.value) {
            this._theme$.next(theme);
        }
    }
    private readonly _theme$: BehaviorSubject<THEME_ENUM> = new BehaviorSubject(DEFAULT_THEME);

    /**@var isThemeDefault is light theme */
    readonly isThemeDefault = signal(true);

    get isBrowser(): WritableSignal<boolean> {
        return this._isBrowser;
    }
    set isBrowser(value: boolean) {
        if (value !== this._isBrowser()) {
            this._isBrowser.set(value);
        }
    }
    private _isBrowser = signal<boolean>(false);

    private readonly _hiddenClass: string = 'tfe-hidden-scroll';

    private readonly _cookieService = inject(CookieService);

    constructor() {
        this.isBrowser.set(this._cookieService.isBrowser());
        this._initTheme();
    }

    private _initTheme() {
        if (this._isBrowser()) {
            const theme = this._cookieService.get(COOKIE_THEME) as THEME_ENUM;
            if (theme) {
                this.theme$ = theme;
                this.isThemeDefault.set(theme === THEME_ENUM.LIGHT);
                this.updateThemeClass(theme);
            }
        }
    }

    updateThemeClass(theme: THEME_ENUM) {
        this._updateHtmlClass(THEME_ENUM.LIGHT, 'remove');
        this._updateHtmlClass(THEME_ENUM.DARK, 'remove');
        this._updateHtmlClass(theme, 'add');
    }

    private _updateBodyClass(cls: string, action: 'add' | 'remove') {
        if (this._isBrowser()) {
            const body = document.querySelector('body');
            if (body) {
                if (action === 'add') {
                    body.classList.add(cls);
                } else {
                    body.classList.remove(cls);
                }
            }
        }
    }

    private _updateHtmlClass(cls: string, action: 'add' | 'remove') {
        if (this._isBrowser()) {
            const html = document.documentElement;
            if (html) {
                if (action === 'add') {
                    html.classList.add(cls);
                } else {
                    html.classList.remove(cls);
                }
            }
        }
    }

    toggleScroll(selector: string) {
        const elm = document.querySelector(selector);
        if (elm) {
            const cls = elm.className;
            if (cls.includes(this._hiddenClass)) {
                elm.className = cls.replace(this._hiddenClass, '').trim();
                this._updateBodyClass(this._hiddenClass, 'remove');
            } else {
                elm.className = [cls, this._hiddenClass].join(' ');
                this._updateBodyClass(this._hiddenClass, 'add');
            }
        }
    }

    toggleSetting() {
        const value = !this.setting$.value;
        this.setting$ = value;
    }

    toggleTheme() {
        const current = this.theme$.value;
        const next = current === THEME_ENUM.LIGHT ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;
        this.theme$ = next;
        this.isThemeDefault.set(next === THEME_ENUM.LIGHT);
        this._cookieService.set(COOKIE_THEME, next);
    }
}
