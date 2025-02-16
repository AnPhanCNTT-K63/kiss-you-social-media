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
exports.ChatGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor() {
        this.users = [];
    }
    addUser(userId, socketId) {
        if (!this.users.some((user) => user.userId === userId)) {
            this.users.push({ userId, socketId });
        }
    }
    removeUser(socketId) {
        this.users = this.users.filter((user) => user.socketId !== socketId);
    }
    getUser(userId) {
        return this.users.find((user) => user.userId === userId);
    }
    handleConnection(client) {
        console.log('A user connected:', client.id);
    }
    handleDisconnect(client) {
        console.log('A user disconnected:', client.id);
        this.removeUser(client.id);
        this.server.emit('getUsers', this.users);
    }
    handleAddUser(client, userId) {
        this.addUser(userId, client.id);
        this.server.emit('getUsers', this.users);
    }
    handleSendMessage(client, payload) {
        const { senderId, receiverId, text } = payload;
        const user = this.getUser(receiverId);
        if (user) {
            this.server.to(user.socketId).emit('getMessage', { senderId, text });
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('addUser'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleAddUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleSendMessage", null);
exports.ChatGateway = ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(3002, {
        cors: {
            origin: '*',
        },
    })
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map