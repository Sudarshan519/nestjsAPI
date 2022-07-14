import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress.dto";

export class CreateCustomerDto {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNumberString()
    @IsNotEmpty()
    id: number;
    @ValidateNested()
    @Type(() => CreateAddressDto)
    @IsNotEmpty()
    address: CreateAddressDto
}