import { ConfigView } from './contracts/configview';
export { ConfigView } from './contracts/configview';
import { DescribeView } from './contracts/describeview';
export { DescribeView } from './contracts/describeview';
export declare function getAll(): string[];
export declare function get(contractName: string): typeof ConfigView | typeof DescribeView;
