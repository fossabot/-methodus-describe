import { Directive, HostListener, Input } from '@angular/core';
import { DirtyService } from '../services/dirty.service';

@Directive({
    selector: '[detectChanges]'
})
export class DetectChangesDirective {

    constructor(private readonly dirtyService: DirtyService) {

    }

    // tslint:disable-next-line:no-input-rename
    @Input('detectChanges') detectChanges: boolean;

    @HostListener('change', ['$event'])
    public onChange(event: any): void {
        this.dirtyService.setDirty();
    }

    @HostListener('keyup', ['$event'])
    public onKeyup(event: any): void {
        this.dirtyService.setDirty();
    }

}
