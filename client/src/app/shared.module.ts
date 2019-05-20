import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './common/loader/loader.component';
import { appRoutes } from './routes';
import { PrettyPrintPipe } from './pipes/prettyprint';
import { KeysPipe } from './pipes/keys-pipe';
import { HumanizePipe } from './pipes/humanize-pipe';
import { DictionaryPipe } from './pipes/dictionary-pipe';
import { SafeHtmlPipe } from './pipes/safe-html';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { LobbyComponent } from './common/lobby/lobby.component';
import { FooterComponent } from './footer/footer.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { DashboardComponent } from './dashboard/dashboard.component';


export function tokenGetter() {
  return sessionStorage.getItem('access_token');
}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: '/describe/assets',
  defaultOptions: { scrollBeyondLastLine: false, automaticLayout: true },
  onMonacoLoad: monacoLoad,
};


export function monacoLoad() {
  const _monaco = (<any>window).monaco;
  // validation settings
  _monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false
  });
}

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
    MonacoEditorModule.forRoot(monacoConfig),

    HttpClientTestingModule,
    RouterTestingModule.withRoutes(appRoutes),
    FileDropModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    LobbyComponent,
    MenuComponent,
    DashboardComponent,
    AdaptHeightDirective,
    AdaptWidthDirective,
    ClickStopPropagationDirective,
    DetectChangesDirective,
    ChangeComponent,
    SlideHeaderComponent,
    SlideFooterComponent,
    FooterComponent,
    LobbyItemComponent,
    LobbyComponent,
    LoaderComponent,
    PrettyPrintPipe,
    KeysPipe,
    HumanizePipe,
    SafeHtmlPipe,
    DictionaryPipe,
  ],
  providers: [
    DirtyService,
    LoaderService,
  ],
  exports: [
    RouterTestingModule,
    CommonModule,
    LobbyComponent,
    LobbyItemComponent,
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
    MonacoEditorModule,

  ],
})
export class SharedModule {
  constructor() {

  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,

      providers: [],
    };
  }
}
