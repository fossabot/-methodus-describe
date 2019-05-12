import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../services/user.context.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  user: any;
  subMenuState = 'collapse';
  permissions: any;
  toggles = {
    aws: false,
    admin: false,
  };

  activeClass = '';
  live;
  _notRelevant: boolean;
  relevantItems = [
    '/dashboard/aws/cloudformation',
    '/dashboard/aws/ec2',
    '/dashboard/aws/cloudwatch',
  ];

  constructor(private readonly userService: UserService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly location: Location,

    private readonly _ngZone: NgZone,
  ) {
    router.events.subscribe(val => {

      this._ngZone.run(async () => {
        if (this.relevantItems.indexOf(location.path()) > -1) {
          this._notRelevant = false;
        } else {
          this._notRelevant = true;
        }
      });
    });
  }

  ngOnInit() {
    this.user = this.userService.getUser();
    this.permissions = this.userService.loadPermissions();


  }

  toggleDrop(key, toggle) {
    this.toggles[key] = toggle;
  }




  notRelevant() {
    return this._notRelevant;
  }


}
