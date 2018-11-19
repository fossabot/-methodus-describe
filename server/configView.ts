
import * as ejs from 'ejs';
import * as express from 'express';
let metadataKey = 'params';
let methodMetadataKey = 'methodus';
import * as fs from 'fs';
import * as path from 'path';
import { Param, MethodType, Method, MethodConfig, Verbs, MethodResult, Request } from '@methodus/server';
//import { Config } from '@tmla-contracts/config';
const clientDir = path.resolve(path.join(__dirname, '../client'));
var urlBuilder = require('url');


function fullUrl(req) {
    const urlArr = req.headers['referer'].split('/describe')[0].split('://');
    const originalUrl = '//' + req.originalUrl.split('/describe')[0].split('://');

    return urlBuilder.format({
        protocol: '//',
        host: urlArr[1],
        pathname: originalUrl + '/describe/'
    });
}


@MethodConfig('Config')
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
    public async configManager(@Request() req) {


        let str = fs.readFileSync(path.join(clientDir, 'configManager.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'configManager.ejs') });

        let appsAndEnvs = { result: { applications: [], envs: [] } };// await Config.getApplications();
        // appsAndEnvs.result.applications = appsAndEnvs.result.applications.map(item => item.id);
        // appsAndEnvs.result.envs = appsAndEnvs.result.envs.map(item => item.id);
        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { base: fullUrl(req) },
            appsAndEnvs
        ));
        return new MethodResult(result);
    }




    @Method(Verbs.Get, '/describe/config')
    public async config(@Request() req) {

        let str = fs.readFileSync(path.join(clientDir, 'config.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'config.ejs') });

        const packageJson = require(path.join(process.cwd(), 'package.json'));


        let appsAndEnvsResult = {};//await Config.getApplications();

        let appsAndEnvs = {
            apps: [],
            envs: []
            // apps: appsAndEnvsResult.result.applications.map(item => item.id),
            // envs: appsAndEnvsResult.result.envs.map(item => item.id)
        }





        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { app: packageJson },
            { appsAndEnvs: appsAndEnvs },
            { config: (global as any).tmla.config },
            { base: fullUrl(req) }
        ));
        return new MethodResult(result);
    }






}



