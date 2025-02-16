import { CreateNotificationDto } from 'src/apis/notification/dto/create-notification.dto';
export declare class CreateCommentDto {
    post: string;
    content: string;
    notification: CreateNotificationDto;
}
