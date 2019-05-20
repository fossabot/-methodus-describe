process.env.test = 'true';
import { AsyncTest, Expect, TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { ExpressTestServer } from './servers/';
import { DescribeView } from '../describeView';

import { TestTarget } from './controllers';

@TestFixture('Test Xserver configuration')
export class Servers {
    server: any;
    @AsyncSetupFixture
    public async serverSetup() {
        return new Promise(async (resolve, reject) => {
            this.server = new ExpressTestServer();
            this.server.on('ready', () => {
                resolve();
            });
        });
    }

    @AsyncTeardownFixture
    public async serverKill() {
        this.server.kill();
    }

    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async list() {
        const response = DescribeView.dashboard();
        Expect(response).toBeDefined();
    }
}
