import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UserService } from '../services/user.context.service';
import { JwtHelperService } from '@auth0/angular-jwt';
var Require = require;
// const tokenData = Require('../auth/token.json').token;
// const userData = Require('../auth/token.json').user;
describe('UserService', function () {
    var service;
    var jet;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            imports: [],
            declarations: [],
            providers: [UserService, JwtHelperService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
        jet = new JwtHelperService({});
    }));
    beforeEach(function () {
        service = new UserService(jet);
    });
    // it('setUser', () => {
    //   service.setUser(userData);
    //   const user = sessionStorage.getItem('user');
    //   expect(user !== null).toBeTruthy();
    // });
    // it('setToken', () => {
    //   service.setToken(tokenData);
    //   const token = sessionStorage.getItem('token');
    //   expect(token !== null).toBeTruthy();
    // });
    it('loadPermissions', function () {
        var perms = service.loadPermissions();
        expect(perms !== null).toBeTruthy();
    });
});
//# sourceMappingURL=user.context.service.spec.js.map