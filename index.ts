


import * as path from 'path';
import { BuiltInServers } from '@methodus/server';
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
            instance.use(describePath, BuiltInServers.Express.static(clientDir, options))

            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/client', 'dist');
            instance.use(`${describePath}/scripts/`, BuiltInServers.Express.static(methodClientPath, options))
        }
    });
    // console.log((global as any).METHODUS_BRIDGE);
    config.run(BuiltInServers.Socket, { nsp: describePath });

    config.use(DescribeView, 'Local', ServerType.Express);
    config.use(ConfigView, 'Local', ServerType.Express);
    config.use(SocketView, 'Local', ServerType.Express);

    // config.use(Config, MethodType.Local, ServerType.Express, process.env.CONFIGURATIO_SERVICE);


    return config;
}