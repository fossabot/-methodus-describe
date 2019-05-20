process.env.test = 'true';
import { AsyncTest, Expect, TestFixture, Timeout, AsyncSetupFixture, AsyncTeardownFixture } from 'alsatian';
import { ExpressTestServer } from './servers/';
import { DescribeView } from '../describeView';

import { TestTarget, TestController } from './controllers';
import { Mocker } from '@methodus/server';

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

    @AsyncTest('dashboard')
    @Timeout(1000 * 1000)
    public async dashboard() {
        const response = await DescribeView.dashboard();
        Expect(response).toBeDefined();
    }


    @AsyncTest('action')
    @Timeout(1000 * 1000)
    public async action() {
        const response = await DescribeView.action('TestController', 'update');
        Expect(response).toBeDefined();
    }


    @AsyncTest('getMethodusData')
    @Timeout(1000 * 1000)
    public async getMethodusData() {
        const response = await DescribeView.getMethodusData();
        Expect(response).toBeDefined();
    }

    @AsyncTest('getMethodusDataClass')
    @Timeout(1000 * 1000)
    public async getMethodusDataClass() {
        const response = await DescribeView.getMethodusDataClass('TestController');
        Expect(response).toBeDefined();
    }


    @AsyncTest('list')
    @Timeout(1000 * 1000)
    public async list() {
        const response = await TestController.list('some value', 'some key');
        await TestController.create('some value', 'some key', 'some_name');
        await TestController.read(11);
        await TestController.getByField('some value', 1);
        await TestController.update();
        await TestController.delete('id');


        await TestTarget.list('some value', 'some key');
        await TestTarget.create('some value', 'some key', 'some_name');
        await TestTarget.read(11);
        // await TestTarget.getByField('some value', 1);
        // await TestTarget.update();
        // await TestTarget.delete();

        Expect(response).toBeDefined();
    }


    @AsyncTest('mock dashboard')
    @Timeout(1000 * 1000)
    public async dashboardMock() {
        Mocker.mockServer(DescribeView);
        const response = await DescribeView.dashboard();
        Expect(response).toBeDefined();
    }

    @AsyncTest('mock action')
    @Timeout(1000 * 1000)
    public async actionMock() {
        Mocker.mockServer(DescribeView);
        const response = await DescribeView.action('TestController', 'update');
        Expect(response).toBeDefined();
    }

}
