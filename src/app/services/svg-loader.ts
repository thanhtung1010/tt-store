import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, map, Observable, of, shareReplay, tap } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class SvgLoaderService {
    private readonly _http = inject(HttpClient);
    private readonly _sanitizer = inject(DomSanitizer);
    private readonly _cache = new Map<string, string>();
    private readonly _inProgressRequests = new Map<string, Observable<string>>();

    getSvg(url: string): Observable<string> {
        const cached = this._cache.get(url);

        if (cached) {
            return of(cached);
        }

        if (this._inProgressRequests.has(url)) {
            return this._inProgressRequests.get(url)!;
        }

        const request$ = this._http.get(url, { responseType: 'text' }).pipe(
            tap((svg) => this._cache.set(url, svg)),
            finalize(() => this._inProgressRequests.delete(url)),
            shareReplay(1)
        );

        this._inProgressRequests.set(url, request$);
        return request$;
    }

    getSvgInnerHTML(url: string): Observable<SafeHtml> {
        return this.getSvg(url).pipe(
            map((svg) => this._sanitizer.bypassSecurityTrustHtml(svg))
        );
    }
}
