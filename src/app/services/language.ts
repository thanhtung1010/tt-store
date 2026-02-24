import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGE_ENUM } from '@enums';
import { BehaviorSubject } from 'rxjs';
import { COOKIE_LANG } from '@data';
import { CookieService } from './cookie';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    private readonly _translateService = inject(TranslateService);
    private readonly _cookieService = inject(CookieService);

    get lang$(): BehaviorSubject<LANGUAGE_ENUM> {
        return this._lang$;
    }
    set lang$(lang: LANGUAGE_ENUM) {
        const checkedLang = this._checkLang(lang);
        this._translateService.use(checkedLang);
        this._lang$.next(checkedLang);
    }
    private readonly _lang$ = new BehaviorSubject<LANGUAGE_ENUM>(LANGUAGE_ENUM.EN);

    readonly isVI = signal(false);
    readonly isEN = signal(false);

    get currentLang() {
        return this._lang$.value;
    }

    constructor() {}

    init() {
        this._translateService.addLangs([LANGUAGE_ENUM.EN, LANGUAGE_ENUM.VI]);
        this._translateService.setFallbackLang(LANGUAGE_ENUM.EN);
        
        const cookieLang = this._cookieService.get(COOKIE_LANG);
        const browserLang = this._translateService.getBrowserLang();
        const langToCheck = cookieLang || browserLang;
        
        const lang = this._checkLang(langToCheck);
        this._changeLang(lang);
    }

    onToggleLang() {
        const currentLang = this.lang$.value;
        const lang = currentLang === LANGUAGE_ENUM.VI ? LANGUAGE_ENUM.EN : LANGUAGE_ENUM.VI;
        this._changeLang(lang);
    }

    private _changeLang(lang: LANGUAGE_ENUM) {
        this.lang$ = lang;
        this.isVI.set(lang === LANGUAGE_ENUM.VI);
        this.isEN.set(lang === LANGUAGE_ENUM.EN);
        this._cookieService.set(COOKIE_LANG, lang);
    }

    private _checkLang(lang: string | undefined) {
        const langChecked = lang?.match(/en|vi/) ? lang as LANGUAGE_ENUM : LANGUAGE_ENUM.EN;
        return langChecked;
    }
}
