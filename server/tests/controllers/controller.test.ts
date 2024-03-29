import {
    MethodResult, Response, Request, SecurityContext, Verbs, Headers,
    Method, Query, Param, MethodMock, MethodConfig, Body, MethodError,
    Files, Cookies, MethodPipe, MethodResultStatus, generateUuid,
} from '@methodus/server';

@MethodConfig('TestController')
export class TestController {
    @MethodMock({})
    @Method(Verbs.Get, '/api/player')
    public static async list(@Headers('auth') auth: string, @Query('order_by') orderBy: any): Promise<any> {
        const result = new MethodResult([1, 2, 3, 4, 5], 5, 2);
        result.pipe({});
        result.on('finish', (data: any) => {
            return data;
        });
        result.setHeader('good-header', generateUuid());
        return result;
    }

    @Method(Verbs.Get, '/api/player/:player_name/desfaults')
    public static async listdefaults(@Param('player_name') player_name: any,
        @Body() body: any,
        @Headers() headers: any,
        @Files() files: any,
        @Cookies() cookies: any,
        @Query() query: any,
        @Response() res: any,
        @Request() req: any,
        @SecurityContext() securityContext: any,
    ): Promise<any> {
        return new MethodResultStatus([1, 2, 3, 4, 5], 203, 5, 1);
    }

    @MethodPipe(Verbs.Post, '/api/player')
    public static async create(@Files('files') files: any,
        @Cookies('cookies') cookies: any, @Body('name') name: string) {
        return new MethodResult({ name });
    }

    @Method(Verbs.Get, '/api/player/:player_id')
    public static async read(@Param('player_id') playerId: number) {
        return new MethodResult(playerId);
    }

    @Method(Verbs.Get, '/api/player/:field/:value')
    public static async getByField(@Param('field') field: string, @Param('value') value: number) {
        return new MethodResult({});
    }

    @Method(Verbs.Put, '/api/player')
    public static async update() {
        return new MethodResult({});
    }

    @Method(Verbs.Delete, '/api/player/:id')
    public static async delete(@Param('id') id: string) {
        return new MethodResult(id);
    }

}
