import * as M from '@methodus/client';
export class Proxy {
    constructor() {

    }
    options: any = {};
    request: any;
    url: string;
    prepare(url, method, params, body, query, headers) {
        //M.Rest.
        //console.log(url, method, params, body, query, headers);
        if (params && url) {
            params.forEach(function (param: any) {
                if (url) {
                    url = url.replace(':' + param.id, param.value);
                }
            });
        }

        if (query && query.length > 0) {
            url = url + '?' + query.join('&');
        }

        let formData = new FormData();
        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        });
        //add files

        //add headers
        this.url = url;
        this.request = new Request(url);

        this.options = {
            method: method,
            credentials: 'include',
            headers: Object.assign(headers, {
                'Content-Type': 'application/json'
            }),
            //headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };


        if (body && Object.keys(body).length > 0) {
            Object.assign(this.options, { body: JSON.stringify(body) });
        }
    }

    async execute(responseCB, jsonCB, htmlCB) {
        const response = await fetch(this.request, this.options);
        if (responseCB) {
            responseCB(response);
        }

        try {
            let jsonResult = await response.text();

            try {
                jsonResult = JSON.parse(jsonResult);

                if (jsonCB) {
                    jsonCB(jsonResult);
                }

            }
            catch (error) {
                if (htmlCB) {
                    htmlCB(jsonResult);
                }
            }


            return jsonResult;
        } catch (error) {
            return response.text();
        }

        // return response.json();
        // throw new Error('Network response was not ok.');
    }

}