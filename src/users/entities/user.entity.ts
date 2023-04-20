import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
    validate: {
      validator: (value: string) => /^[a-zA-Z0-9]+$/.test(value),
      message: 'Name should contain only letters and digits',
    },
  })
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @Prop({
    required: true,
    unique: true,
    validate: {
      validator: (value: string) =>
        // This regex may not cover all valid email addresses
        // but should catch most common mistakes
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: 'Invalid email format',
    },
  })
  @IsEmail()
  email: string;

  @Prop({
    required: true,
    minlength: 8,
  })
  @MinLength(8)
  password: string;

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
