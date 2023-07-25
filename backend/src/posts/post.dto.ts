import {IsNotEmpty, MinLength} from 'class-validator';

export class PostDto {
  @IsNotEmpty()
  @MinLength(1)
  readonly content: string;
}
