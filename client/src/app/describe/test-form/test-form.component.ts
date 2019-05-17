import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DescribeView } from '../../../contracts';
import { TestRouteService } from '../test-route.service';

@Component({
  selector: 'app-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
    public testRouteService: TestRouteService,
  ) { }
  actionResult: any;
  actionResultJson: string;
  controllerName: string;
  methodName: string;
  methodInfo: any;
  baseUrl: string;
  editorOptions = { theme: 'vs-light', language: 'json' };
  tabs = [{ name: 'method', selected: true }, { name: 'result', selected: false }];
  selectTab(tab) {
    this.tabs.forEach(element => {
      element.selected = false;
    });
    tab.selected = true;

  }
  ngOnInit() {

    this.route.params.subscribe(async (data) => {
      this.controllerName = data.controller;
      this.methodName = data.method;
      const actionInfo = await DescribeView.action(this.controllerName, this.methodName);
      this.methodInfo = actionInfo.methodus._descriptors[this.methodName];
      this.baseUrl = actionInfo.base;
    });

  }
  async testMethod() {
    try {
      this.actionResult = await this.testRouteService.activate(this.baseUrl + this.methodInfo.route, this.methodInfo);
      this.actionResultJson = JSON.stringify(this.actionResult, null, 2);
    } catch (error) {
      this.actionResultJson = JSON.stringify(error);
    }
  }
}
