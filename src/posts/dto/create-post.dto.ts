import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreatePostDto {
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(100)
    title: string;
  
    @IsNotEmpty()
    @MinLength(100)
    @MaxLength(5000)
    content: string;
  
    @IsNotEmpty()
    author: string;
}
