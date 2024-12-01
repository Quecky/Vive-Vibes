import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateImagenDto {
    @ApiProperty()
    @IsString()
    name: string;

    @IsString()
    @ApiProperty()
    url: string;
}
