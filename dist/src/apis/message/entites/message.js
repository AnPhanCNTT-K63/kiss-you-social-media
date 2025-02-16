"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = exports.Message = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../../user/entities/user.entity");
const constants_1 = require("../../../constants");
const conversation_1 = require("../../conversation/entities/conversation");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
    }),
    __metadata("design:type", String)
], Message.prototype, "text", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        ref: 'User',
        refClass: user_entity_1.User,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Message.prototype, "sender", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        ref: 'Conversation',
        refClass: conversation_1.Conversation,
        required: true,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Message.prototype, "conversation", void 0);
exports.Message = Message = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: constants_1.COLLECTION_NAMES.MESSAGE,
    })
], Message);
exports.MessageSchema = mongoose_1.SchemaFactory.createForClass(Message);
exports.MessageSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=message.js.map