import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[appAdaptWidth]'
})


export class AdaptWidthDirective implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('appAdaptWidth') appAdaptWidth: number;

    constructor(private readonly el: ElementRef) {

    }

    async ngOnInit() {
        const view = this.viewport();
        this.el.nativeElement.style.width = `${(view.width - this.appAdaptWidth)}px`;
    }


    viewport() {
        let e: any = window
            , a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width: e[a + 'Width'], height: e[a + 'Height'] };
    }

}
