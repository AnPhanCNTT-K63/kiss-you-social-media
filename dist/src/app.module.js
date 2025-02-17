"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const app_settings_1 = require("./configs/app-settings");
const config_1 = require("@nestjs/config");
const user_module_1 = require("./apis/user/user.module");
const auth_module_1 = require("./apis/auth/auth.module");
const post_module_1 = require("./apis/post/post.module");
const s3_module_1 = require("./packages/s3/s3.module");
const medias_module_1 = require("./apis/media/medias.module");
const conversation_module_1 = require("./apis/conversation/conversation.module");
const message_module_1 = require("./apis/message/message.module");
const interaction_module_1 = require("./apis/interaction/interaction.module");
const notification_module_1 = require("./apis/notification/notification.module");
const schedule_1 = require("@nestjs/schedule");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            schedule_1.ScheduleModule.forRoot(),
            mongoose_1.MongooseModule.forRootAsync({
                useFactory: async () => ({
                    uri: app_settings_1.appSettings.mongoose.uri,
                }),
            }),
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            post_module_1.PostModule,
            s3_module_1.S3Module,
            medias_module_1.MediaModule,
            conversation_module_1.ConversationModule,
            message_module_1.MessageModule,
            interaction_module_1.InteractionModule,
            notification_module_1.NotificationModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map