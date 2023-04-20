import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types  } from 'mongoose';
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

export type PostDocument = Post & Document;

@Schema()
export class Post {
    @Prop({
        required: true,
        minlength: 10,
        maxlength: 100,
    })
    @MinLength(10)
    @MaxLength(100)
    @IsNotEmpty()
    title: string;

    @Prop({
        required: true,
        minlength: 100,
        maxlength: 5000,
    })
    @MinLength(100)
    @MaxLength(5000)
    @IsNotEmpty()
    content: string;

    @Prop({
        type: Date,
        default: Date.now,
    })
    createdAt: Date;

    @Prop({
        type: Date,
        default: Date.now,
    })
    updatedAt: Date;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    @IsNotEmpty()
    author: User

}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.pre<PostDocument>('findOneAndUpdate', function () {
    this.set({ updatedAt: Date.now() });
});