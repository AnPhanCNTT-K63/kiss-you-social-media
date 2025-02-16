import { Injectable } from '@nestjs/common';
import { LikeService } from './like.service';

@Injectable()
export class InteractionService {
  constructor(private readonly likeService: LikeService) {}
}
