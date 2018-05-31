import { Proxy } from './dynamicProxy';
import { CacheManager } from './cache';
export class UI {
    client: any;
    store: any;
    constructor() {
        var storedStr = localStorage.getItem('methodusTestParams') || '{}';
        this.store = JSON.parse(storedStr);
        var selected: any = document.querySelectorAll('.store');
        selected.forEach((param: any) => {
            const cacheValue = this.store[param.name || param.id];
            if (cacheValue !== undefined && cacheValue !== null) {
                param.value = cacheValue;
            }
        });
        this.client = new Proxy();
    }


    public renderJsonResponse(element, data, options) {
        options = options || { collapsed: true };
        ($(element) as any).jsonViewer(data, options);
    }

    cacheParams() {
        var selected: any = document.querySelectorAll('.store');
        const storedStr = localStorage.getItem('methodusTestParams') || '{}';
        this.store = JSON.parse(storedStr);


        selected.forEach((param: any) => {
            this.store[param.name || param.id] = param.value;
        });

        localStorage.setItem('methodusTestParams', JSON.stringify(this.store));
        return true;
    }
    updateParam() {
        //document.getElementById('TestForm').action = url;
        // execute();


        //build the request url (params + query)
        var selected: any = document.querySelectorAll('.param');
        const testForm = document.getElementById('TestForm');

        const params: any = [];

        if (testForm) {
            var url = testForm.getAttribute('xaction');
            const method = testForm.getAttribute('method');
            if (selected && url) {
                selected.forEach(function (param: any) {
                    params.push({ id: param.id, value: param.value });
                });
            }

            var selectedQuery: any = document.querySelectorAll('.query');
            let queryString: any = [];

            selectedQuery.forEach(function (param: any) {
                if (param.value) {
                    queryString.push(`${param.id}=${param.value}`);
                }

            })

            const RequestUrl = document.getElementById('RequestUrl');
            if (RequestUrl) {
                let finalUrl = url;
                params.forEach((param) => {
                    finalUrl = finalUrl.replace(`:${param.id}`, param.value);
                })
                RequestUrl.innerHTML = finalUrl;
            }

            //add body
            const body: any = {};
            let selectedBody: any = document.querySelectorAll('.body');
            selectedBody.forEach(function (param: any) {

                if (param.name) {
                    body[param.name] = param.value;
                } else {
                    try {
                        const str = param.value;
                        const obj = JSON.parse(str);
                        Object.assign(body, obj);
                    } catch (error) {
                        console.error(param.value, 'not a json object');
                    }
                }
            });

            let headers = {};
            if (this.store['att_security_context']) {
                headers = {
                    "dev-iv-user": `"${this.store['att_security_context']}"`,
                    "iv-user": `"${this.store['att_security_context']}"`
                };
            }
            this.client.prepare(url, method, params, body, queryString, headers);
        }
    }

    async jsonHandler(json) {

        $('#HtmlPane').hide();
        $('#JsonPane').show();
        ($('#JsonPane') as any).jsonViewer(json, { collapsed: false });
    }
    async htmlHandler(html) {
        $('#JsonPane').hide();
        $('#HtmlPane').html(html).show();
    }

    async responseHandler(response) {
        const responseHeaders = document.getElementById('ResponseHeaders');
        if (responseHeaders) {
            responseHeaders.innerHTML = JSON.stringify({ url: response.url });
        }
        const RequestUrl = document.getElementById('RequestUrl');
        if (RequestUrl) {
            RequestUrl.innerHTML = response.url;
        }

        if (response.status === 200) {
            $('#ResultStatusOK').show();
            $('#ResultStatusBAD').hide();
        } else {
            $('#ResultStatusOK').hide();
            $('#ResultStatusBAD').show();
        }
        $('#StatusCode').html(response.status);



    }

    async execute() {
        this.cacheParams();
        this.updateParam();
        await this.client.execute(this.responseHandler, this.jsonHandler, this.htmlHandler);
    }
}





(window as any).ui = new UI();


