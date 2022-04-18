import { IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto extends User {
    @IsString()
    name: string;
}
