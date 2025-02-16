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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const app_settings_1 = require("../../configs/app-settings");
const mongoose_1 = require("mongoose");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }
    async verifyPassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    async register(userRegister) {
        try {
            const { username, email, password } = userRegister;
            var existingUser = await this.userService.getOne({ username });
            if (existingUser)
                throw new common_1.BadRequestException('Tên đã được người khác sử dụng');
            var existingUserEmail = await this.userService.getOne({ email });
            if (existingUserEmail)
                throw new common_1.BadRequestException('Email đã tồn tại');
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await this.userService.creatOne({
                username,
                email,
                password: hashedPassword,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
    async login(userLogin) {
        const { email, password } = userLogin;
        const user = await this.userService.getOne({ email });
        if (!user) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Invalid email or password');
        }
        if (user.isBanned)
            throw new common_1.BadRequestException('Tài khoản đã bị cấm');
        if (user.isDeleted)
            throw new common_1.BadRequestException('Tài khoản đã bị khoá, sau 30 ngày sẽ tiến hành xóa');
        const userPayload = {
            _id: user._id,
            role: user.role,
            email: user.email,
            username: user.username,
        };
        const token = await this.getTokens(userPayload);
        return token;
    }
    async getTokens(user) {
        const { _id, role, email, username } = user;
        const payload = { _id, role, email, username };
        const [refreshToken, accessToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                expiresIn: app_settings_1.appSettings.jwt.refreshExpireIn,
                secret: app_settings_1.appSettings.jwt.refreshSecret,
            }),
            this.jwtService.signAsync(payload, {
                expiresIn: app_settings_1.appSettings.jwt.expireIn,
                secret: app_settings_1.appSettings.jwt.secret,
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async checkPassword(checkDto) {
        try {
            const existingUser = await this.userService.getOne({
                _id: new mongoose_1.Types.ObjectId(checkDto.user),
            });
            const isPasswordValid = await bcrypt.compare(checkDto.password, existingUser.password);
            if (!isPasswordValid) {
                throw new common_1.BadRequestException('Invalid email or password');
            }
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map