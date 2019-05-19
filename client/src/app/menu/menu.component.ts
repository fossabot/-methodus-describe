import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {





  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,

    private readonly _ngZone: NgZone,
  ) {

  }

  ngOnInit() {
  }
}
