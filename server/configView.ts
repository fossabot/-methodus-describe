
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { Method, MethodConfig, Verbs, MethodResult, Request } from '@methodus/server';
const clientDir = path.resolve(path.join(__dirname, '../client'));
var urlBuilder = require('url');


function fullUrl(req) {
    if (req.headers['referer']) {
        const urlArr = req.headers['referer'].split('/describe')[0].split('://');
        const originalUrl = req.originalUrl.split('/describe')[0];
        return urlBuilder.format({
            protocol: '//',
            host: urlArr[1],
            pathname: originalUrl + '/describe/'
        });
    }
}

function getBridge(): any {
    return (global as any).METHODUS_BRIDGE
}

@MethodConfig('ConfigView')
export class ConfigView {
    constructor(public expressInstance: any) {
        // this._app.use(describe.init());
    }
    public static maybeMethodus(object: any): any {
        let proto = object.prototype;
        if (proto && proto.constructor && proto.constructor.methodus)
            return proto.constructor.methodus;

        if (!proto && object.__proto__ && object.__proto__.methodus)
            return object.__proto__.methodus;

        if (object.methodus)
            return object.methodus;

        return proto.methodus;
    }





    @Method(Verbs.Get, '/config_manager')
    public static async configManager(@Request() req: any): Promise<MethodResult> {


        let str = fs.readFileSync(path.join(clientDir, 'configManager.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'configManager.ejs') });

        let appsAndEnvs = { result: { applications: [], envs: [] } };// await Config.getApplications();
        // appsAndEnvs.result.applications = appsAndEnvs.result.applications.map(item => item.id);
        // appsAndEnvs.result.envs = appsAndEnvs.result.envs.map(item => item.id);
        let result = template(Object.assign({},
            getBridge(),
            { base: fullUrl(req) },
            appsAndEnvs
        ));
        return new MethodResult(result);
    }

    @Method(Verbs.Get, '/describe/config')
    public static async config(@Request() req: any): Promise<MethodResult> {
        let str = fs.readFileSync(path.join(clientDir, 'config.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'config.ejs') });
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let appsAndEnvsResult = {};//await Config.getApplications();
        let appsAndEnvs = {
            apps: [],
            envs: []
        }

        let result = template(Object.assign({},
            getBridge(),
            { app: packageJson },
            { appsAndEnvs: appsAndEnvs },
            { config: (global as any).tmla.config },
            { base: fullUrl(req) }
        ));
        return new MethodResult(result);
    }
}
