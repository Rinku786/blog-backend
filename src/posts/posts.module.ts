import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity';

@Module({
  imports: [Post],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
