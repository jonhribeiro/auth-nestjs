import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

export class UpdateUserDto extends PartialType(
    // inserindo as coluna que nao pode ser atualizada no update
    OmitType(CreateUserDto, ['email', 'password'] as const),
) {}
