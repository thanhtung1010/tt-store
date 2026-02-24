import { Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CookieService {

    get isBrowser(): WritableSignal<boolean> {
        return this._isBrowser;
    }
    private readonly _isBrowser = signal(false);

    constructor(@Inject(PLATFORM_ID) platformId: Object) {
        this._isBrowser.set(isPlatformBrowser(platformId));
    }

    get(name: string): string {
        if (!this._isBrowser()) {
            return '';
        }
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return '';
    }

    set(name: string, value: string, days: number = 365) {
        if (!this._isBrowser()) {
            return;
        }
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    check(name: string): boolean {
        if (!this._isBrowser()) {
            return false;
        }
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return true;
        }
        return false;
    }
}
