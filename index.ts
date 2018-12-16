


import * as path from 'path';
import * as express from 'express';
import { MethodType, ServerType } from '@methodus/server';



export function init(config, pluginOptions) {

    process.env.describe_route = (pluginOptions && pluginOptions.path) ? pluginOptions.path : '';
    const describePath = process.env.describe_route + '/describe';


    const DescribeView = require('./server/describeView').DescribeView;
    const SocketView = require('./server/socketView').SocketView;
    const ConfigView = require('./server/configView').ConfigView;





    config.run('express', {
        onStart: (instance) => {
            var options = {
                //dotfiles: 'ignore',
                etag: true,
                extensions: ['htm', 'html', 'js', 'js.map', 'css'],
                maxAge: '1d',
                redirect: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now())
                }
            }

            const clientDir = path.resolve(path.join(__dirname, './client'));
            instance.use(describePath, express.static(clientDir, options))

            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/client', 'dist');
            instance.use(`${describePath}/scripts/`, express.static(methodClientPath, options))



            // var proxy = require('http-proxy-middleware');

            // console.log(config);
            // // proxy middleware options
            // var proxyOptions = {
            //     target: 'http://localhost:2065', // target host
            //     changeOrigin: true,               // needed for virtual hosted sites
            //     ws: true,                         // proxy websockets
            //     pathRewrite: {
            //         '^/describeproxy': '/describe',     // rewrite path
            //         // '^/api/remove/path': '/path'           // remove base path
            //     },
            //     // router: {
            //     //     // when request.headers.host == 'dev.localhost:3000',
            //     //     // override target 'http://www.example.org' to 'http://localhost:8000'
            //     //     'dev.localhost:3000': 'http://localhost:2065'
            //     // }
            // };

            // // create the proxy (without context)
            // var exampleProxy = proxy(proxyOptions);

            // instance.use('/describeproxy', exampleProxy);




        }
    });
    config.run('socketio', { nsp: describePath });

    config.use(DescribeView, 'Local', 'express');
    config.use(ConfigView, 'Local', 'express');
    config.use(SocketView, 'Local', 'socketio');

    // config.use(Config, MethodType.Local, ServerType.Express, process.env.CONFIGURATIO_SERVICE);


    return config;
}