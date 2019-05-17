import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Rest } from '@methodus/client';
var TestRouteService = /** @class */ (function () {
    function TestRouteService() {
        this._subscriptions = {};
        this.options = {};
    }
    TestRouteService.prototype.activate = function (uri, methodInformation) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var argsForRequest, restRequest, result;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        argsForRequest = [];
                        methodInformation.params.forEach(function (param) {
                            argsForRequest.push(param.value);
                        });
                        restRequest = new Rest(uri, methodInformation.verb, methodInformation.params, argsForRequest);
                        return [4 /*yield*/, restRequest.execute()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    TestRouteService.prototype.prepare = function (url, method, params, body, query, headers) {
        // M.Rest.
        // console.log(url, method, params, body, query, headers);
        if (params && url) {
            params.forEach(function (param) {
                if (url) {
                    url = url.replace(':' + param.id, param.value);
                }
            });
        }
        if (query && query.length > 0) {
            url = url + '?' + query.join('&');
        }
        var formData = new FormData();
        Object.keys(body).forEach(function (key) {
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
    };
    TestRouteService.prototype.execute = function (responseCB, jsonCB, htmlCB) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var response, jsonResult, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch(this.request, this.options)];
                    case 1:
                        response = _a.sent();
                        if (responseCB) {
                            responseCB(response);
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, response.text()];
                    case 3:
                        jsonResult = _a.sent();
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
                        return [2 /*return*/, jsonResult];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.text()];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TestRouteService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], TestRouteService);
    return TestRouteService;
}());
export { TestRouteService };
//# sourceMappingURL=test-route.service.js.map