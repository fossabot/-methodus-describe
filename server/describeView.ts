
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { Mock } from './mock';
import {
    Query, Param, Method, MethodMock,
    MethodConfig, Verbs, MethodResult
} from '@methodus/server';

const clientDir = path.resolve(path.join(__dirname, '../client'));
function getBridge(): any {
    return (global as any).METHODUS_BRIDGE
}



/*begin custom*/
const prefix = process.env.describe_route || '';
/*end custom*/

@MethodConfig('DescribeView')
export class DescribeView {

    public static maybeMethodus(object: any): any {
        const proto = object.prototype;
        if (proto && proto.constructor && proto.constructor.methodus) {
            return proto.constructor.methodus[object.name];
        }

        if (!proto && object.__proto__ && object.__proto__.methodus) {
            return object.__proto__.methodus[object.name];
        }

        if (object.methodus) {
            return object.methodus[object.name];
        }

        return proto.methodus[object.name];
    }


    @Method(Verbs.Get, '/describe/methodus')
    public static async getMethodusData(): Promise<MethodResult> {
        const data = getBridge();
        const routes: any = [];
        Object.keys(data.classes).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);

            let pj: any = null;
            try {
                pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));

            } catch (error) {
                pj = { 'version': 'NA' }
            }

            routes.push({ name: cls, methodus, info: pj });
        });

        return new MethodResult(routes);
    }

    @Method(Verbs.Get, '/describe/methodus/:className')
    public static async getMethodusDataClass(@Param('className') className: string): Promise<MethodResult> {
        const data = getBridge();
        const routes: any = [];
        const methodus = DescribeView.maybeMethodus(data.classes[className].classType);
        let pj: any = null;
        try {
            pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));

        } catch (error) {
            pj = { 'version': 'NA' }
        }
        routes.push({ name: className, methodus, info: pj });
        return new MethodResult(routes);
    }

    @Method(Verbs.Get, '/describeproxy/:path')
    public static async describeproxy(@Query('u') applicationEndpoint: string, @Param('path') applicationName: string): Promise<MethodResult> {
        return new MethodResult({});
    }

    @MethodMock(Mock.dashbaord)
    @Method(Verbs.Get, '/describe/dashboard')
    public static async dashboard(): Promise<MethodResult> {
        //const str = fs.readFileSync(path.join(clientDir, 'tabs/dashboard_tabs.ejs'), 'utf-8');
        //const template = ejs.compile(str, { filename: path.join(clientDir, 'tabs/dashboard_tabs.ejs') });
        const data = getBridge();

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        const routes: any = [];
        const ignoreInClasse = ['DescribeView', 'ConfigView'];

        Object.keys(data.classes).filter(cls => ignoreInClasse.indexOf(cls) === -1)
            .forEach((cls) => {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                let pj = { 'version': getVersionFromPackageFile(methodus.name) };
                routes.push({ info: pj, active: true, methodus, name: cls });
            });

        const remoteRoutes: any = [];
        Object.keys(data.clients).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.clients[cls].classType);
            let pj = { 'version': getVersionFromPackageFile(methodus.name) };
            remoteRoutes.push({ info: pj, active: true, methodus, configuration: data.clients[cls], name: cls });
        });




        const result = Object.assign({},
            { routes, remoteRoutes },
            { app: packageJson },


        )
        return new MethodResult(result);
    }







    @MethodMock(Mock.action)
    @Method(Verbs.Get, '/describe/test/:className/:actionKey')
    public static async action(@Param('className') className: string, @Param('actionKey') actionKey: string): Promise<MethodResult> {
        const data = getBridge();
        const testedClass = data.classes[className] || data.clients[className];
        const methodus = DescribeView.maybeMethodus(testedClass.classType);
        const result = Object.assign({}, { methodus, cls: testedClass.classType, actionKey });
        return new MethodResult(result);
    }

}



function getVersionFromPackageFile(name) {
    try {
        const pj = require(path.join(process.cwd(), 'node_modules', name, 'package.json'));
        return pj.version;
    } catch (error) {
    }
}