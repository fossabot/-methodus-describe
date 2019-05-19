import { Component, OnInit } from '@angular/core';
import { DescribeView } from '../../contracts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-routes',
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss']
})
export class ApiRoutesComponent implements OnInit {

  constructor(private router: Router, ) { }
  dashboard: any;
  activeItem: any;
  async ngOnInit() {
    try {
      this.dashboard = await DescribeView.dashboard();

    } catch (error) {

      console.error(error);
    }
  }


}
