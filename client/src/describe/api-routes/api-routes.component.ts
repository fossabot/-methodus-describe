import { Component, OnInit } from '@angular/core';
import { DescribeView } from '../../contracts';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-api-routes',
  templateUrl: './api-routes.component.html',
  styleUrls: ['./api-routes.component.scss']
})
export class ApiRoutesComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }
  dashboard: any;
  activeItem: any;
  routes;
  publicProperty: string;
  servicesType = '';
  async ngOnInit() {
    this.route.params.subscribe(async (data) => {
      this.servicesType = data.type;
      if (data.type === 'local-services') {
        this.publicProperty = 'routes';
      } else {
        this.publicProperty = 'remoteRoutes';
      }
    });



    try {
      this.dashboard = await DescribeView.dashboard();
      console.log(this.dashboard);
    } catch (error) {

      console.error(error);
    }
  }


}
