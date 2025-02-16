import { Model } from 'mongoose';
import { Share } from './entities/share.entity';
import { CreateShareDto } from './dto/create-share.dto';
import { UserPayload } from 'src/common/models/user-payload.model';
import { PostService } from '../post/post.service';
import { NotificationService } from '../notification/notification.service';
export declare class ShareService {
    private readonly shareModel;
    private readonly postService;
    private readonly notificationService;
    constructor(shareModel: Model<Share>, postService: PostService, notificationService: NotificationService);
    create(shareDto: CreateShareDto, user: UserPayload): Promise<void>;
    count(postId: string): Promise<number>;
}
