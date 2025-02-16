import { ApiPropertyOptions } from '@nestjs/swagger';
export type SuperApiPropertyOptions = ApiPropertyOptions & {
    cms?: {
        ref?: string;
        isShow?: boolean;
        widget?: 'textarea' | 'password' | 'textEditor';
    };
};
export declare const SuperApiProperty: (options?: SuperApiPropertyOptions) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
