import { ValidationArguments, ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
import { Connection } from 'mongoose';
interface IsExistOptions {
    collectionName: string;
    isArray?: boolean;
}
export declare class IsExistConstraint implements ValidatorConstraintInterface {
    private readonly connection;
    constructor(connection: Connection);
    validate(value: any, args: ValidationArguments): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
export declare function IsExist(options: IsExistOptions & ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
export {};
