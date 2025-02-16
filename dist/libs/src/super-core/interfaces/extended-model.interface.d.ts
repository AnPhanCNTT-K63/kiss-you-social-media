import { Document, HydratedDocument } from 'mongoose';
export interface ExtendedModel<T extends Document> {
    find<ResultDoc = HydratedDocument<T>>(): any;
}
