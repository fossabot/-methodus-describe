
import * as ejs from 'ejs';
import * as express from 'express';
let metadataKey = 'params';
let methodMetadataKey = 'methodus';
import * as fs from 'fs';
import * as path from 'path';
import { Methodus, Response, Query, Param, MethodType, Method, MethodConfig, Verbs, MethodResult, Request } from '@tmla/methodus';
const clientDir = path.resolve(path.join(__dirname, '../client'));
import * as readLastLines from 'read-last-lines';
var urlBuilder = require('url');

const proxies: any = {};


var http = require('http'),
    httpProxy = require('http-proxy');


function fullUrl(req) {
    const urlArr = req.headers['referer'].split('/describe')[0].split('://');

    return urlBuilder.format({
        protocol: urlArr[0],
        host: urlArr[1],
        pathname: req.originalUrl.split('/describe')[0] + '/describe/'
    });
}



@MethodConfig('Describe')
export class DescribeView {
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


    @Method(Verbs.Get, '/describe/methodus')
    public getMethodusData() {
        const data = (global as any).METHODUS_BRIDGE;
        let routes = [];
        Object.keys(data.classes).forEach((cls) => {
            const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);

            let pj = null;
            try {
                pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));

            } catch (error) {
                pj = { 'version': 'NA' }
            }

            routes.push({ name: cls, methodus: methodus, info: pj });
        });

        return new MethodResult(routes);
    }
    @Method(Verbs.Get, '/describe/methodus/:className')
    public getMethodusDataClass(@Param('className') className) {
        const data = (global as any).METHODUS_BRIDGE;
        let routes = [];
        const methodus = DescribeView.maybeMethodus(data.classes[className].classType);
        let pj = null;
        try {
            pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));

        } catch (error) {
            pj = { 'version': 'NA' }
        }
        routes.push({ name: className, methodus: methodus, info: pj });
        return new MethodResult(routes);
    }



    @Method(Verbs.Get, '/describeproxy/:path')
    public describeproxy(@Query('u') application_endpoint, @Param('path') applicationName, @Request() req, @Response() res) {

        //
        // Create a proxy server with custom application logic
        //
        // if (!proxies[application_endpoint]) {
        //     const proxy = httpProxy.createProxyServer({ target: application_endpoint });

        //     proxies[application_endpoint] = proxy;
        // }


        // console.log('--==>>', req.url);
        // // You can define here your custom logic to handle the request
        // // and then proxy the  request.
        // proxies[application_endpoint].web(req, res, { target: application_endpoint }, (e) => {
        //     res.send(e);
        // });


        return new MethodResult({});
    }

    @Method(Verbs.Get, '/describe/info')
    public info(@Request() req) {

        let str = fs.readFileSync(path.join(clientDir, 'views/describe.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'views/describe.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let logsPath = process.env.NODE_LOG_DIR || './logs';

        const logs = fs.readFileSync(path.join(logsPath, 'general.log'), 'utf-8');

        let routes = [];
        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType === MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                routes.push({ active: true, methodus: methodus, name: cls });
            }
        });



        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { routes: routes },
            // { remoteRoutes: remoteRoutes },
            { config: (global as any).tmla.config },
            { app: packageJson },
            { logs: [] },
            {

                makeFrameName: (route) => {
                    return (route + '_Frame').replace(/\//g, '_').replace(/:/g, '');
                },


                cleanID: (route) => {
                    return (route.name + '__' + route.methodus.name).replace(/\//, '').replace('@', '');
                },
                adaptResolver: (url: string) => {
                    if (url.indexOf('127.0.0.1') > 0) {
                        url = url.replace('127.0.0.1', req.host)
                    }
                    if (url.indexOf('localhost') > 0) {
                        url = url.replace('localhost', req.host)
                    }
                    return url;
                }
            }
        ));
        return new MethodResult(result);
    }


    @Method(Verbs.Get, '/describe/swaggerize/:env')
    public swaggerize(@Param('env') env, @Request() req) {
        const data = (global as any).METHODUS_BRIDGE;
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let routes = [];
        let swagger = {
            "swagger": "2.0",
            "info": {
                "title": packageJson.name,
                "description": packageJson.description,
                "version": packageJson.version
            },
            "host": req.headers.host,
            "basePath": "/",
            "schemes": [req.protocol],
            "paths": {}
        }



        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType === MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);

                Object.keys(methodus._descriptors).forEach((descriptorKey: any) => {
                    const descriptor = methodus._descriptors[descriptorKey];
                    let route = descriptor.route;
                    if (route.indexOf(':') > -1) {
                        descriptor.params.filter(item => item.from === 'params').forEach((param) => {
                            route = route.replace(`:${param.name}`, `{${param.name}}`);
                        })
                    }


                    swagger.paths[route] = {
                        [descriptor.verb.toLowerCase()]: {
                            "description": descriptor.comment,
                            "responses": {},
                            "parameters": descriptor.params.filter(item => item.from === 'query' || item.from === 'params').map((param) => {
                                return {
                                    "name": param.name,
                                    "in": "path",
                                    "description": param,
                                    "required": true,
                                    "schema": {
                                        "type": param.type,
                                        // "items": {
                                        //     "type": "string"
                                        // }
                                    },
                                    "style": "simple"
                                }
                            })
                        }
                    };
                })
                // routes.push({ methodus: methodus, name: cls });
            }
        });

        // let remoteRoutes = [];
        // Object.keys(data.classes).map((cls) => {
        //     if (data.classes[cls].methodType !== MethodType.Local) {
        //         const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);


        //         let pj = { 'version': 'NA' }
        //         try {
        //             pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));
        //         } catch (error) {
        //         }


        //         remoteRoutes.push({ info: pj, active: true, methodus: methodus, configuration: data.classes[cls], name: cls });
        //     }
        // });




        return new MethodResult(swagger);
    }


    @Method(Verbs.Get, '/describe/dashboard')
    public dashboard(@Request() req, @Response() res) {



        let str = fs.readFileSync(path.join(clientDir, 'tabs/dashboard_tabs.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'tabs/dashboard_tabs.ejs') });
        const data = (global as any).METHODUS_BRIDGE;
        // <%-include('tabs/dashboard_tabs', {routes: routes,remoteRoutes:remoteRoutes}); %>
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let routes = [];

        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType === MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                let pj = { 'version': 'NA' };
                try {
                    pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));

                } catch (error) {
                    try {

                        pj = require(path.join(methodus.name, 'package.json'));
                    } catch (error) {

                    }
                }
                routes.push({ info: pj, active: true, methodus: methodus, name: cls });
            }
        });

        let remoteRoutes = [];
        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType !== MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);


                let pj = { 'version': 'NA' }
                try {
                    pj = require(path.join(process.cwd(), 'node_modules', methodus.name, 'package.json'));
                } catch (error) {
                }


                remoteRoutes.push({ info: pj, active: true, methodus: methodus, configuration: data.classes[cls], name: cls });
            }
        });

        let events = {};
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

        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,

            { routes: routes, remoteRoutes: remoteRoutes, events: events },

            { config: (global as any).tmla.config },
            { app: packageJson },
            { logs: [] },
            { base: fullUrl(req) },
            {
                makeFrameName: (route) => {
                    return (route + '_Frame').replace(/\//g, '_').replace(/:/g, '');
                },
                cleanID: (route) => {
                    return (route.name + '__' + route.methodus.name).replace(/\//, '').replace('@', '');
                },
                adaptResolver: (url: string) => {
                    if (url.indexOf('127.0.0.1') > 0) {
                        url = url.replace('127.0.0.1', req.host)
                    }
                    if (url.indexOf('localhost') > 0) {
                        url = url.replace('localhost', req.host)
                    }
                    return url;
                }
            }
        ));
        return new MethodResult(result);
    }

    @Method(Verbs.Get, '/describe/')
    public parentFrame(@Request() req, @Response() res) {
        let str = fs.readFileSync(path.join(clientDir, 'frame.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'frame.ejs') });
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let result = template({}, { app: packageJson });
        return new MethodResult(result);

    }


    @Method(Verbs.Get, '/describe/inner')
    public describe(@Request() req, @Response() res) {


        let str = fs.readFileSync(path.join(clientDir, 'index.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'index.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let logsPath = process.env.NODE_LOG_DIR || './logs';

        const logs = fs.readFileSync(path.join(logsPath, 'general.log'), 'utf-8');

        let routes = [];
        let events = [];


        Object.keys(data.classes).forEach((cls) => {

            const methodus: any = DescribeView.maybeMethodus(data.classes[cls].classType);
            if (methodus._workevents) {
                Object.keys(methodus._workevents).forEach(event => {
                    events.push(event);
                })
            }


        });



        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType === MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                routes.push({ active: true, methodus: methodus, name: cls });
            }
        });

        let remoteRoutes = [];
        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType !== MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                remoteRoutes.push({ active: true, methodus: methodus, configuration: data.classes[cls], name: cls });
            }
        });









        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { routes: routes },
            { events: events },
            { remoteRoutes: remoteRoutes },
            { config: (global as any).tmla.config },
            { app: packageJson },
            { base: fullUrl(req) },
            { logs: [] },
            {
                makeFrameName: (route) => {
                    return (route + '_Frame').replace(/\//g, '_').replace(/:/g, '');
                },
                cleanID: (route) => {
                    return (route.name + '__' + route.methodus.name).replace(/\//, '').replace('@', '');
                },
                adaptResolver: (url: string) => {
                    if (url.indexOf('127.0.0.1') > 0) {
                        url = url.replace('127.0.0.1', req.host)
                    }
                    if (url.indexOf('localhost') > 0) {
                        url = url.replace('localhost', req.host)
                    }
                    return url;
                }
            }
        ));
        return new MethodResult(result);
    }



    @Method(Verbs.Get, '/describe/logs')
    public async logs(@Request() req, @Response() res) {

        let str = fs.readFileSync(path.join(clientDir, 'logs.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'logs.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let logsPath = process.env.NODE_LOG_DIR || './logs';

        const logs = fs.readdirSync(logsPath);

        //const logFile = fs.readFileSync(path.join(logsPath, 'general.log'), 'utf-8');
        const logFile = await readLastLines.read(path.join(logsPath, 'general.log'), 100)

        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { base: fullUrl(req) },
            { app: packageJson },
            { logs: logs },
            { logFile: logFile }
        ));
        return new MethodResult(result);
    }


    @Method(Verbs.Get, '/describe/cache')
    public async cache(@Request() req, @Response() res) {


        let str = fs.readFileSync(path.join(clientDir, 'cache.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'cache.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let logsPath = process.env.NODE_LOG_DIR || './logs';

        const cache = global.tmla.cacheCollection;// require('@tmla/cache');// (global as any).tmla.cache;


        let result = template(Object.assign({},
            (global as any).METHODUS_BRIDGE,
            { app: packageJson },
            { cache: cache },
            { base: fullUrl(req) },

        ));
        return new MethodResult(result);
    }


    @Method(Verbs.Get, '/describe/test/:className/:actionKey')
    action(@Param('className') className, @Param('actionKey') actionKey, @Request() req, @Response() res) {

        let str = fs.readFileSync(path.join(clientDir, 'test.ejs'), 'utf-8');
        var template = ejs.compile(str);
        const data = (global as any).METHODUS_BRIDGE;
        const testedClass = data.classes[className];
        const methodus = DescribeView.maybeMethodus(testedClass.classType);

        const helper = {
            reflectSmallTypes: (param) => {
                if (param.name) {
                    return param.name.toLowerCase();
                }
            },
            reflectObject: (param) => {
                return param.name;
            },
            nameResolver: (param) => {
                let finalName = '';
                if ((param.from === 'body' && param.name) || param.from === 'files') {
                    return `name="${param.name || param.from}"`;
                } else {

                    return `id="${param.name || param.from}"`;
                }

            }
        }

        let result = template(Object.assign({}, { base: fullUrl(req) }, { helper: helper, methodus: methodus, cls: testedClass.classType, actionKey: actionKey, config: (global as any).tmla.config }));
        return new MethodResult(result);
    }


    @Method(Verbs.Get, '/describe/testevent/:className/:actionKey')
    eventAction(@Param('className') className, @Param('actionKey') actionKey, @Request() req, @Response() res) {

        let str = fs.readFileSync(path.join(clientDir, 'testEvent.ejs'), 'utf-8');
        var template = ejs.compile(str);
        const data = (global as any).METHODUS_BRIDGE;
        const testedClass = data.classes[className];
        const methodus = DescribeView.maybeMethodus(testedClass.classType);

        const helper = {
            reflectSmallTypes: (param) => {
                if (param.name) {
                    return param.name.toLowerCase();
                }
            },
            reflectObject: (param) => {
                return param.name;
            },
            nameResolver: (param) => {
                let finalName = '';
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

        let result = template(Object.assign({}, { base: fullUrl(req) }, { helper: helper, methodus: testedEvent, cls: testedClass.classType, actionKey: actionKey, config: (global as any).tmla.config }));
        return new MethodResult(result);
    }
}



