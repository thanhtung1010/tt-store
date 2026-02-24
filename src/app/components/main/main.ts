import { Component, OnInit, signal } from '@angular/core';
import { BUCKET_LIST_DATA } from '@data';
import { ArraySignal, IBucketListItem } from '@interfaces';
import { SvgLoaderComponent } from '../svg-loader/svg-loader';
import { URLLayoutComponent } from '../url-layout/url-layout';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'main',
    templateUrl: './main.html',
    imports: [SvgLoaderComponent, URLLayoutComponent, TranslatePipe],
})
export class MainComponent implements OnInit {
    protected readonly svgChat = signal('/assets/svg/chat.svg');
    protected readonly loyaltyHref = signal('https://skyjoy.vietjetair.com/redemption');
    protected readonly redocHref = signal('https://agent.redoc.co');
    protected readonly mailToHref = signal(
        'mailto:trinhthanhtung1010@gmail.com?Subject=Hi!&body=I%20saw%20you%20on%20your%20portfolio.'
    );
    protected readonly bucketItems: ArraySignal<IBucketListItem> = BUCKET_LIST_DATA.clone();

    constructor() {}

    ngOnInit() {}
}
