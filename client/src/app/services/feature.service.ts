import { Injectable } from '@angular/core';
import { UserService } from './user.context.service';

@Injectable()
export class FeatureService {
    constructor(public userService: UserService) {
        const user = this.userService.getUser();
        if (user && this.betaUsers.indexOf(user.attuid) > -1) {
            this.beta = true;
        }
    }

    betaUsers = ['rb136m', 'ro3591', 'dk727g'];
    beta = false;

}
