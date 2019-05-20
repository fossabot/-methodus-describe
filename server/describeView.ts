
import * as ejs from 'ejs';
import * as fs from 'fs';
import * as path from 'path';
import { Mock } from './Mock';
import {
    Response, Query, Param, Method, MethodMock,
    MethodConfig, Verbs, MethodResult
} from '@methodus/server';

const clientDir = path.resolve(path.join(__dirname, '../client'));
function getBridge(): any {
    return (global as any).METHODUS_BRIDGE
}

function fullUrl(req) {
    const originalUrl = req.originalUrl.split('/describe')[0];
    return '//' + req.headers.host + originalUrl;
}

/*begin custom*/
const prefix = process.env.describe_route || '';
/*end custom*/

@MethodConfig('DescribeView')
export class DescribeView {
    constructor(public expressInstance: any) {
        // this._app.use(describe.init());
    }
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
        const routes = [];
        Object.keys(data.classes).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);

            let pj = null;
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
        const routes = [];
        const methodus = DescribeView.maybeMethodus(data.classes[className].classType);
        let pj = null;
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

    @Method(Verbs.Get, '/describe/info')
    public static async info(): Promise<MethodResult> {

        const str = fs.readFileSync(path.join(clientDir, 'views/describe.ejs'), 'utf-8');
        const template = ejs.compile(str, { filename: path.join(clientDir, 'views/describe.ejs') });
        const data = getBridge();
        const packageJson = require(path.join(process.cwd(), 'package.json'));


        const routes = [];
        const ignoreInClasse = ['DescribeView', 'ConfigView'];

        Object.keys(data.classes).filter(cls => ignoreInClasse.indexOf(cls) === -1).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
            routes.push({ active: true, methodus, name: cls });
        });



        const result = template(Object.assign({},
            getBridge(),
            { routes },
            // { remoteRoutes: remoteRoutes },

            { app: packageJson }


        ));
        return new MethodResult(result);
    }


    // @Method(Verbs.Get, '/describe/swaggerize/:env')
    // public static async swaggerize(@Param('env') env: string): Promise<MethodResult> {
    //     const data = getBridge();
    //     const packageJson = require(path.join(process.cwd(), 'package.json'));
       
    //     const swagger = {
    //         "swagger": "2.0",
    //         "info": {
    //             "title": packageJson.name,
    //             "description": packageJson.description,
    //             "version": packageJson.version
    //         },
    //         "host": req.headers.host,
    //         "basePath": "/",
    //         "schemes": [req.protocol],
    //         "paths": {}
    //     }



    //     Object.keys(data.classes).forEach((cls) => {
    //         const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
    //         Object.keys(methodus._descriptors).forEach((descriptorKey: any) => {
    //             const descriptor = methodus._descriptors[descriptorKey];
    //             let route = descriptor.route;
    //             if (route.indexOf(':') > -1) {
    //                 descriptor.params.filter(item => item.from === 'params').forEach((param) => {
    //                     route = route.replace(`:${param.name}`, `{${param.name}}`);
    //                 })
    //             }


    //             swagger.paths[route] = {
    //                 [descriptor.verb.toLowerCase()]: {
    //                     "description": descriptor.comment,
    //                     "responses": {},
    //                     "parameters": descriptor.params.filter(item => item.from === 'query' || item.from === 'params').map((param) => {
    //                         return {
    //                             "name": param.name,
    //                             "in": "path",
    //                             "description": param,
    //                             "required": true,
    //                             "schema": {
    //                                 "type": param.type,
    //                                 // "items": {
    //                                 //     "type": "string"
    //                                 // }
    //                             },
    //                             "style": "simple"
    //                         }
    //                     })
    //                 }
    //             };
    //         });
    //     });
    //     return new MethodResult(swagger);
    // }

    @MethodMock(Mock.dashbaord)
    @Method(Verbs.Get, '/describe/dashboard')
    public static async dashboard(): Promise<MethodResult> {
        //const str = fs.readFileSync(path.join(clientDir, 'tabs/dashboard_tabs.ejs'), 'utf-8');
        //const template = ejs.compile(str, { filename: path.join(clientDir, 'tabs/dashboard_tabs.ejs') });
        const data = getBridge();

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        const routes = [];
        const ignoreInClasse = ['DescribeView', 'ConfigView'];

        Object.keys(data.classes).filter(cls => ignoreInClasse.indexOf(cls) === -1)
            .forEach((cls) => {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                let pj = { 'version': getVersionFromPackageFile(methodus.name) };
                routes.push({ info: pj, active: true, methodus, name: cls });
            });

        const remoteRoutes = [];
        Object.keys(data.clients).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.clients[cls].classType);
            let pj = { 'version': getVersionFromPackageFile(methodus.name) };
            remoteRoutes.push({ info: pj, active: true, methodus, configuration: data.clients[cls], name: cls });
        });

        const events = {};
        Object.keys(data.classes).forEach((cls) => {
            const methodus: any = DescribeView.maybeMethodus(data.classes[cls].classType);
            if (methodus._workevents && Object.keys(methodus._workevents).length > 0) {
                Object.keys(methodus._workevents).forEach((eventKey: any) => {
                    methodus._workevents[eventKey].class = data.classes[cls];
                    methodus._workevents[eventKey].eventKey = eventKey;
                    methodus._workevents[eventKey].event_type = 'Event Worker';
                    events[cls] = events[cls] || { events: [] };
                    events[cls].events.push(methodus._workevents[eventKey]);
                })
            }
            if (methodus._events && Object.keys(methodus._events).length > 0) {

                Object.keys(methodus._events).forEach((eventKey: any) => {
                    methodus._events[eventKey].class = data.classes[cls];
                    methodus._events[eventKey].eventKey = eventKey;
                    methodus._events[eventKey].event_type = 'Event Handler';

                    events[cls] = events[cls] || { events: [] };
                    events[cls].events.push(methodus._events[eventKey]);
                })
            }

            if (methodus._workers && Object.keys(methodus._workers).length > 0) {

                Object.keys(methodus._workers).forEach((eventKey: any) => {
                    methodus._workers[eventKey].class = data.classes[cls];
                    methodus._workers[eventKey].eventKey = eventKey;
                    methodus._workers[eventKey].event_type = 'Worker';
                    events[cls] = events[cls] || { events: [] };
                    events[cls].events.push(methodus._workers[eventKey]);
                })
            }


        });

        const result = Object.assign({},
            { routes, remoteRoutes, events },
            { app: packageJson },


        )
        return new MethodResult(result);
    }

    @Method(Verbs.Get, '/describe/')
    public async parentFrame(): Promise<MethodResult> {
        const str = fs.readFileSync(path.join(clientDir, 'frame.ejs'), 'utf-8');
        const template = ejs.compile(str, { filename: path.join(clientDir, 'frame.ejs') });
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        const result = template({}, { app: packageJson });
        return new MethodResult(result);

    }


    @Method(Verbs.Get, '/describe/inner')
    public async describe(): Promise<MethodResult> {


        const str = fs.readFileSync(path.join(clientDir, 'index.ejs'), 'utf-8');
        const template = ejs.compile(str, { filename: path.join(clientDir, 'index.ejs') });
        const data = getBridge();

        const packageJson = require(path.join(process.cwd(), 'package.json'));


        const routes = [];
        const events = [];
        const ignoreInClasse = ['DescribeView', 'ConfigView'];

        Object.keys(data.classes).filter(cls => ignoreInClasse.indexOf(cls) === -1).forEach((cls) => {

            const methodus: any = DescribeView.maybeMethodus(data.classes[cls].classType);

            if (methodus._workevents) {
                Object.keys(methodus._workevents).forEach((event: any) => {
                    events.push(event);
                });
            }
        });



        Object.keys(data.classes).filter(cls => ignoreInClasse.indexOf(cls) === -1).forEach((cls) => {
            const methodus1 = DescribeView.maybeMethodus(data.classes[cls].classType);
            routes.push({ active: true, methodus: methodus1, name: cls });
        });

        const remoteRoutes = [];
        Object.keys(data.clients).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.clients[cls].classType);
            remoteRoutes.push({ active: true, methodus, configuration: data.clients[cls], name: cls });
        });








        try {
            const result = template(Object.assign({},
                getBridge(),
                { routes },
                { events },
                { remoteRoutes },
                { app: packageJson },

            ));
            return new MethodResult(result);
        } catch (error) {
            console.error(error)
        }

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


    @Method(Verbs.Get, '/describe/testevent/:className/:actionKey')
    public async eventAction(@Param('className') className: string, @Param('actionKey') actionKey: string): Promise<MethodResult> {

        const str = fs.readFileSync(path.join(clientDir, 'testEvent.ejs'), 'utf-8');
        const template = ejs.compile(str);
        const data = getBridge();
        const testedClass = data.classes[className];
        const methodus = DescribeView.maybeMethodus(testedClass.classType);

        const helper = {
            reflectSmallTypes: (param1) => {
                if (param1.name) {
                    return param1.name.toLowerCase();
                }
            },
            reflectObject: (param) => {
                return param.name;
            },
            nameResolver: (param) => {
                const finalName1 = '';
                if ((param.from === 'body' && param.name) || param.from === 'files') {
                    return `name="${param.name || param.from}"`;
                } else {

                    return `id="${param.name || param.from}"`;
                }

            }
        }


        let testedEvent = { event_type: '', class: null };
        if (methodus._workevents[actionKey]) {
            testedEvent = { event_type: 'Event Worker', class: methodus._workevents[actionKey] };

        } else if (methodus._events[actionKey]) {
            testedEvent = { event_type: 'Event Handler', class: methodus._workevents[actionKey] };
        } else if (methodus._workers[actionKey]) {
            testedEvent = { event_type: 'Worker', class: methodus._workevents[actionKey] };
        }

        const result = template(Object.assign({}, { helper, methodus: testedEvent, cls: testedClass.classType, actionKey }));
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