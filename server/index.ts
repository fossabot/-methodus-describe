


import * as path from 'path';
import { BuiltInServers } from '@methodus/server';
import { ServerType } from '@methodus/server';
import { DescribeView } from './describeView';

export function init(config, pluginOptions) {

    process.env.describe_route = (pluginOptions && pluginOptions.path) ? pluginOptions.path : '';
    const describePath = process.env.describe_route + '/describe';

    config.run('express', {
        onStart: (instance) => {
            var options = {
                //dotfiles: 'ignore',
                etag: true,
                extensions: ['htm', 'html', 'js', 'js.map', 'css', 'json'],
                maxAge: '1d',
                redirect: false,
                setHeaders: function (res, path, stat) {
                    res.set('x-timestamp', Date.now())
                }
            }

            const clientDir = path.resolve(path.join(__dirname, '..', 'public'));
            instance.use(describePath, BuiltInServers.Express.static(clientDir, options))

            const methodClientPath = path.join(process.cwd(), 'node_modules', '@methodus/client', 'dist');
            instance.use(`${describePath}/scripts/`, BuiltInServers.Express.static(methodClientPath, options))
        }
    });
    config.use(DescribeView, 'Local', ServerType.Express);

    return config;
}