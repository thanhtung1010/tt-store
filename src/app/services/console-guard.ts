import { Injectable, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConsoleGuardService {
    private readonly _platformId = inject(PLATFORM_ID);

    init(): void {
        if (isPlatformBrowser(this._platformId)) {
            this._logWarning();
        }
    }

    private _logWarning(): void {
        const titleStyle = [
            'color: #ff0033',
            'font-size: 30px',
            'font-weight: bold',
            'text-shadow: 2px 2px black',
        ].join(';');

        const bodyStyle = [
            'color: #ffffff',
            'font-size: 12px',
            'background-color: #ff0033',
            'padding: 12px',
            'border-radius: 8px',
        ].join(';');

        const linkStyle = [
            'color: #3498db',
            'font-size: 12px',
            'font-weight: semibold',
            'text-decoration: underline',
        ].join(';');

        setTimeout(() => {
            console.log('%cSTOP!', titleStyle);
            console.log(
                '%cThis is a browser feature intended for developers. If you are looking to clone this project or contribute, please visit the GitHub repository. Do not paste any code here unless you know exactly what you are doing.',
                bodyStyle
            );
            console.log(
                '%cGitHub: https://github.com/thanhtung1010/tt-angular-portfolio',
                linkStyle
            );
        }, 1000);
    }
}
