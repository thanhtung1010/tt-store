import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'header',
    templateUrl: './header.html',
    imports: [TranslatePipe],
})
export class HeaderComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
