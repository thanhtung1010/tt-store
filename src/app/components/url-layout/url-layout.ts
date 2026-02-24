import { Component, Input, OnInit } from '@angular/core';
import { A_ELEMENT_TARGET } from '@interfaces';

@Component({
    selector: 'url-layout',
    templateUrl: './url-layout.html',
})
export class URLLayoutComponent implements OnInit {
    @Input({required: true}) href: string = '';
    @Input() type: 'href' | 'download' = 'href';
    @Input() customCls: string = '';
    @Input() target: A_ELEMENT_TARGET = '_blank';

    constructor() {}

    ngOnInit() {}
}
