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
exports.ConversationSchema = exports.Conversation = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const constants_1 = require("../../../constants");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
let Conversation = class Conversation {
};
exports.Conversation = Conversation;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Array,
    }),
    __metadata("design:type", Array)
], Conversation.prototype, "members", void 0);
exports.Conversation = Conversation = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: constants_1.COLLECTION_NAMES.CONVERSATION,
    })
], Conversation);
exports.ConversationSchema = mongoose_1.SchemaFactory.createForClass(Conversation);
exports.ConversationSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=conversation.js.map