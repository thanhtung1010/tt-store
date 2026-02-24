import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { LayoutService } from '@services';
import { TranslatePipe } from '@ngx-translate/core';
import { URLLayoutComponent } from '../url-layout/url-layout';

@Component({
    selector: 'footer',
    templateUrl: './footer.html',
    imports: [TranslatePipe, URLLayoutComponent],
})
export class FooterComponent implements OnInit {

    private readonly _layoutService = inject(LayoutService);
    protected href: WritableSignal<string> = signal('');
    protected host: WritableSignal<string> = signal('');

    constructor() {}

    ngOnInit(): void {
        if (this._layoutService.isBrowser()) {
            this.href.set(location.href);
            this.host.set(location.host);
        }
    }
}
