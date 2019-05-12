import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { FileDropModule } from 'ngx-file-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccordionModule, AccordionConfig } from 'ngx-bootstrap/accordion';
import { SlideHeaderComponent } from './common/slide-header/slide-header.component';
import { SlideFooterComponent } from './common/slide-footer/slide-footer.component';
import { AdaptHeightDirective } from './directives/adapt-height';
import { ClickStopPropagationDirective } from './directives/stop-prop';
import { LobbyItemComponent } from './common/lobby.item/lobby.item.component';
import { DirtyService } from './services/dirty.service';
import { AdaptWidthDirective } from './directives/adapt-width';
import { ChangeComponent } from './common/change/change.component';
import { DetectChangesDirective } from './directives/change.directive';
import { UiSwitchModule, UiSwitchComponent } from 'ngx-ui-switch';
import { JoyrideModule } from 'ngx-joyride';
import { LoaderComponent } from './common/loader/loader.component';

import { PrettyPrintPipe } from './pipes/prettyprint';
import { KeysPipe } from './pipes/keys-pipe';
import { HumanizePipe } from './pipes/humanize-pipe';
import { DictionaryPipe } from './pipes/dictionary-pipe';
import { SafeHtmlPipe } from './pipes/safe-html';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AccordionModule.forRoot(),
    JoyrideModule.forChild(),
    UiSwitchModule.forRoot({
      size: 'small',
      color: '#00acff',
      switchColor: '#FFF',
      defaultBgColor: '#d9d9d9',
      defaultBoColor: '#FFF',
      checkedLabel: 'Live',
      uncheckedLabel: 'Off'
    }),
    TranslateModule.forChild(),
    FileDropModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    AdaptHeightDirective,
    AdaptWidthDirective,
    ClickStopPropagationDirective,
    DetectChangesDirective,
    ChangeComponent,
    SlideHeaderComponent,
    SlideFooterComponent,
    LobbyItemComponent,
    LoaderComponent,
    PrettyPrintPipe,
    KeysPipe,
    HumanizePipe,
    SafeHtmlPipe,
    DictionaryPipe,
  ],
  providers: [
    TranslateService,
    DirtyService,
  ],
  exports: [
    LobbyItemComponent,
    TranslateModule,
    FileDropModule,
    AccordionModule,
    AdaptHeightDirective,
    AdaptWidthDirective,
    DetectChangesDirective,
    ChangeComponent,
    SlideHeaderComponent,
    SlideFooterComponent,
    UiSwitchComponent,
    LoaderComponent,
    PrettyPrintPipe,
    KeysPipe,
    HumanizePipe,
    SafeHtmlPipe,
    DictionaryPipe,
  ],
})
export class SharedModule {
  constructor(translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
  }

  static forRoot(loader): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
