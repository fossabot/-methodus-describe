import { async, TestBed } from '@angular/core/testing';
import { LobbyItemComponent } from './lobby.item.component';
describe('LobbyItemComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [LobbyItemComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(LobbyItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=lobby.item.component.spec.js.map