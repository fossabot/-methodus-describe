import { Injectable, EventEmitter } from '@angular/core';
import { Rest } from '@methodus/client';


@Injectable()
export class TestRouteService {
    constructor() {
    }
    _subscriptions = {};

    options: any = {};
    request: any;
    url: string;
    async activate(uri, methodInformation) {
        const argsForRequest = [];
        methodInformation.params.forEach((param) => {
            argsForRequest.push(param.value);
        });

        const restRequest = new Rest(uri, methodInformation.verb,
            methodInformation.params, argsForRequest);
        const result = await restRequest.execute();
        return result;
        // if (methodInformation.params) {
        //     const params = methodInformation.params.forEach((param) => {

        //         swit;


        //         return { id: param.id, value: param.value };
        //     });

        // }

        //   // build the request url (params + query)
        //   const selected: any = document.querySelectorAll('.param');
        //   const testForm = document.getElementById('TestForm');



        //   if (testForm) {
        //       const url = testForm.getAttribute('xaction');
        //       const method = testForm.getAttribute('method');
        //       if (selected && url) {
        //           selected.forEach(function (param: any) {
        //               params.push({ id: param.id, value: param.value });
        //           });
        //       }

        //       const selectedQuery: any = document.querySelectorAll('.query');
        //       const queryString: any = [];

        //       selectedQuery.forEach(function (param: any) {
        //           if (param.value) {
        //               queryString.push(`${param.id}=${param.value}`);
        //           }

        //       });

        //       const RequestUrl = document.getElementById('RequestUrl');
        //       if (RequestUrl) {
        //           let finalUrl = url;
        //           params.forEach((param) => {
        //               finalUrl = finalUrl.replace(`:${param.id}`, param.value);
        //           });
        //           RequestUrl.innerHTML = finalUrl;
        //       }

        //       // add body
        //       const body: any = {};
        //       const selectedBody: any = document.querySelectorAll('.body');
        //       selectedBody.forEach(function (param: any) {

        //           if (param.name) {
        //               body[param.name] = param.value;
        //           } else {
        //               try {
        //                   const str = param.value;
        //                   const obj = JSON.parse(str);
        //                   Object.assign(body, obj);
        //               } catch (error) {
        //                   console.error(param.value, 'not a json object');
        //               }
        //           }
        //       });

        //       let headers = {};
        //       if (this.store['att_security_context']) {
        //           headers = {
        //               'dev-iv-user': `"${this.store['att_security_context']}"`,
        //               'iv-user': `"${this.store['att_security_context']}"`
        //           };
        //       }
        //       this.client.prepare(url, method, params, body, queryString, headers);
    }
    prepare(url, method, params, body, query, headers) {
        // M.Rest.
        // console.log(url, method, params, body, query, headers);
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

        const formData = new FormData();
        Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
        });
        // add files

        // add headers
        this.url = url;
        this.request = new Request(url);

        this.options = {
            method: method,
            credentials: 'include',
            headers: Object.assign(headers, {
                'Content-Type': 'application/json'
            }),
            // headers: myHeaders,
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

            } catch (error) {
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
