process.env.test = 'true';
import {
    PluginConfiguration,
    ServerConfiguration, RouterConfiguration,
    ClientConfiguration, ConfiguredServer, ServerType,
} from '@methodus/server';
import * as path from 'path';
import { BuiltInServers, BuiltInTransports } from '@methodus/server';
import { TestController, TestTarget } from '../controllers/';
import { ProxiedController } from '../controllers/proxy.controller';

@ServerConfiguration(BuiltInServers.Express, { port: process.env.PORT || 8020 })
@PluginConfiguration(path.join(__dirname, '../../index'))
@RouterConfiguration(TestController, ServerType.Express)
@RouterConfiguration(ProxiedController, ServerType.Express)
@ClientConfiguration(TestTarget, BuiltInTransports.Http, 'http://localhost:8020')
export class ExpressTestServer extends ConfiguredServer {
    constructor() {
        super(ExpressTestServer);
    }
}
