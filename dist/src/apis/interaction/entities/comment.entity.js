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
exports.CommentSchema = exports.Comment = void 0;
const super_prop_decorator_1 = require("../../../../libs/src/super-core/decorators/super-prop.decorator");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_entity_1 = require("../../post/entities/post.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const constants_1 = require("../../../constants");
const aggregate_root_schema_1 = require("../../../entities/aggregate-root.schema");
const autopopulate_soft_delete_1 = require("../../../utils/mongoose-plugins/autopopulate-soft-delete");
const comment_response_entity_1 = require("./comment-response.entity");
let Comment = class Comment extends aggregate_root_schema_1.AggregateRoot {
};
exports.Comment = Comment;
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: String,
        required: false,
    }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: Number,
        required: false,
        default: 0,
    }),
    __metadata("design:type", Number)
], Comment.prototype, "likes", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: false,
        ref: 'User',
        refClass: user_entity_1.User,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comment.prototype, "user", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: [mongoose_2.Types.ObjectId],
        required: false,
        ref: 'CommentResponse',
        refClass: comment_response_entity_1.CommentResponse,
    }),
    __metadata("design:type", Array)
], Comment.prototype, "responses", void 0);
__decorate([
    (0, super_prop_decorator_1.SuperProp)({
        type: mongoose_2.Types.ObjectId,
        required: true,
        ref: 'Post',
        refClass: post_entity_1.Post,
    }),
    __metadata("design:type", mongoose_2.Types.ObjectId)
], Comment.prototype, "post", void 0);
exports.Comment = Comment = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true,
        collection: constants_1.COLLECTION_NAMES.COMMENT,
    })
], Comment);
exports.CommentSchema = mongoose_1.SchemaFactory.createForClass(Comment);
exports.CommentSchema.plugin(autopopulate_soft_delete_1.default);
//# sourceMappingURL=comment.entity.js.map