import { SchemaTypeOptions } from 'mongoose';
export declare class SuperPropOptions extends SchemaTypeOptions<any> {
    autoPopulateExclude?: boolean;
    refClass?: any;
    cms?: {
        label?: string;
        tableShow?: boolean;
        index?: boolean;
        columnPosition?: number;
    };
}
export declare const SuperProp: (options?: SuperPropOptions) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
