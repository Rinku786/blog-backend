import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DATABASE_URL),
    UsersModule, 
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
