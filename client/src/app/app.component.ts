import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '@Methodus/Describe';

  constructor(public translate: TranslateService) {

  }
  ngOnInit() {

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

  }
}
