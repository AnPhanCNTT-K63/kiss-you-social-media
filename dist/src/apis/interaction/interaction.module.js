"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const like_entity_1 = require("./entities/like.entity");
const interaction_controller_1 = require("./controllers/interaction.controller");
const post_module_1 = require("../post/post.module");
const like_service_1 = require("./like.service");
const comment_entity_1 = require("./entities/comment.entity");
const comment_response_entity_1 = require("./entities/comment-response.entity");
const comment_service_1 = require("./comment.service");
const comment_response_service_1 = require("./comment-response.service");
const share_entity_1 = require("./entities/share.entity");
const share_service_1 = require("./share.service");
const notification_module_1 = require("../notification/notification.module");
let InteractionModule = class InteractionModule {
};
exports.InteractionModule = InteractionModule;
exports.InteractionModule = InteractionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: like_entity_1.Like.name, schema: like_entity_1.LikeSchema },
                { name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema },
                { name: comment_response_entity_1.CommentResponse.name, schema: comment_response_entity_1.CommentResponseSchema },
                { name: share_entity_1.Share.name, schema: share_entity_1.ShareSchema },
            ]),
            post_module_1.PostModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [interaction_controller_1.InteractionController],
        providers: [
            like_service_1.LikeService,
            comment_service_1.CommentService,
            comment_response_service_1.CommentResponseService,
            share_service_1.ShareService,
        ],
        exports: [like_service_1.LikeService, comment_service_1.CommentService, comment_response_service_1.CommentResponseService, share_service_1.ShareService],
    })
], InteractionModule);
//# sourceMappingURL=interaction.module.js.map