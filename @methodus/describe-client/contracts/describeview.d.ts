export declare class DescribeView {
    static base: string;
    static getMethodusData(): Promise<any>;
    static getMethodusDataClass(className: string): Promise<any>;
    static describeproxy(applicationEndpoint: string, applicationName: string): Promise<any>;
    static info(): Promise<any>;
    static swaggerize(env: string): Promise<any>;
    static dashboard(): Promise<any>;
    parentFrame(): Promise<any>;
    describe(): Promise<any>;
    static action(className: string, actionKey: string): Promise<any>;
    eventAction(className: string, actionKey: string): Promise<any>;
}
