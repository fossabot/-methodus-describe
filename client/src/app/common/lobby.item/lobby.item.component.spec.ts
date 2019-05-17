import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LobbyItemComponent } from './lobby.item.component';
import { SharedModule } from '../../shared.module';


describe('LobbyItemComponent', () => {
  let component: LobbyItemComponent;
  let fixture: ComponentFixture<LobbyItemComponent>;

  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [],
      providers: []
    })
      .compileComponents().then(() => {
      
        fixture = TestBed.createComponent(LobbyItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        expect(component).toBeTruthy();
      });
  });
});
