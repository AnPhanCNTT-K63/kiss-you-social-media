export interface SuperGetOptions {
    route?: string;
}
export declare const SuperGet: (options?: SuperGetOptions) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
