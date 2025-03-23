import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateMemberDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    mobile:string;

    @IsNotEmpty()
    @IsString()
    address:string;

}
