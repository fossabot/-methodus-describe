import { Component, OnInit, Input, SimpleChanges, OnChanges, HostListener, OnDestroy } from '@angular/core';
import { DirtyService } from '../../services/dirty.service';
import stringify from 'fast-stringify';

@Component({
  selector: 'app-changes',
  templateUrl: './change.component.html',
  styleUrls: ['./change.component.scss']
})
export class ChangeComponent implements OnChanges, OnDestroy, OnInit {
  constructor(public dirtyService: DirtyService) {
    this.dirtyService.detect.subscribe((data) => {
      this.detectChanges();
    });
  }

  @Input() item: any;
  dirtyDetected = false;
  orgItem: any = {};

  ngOnInit() {
    this.dirtyService.dirty.subscribe((state) => {
      this.dirtyDetected = state;
      if (!state) {
        this.orgItem = JSON.parse(stringify(this.item));
      }
    });
    this.dirtyService.saving.subscribe((state) => {

    });
  }

  ngOnDestroy() {
    // try {
    //   this.dirtyService.dirty.unsubscribe();
    //   this.dirtyService.saving.unsubscribe();

    // } catch (ex) {
    //   console.error(ex);

    // }
  }


  @HostListener('window:beforeunload')
  canDeactivate(): boolean {
    return !this.dirtyDetected;
  }
  detectChanges() {
    if (!this.dirtyDetected) {
      const org = stringify(this.orgItem);
      const current = stringify(this.item);
      if (org !== current) {
        this.dirtyDetected = true;
        this.dirtyService.setDirty();
      }
    }
  }


  ngOnChanges(changes: SimpleChanges) {
    this.orgItem = JSON.parse(stringify(this.item));
  }

}
