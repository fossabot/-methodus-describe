
import * as ejs from 'ejs';
import * as express from 'express';
let metadataKey = 'params';
let methodMetadataKey = 'methodus';
import * as fs from 'fs';
import * as path from 'path';
import { Methodus, Response, Query, Param, MethodType, Method, MethodConfig, Verbs, MethodResult, Request } from '@methodus/server';
const clientDir = path.resolve(path.join(__dirname, '../client'));
import * as readLastLines from 'read-last-lines';
var urlBuilder = require('url');

const proxies: any = {};


var http = require('http'),
    httpProxy = require('http-proxy');


function fullUrl(req) {
    if (req.headers['referer']) {       
        return urlBuilder.format({
            protocol: req.protocol,
            host: req.headers['host'],
            pathname: req.originalUrl.split('/describe')[0] + '/describe/'
        });
    }
}

const prefix = process.env.describe_route || '';

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


    @Method(Verbs.Get, prefix + '/describe/methodus')
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
    @Method(Verbs.Get, prefix + '/describe/methodus/:className')
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



    @Method(Verbs.Get, prefix + '/describeproxy/:path')
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

    @Method(Verbs.Get, prefix + '/describe/info')
    public info(@Request() req) {

        let str = fs.readFileSync(path.join(clientDir, 'views/describe.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'views/describe.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));


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

            { app: packageJson },

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


    @Method(Verbs.Get, prefix + '/describe/swaggerize/:env')
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


    @Method(Verbs.Get, prefix + '/describe/dashboard')
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


            { app: packageJson },

            { base: fullUrl(req) },
            {
                makeFrameName: (route) => {
                    return (route + '_Frame').replace(/\//g, '_').replace(/:/g, '');
                },
                cleanID: (route) => {
                    return (route.name + '__' + route.methodus.name).replace(/\//, '').replace('@', '');
                },
                adaptResolver: (urlx: string) => {
                    if (urlx.indexOf('127.0.0.1') > 0) {
                        urlx = urlx.replace('127.0.0.1', req.host)
                    }
                    if (urlx.indexOf('localhost') > 0) {
                        urlx = urlx.replace('localhost', req.host)
                    }
                    return urlx;
                }
            }
        ));
        return new MethodResult(result);
    }

    @Method(Verbs.Get, prefix + '/describe/')
    public parentFrame(@Request() req, @Response() res) {
        let str = fs.readFileSync(path.join(clientDir, 'frame.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'frame.ejs') });
        const packageJson = require(path.join(process.cwd(), 'package.json'));
        let result = template({}, { app: packageJson });
        return new MethodResult(result);

    }


    @Method(Verbs.Get, prefix + '/describe/inner')
    public describe(@Request() req, @Response() res) {


        let str = fs.readFileSync(path.join(clientDir, 'index.ejs'), 'utf-8');
        var template = ejs.compile(str, { filename: path.join(clientDir, 'index.ejs') });
        const data = (global as any).METHODUS_BRIDGE;

        const packageJson = require(path.join(process.cwd(), 'package.json'));


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
                const methodus1 = DescribeView.maybeMethodus(data.classes[cls].classType);
                routes.push({ active: true, methodus: methodus1, name: cls });
            }
        });

        let remoteRoutes = [];
        Object.keys(data.classes).forEach((cls) => {
            if (data.classes[cls].methodType !== MethodType.Local) {
                const methodus = DescribeView.maybeMethodus(data.classes[cls].classType);
                remoteRoutes.push({ active: true, methodus: methodus, configuration: data.classes[cls], name: cls });
            }
        });








        try {
            let result = template(Object.assign({},
                (global as any).METHODUS_BRIDGE,
                { routes: routes },
                { events: events },
                { remoteRoutes: remoteRoutes },
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
                    adaptResolver: (url1: string) => {
                        if (url1.indexOf('127.0.0.1') > 0) {
                            url1 = url1.replace('127.0.0.1', req.host)
                        }
                        if (url1.indexOf('localhost') > 0) {
                            url1 = url1.replace('localhost', req.host)
                        }
                        return url1;
                    }
                }
            ));
            return new MethodResult(result);
        } catch (error) {
            console.error(error)
        }

    }





    @Method(Verbs.Get, prefix + '/describe/test/:className/:actionKey')
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

        let result = template(Object.assign({}, { base: fullUrl(req) }, { helper: helper, methodus: methodus, cls: testedClass.classType, actionKey: actionKey }));
        return new MethodResult(result);
    }


    @Method(Verbs.Get, prefix + '/describe/testevent/:className/:actionKey')
    eventAction(@Param('className') className, @Param('actionKey') actionKey, @Request() req, @Response() res) {

        let str = fs.readFileSync(path.join(clientDir, 'testEvent.ejs'), 'utf-8');
        var template = ejs.compile(str);
        const data = (global as any).METHODUS_BRIDGE;
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
                let finalName1 = '';
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

        let result = template(Object.assign({}, { base: fullUrl(req) }, { helper: helper, methodus: testedEvent, cls: testedClass.classType, actionKey: actionKey }));
        return new MethodResult(result);
    }
}



