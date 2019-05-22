import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DescribeView } from '../../contracts';
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
  primitives = ['string', 'number'];
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

      if (this.methodInfo) {
        const parameterStr = localStorage.getItem(`${this.methodInfo.verb}_${this.methodInfo.route}`);
        if (parameterStr) {
          const values = JSON.parse(parameterStr);
          this.methodInfo.params.forEach((param, index) => {
            if (this.forTextBox(param.type)) {
              param.value = values[index];
            } else {
              param.value = JSON.stringify(values[index]);
            }
          });
        }
      }
    });
  }

  forTextArea(type) {
    return this.primitives.indexOf(type) === -1;
  }

  forTextBox(type) {
    return this.primitives.indexOf(type) > -1;
  }
  async testMethod() {
    const values = [];


    try {
      this.methodInfo.params.forEach((param) => {
        if (!this.forTextBox(param.type)) {
          values.push(JSON.parse(param.value));
        } else {
          values.push(param.value);
        }
      });


      localStorage.setItem(`${this.methodInfo.verb}_${this.methodInfo.route}`, JSON.stringify(values));
      const clone = JSON.parse(JSON.stringify(this.methodInfo));
      clone.params.forEach((param, index) => {
        param.value = values[index];
      });

      this.actionResult = await this.testRouteService.activate(clone.route, clone);


      this.actionResultJson = JSON.stringify(this.actionResult, null, 2);
    } catch (error) {
      this.actionResultJson = JSON.stringify(error);
    }

    this.tabs[0].selected = false;
    this.tabs[1].selected = true;
  }
}
