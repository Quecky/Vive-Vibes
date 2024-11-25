import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    } from '@nestjs/common';
    import { ApiTags } from '@nestjs/swagger';
import { ImagesAttachedsService } from '../application/service/img.service';
import { CreateImagenDto } from '../application/dto/create-imagen.dto';
import { UpdateImagenDto } from '../application/dto/update-imagen.dto';

    @ApiTags('Images')
    @Controller('images')
    export class ImagesAttachedController {
        constructor(
        private readonly imagenAttachedService: ImagesAttachedsService,
        ) {}
    
        @Post()
        create(@Body() createImagenDto: CreateImagenDto) {
        return this.imagenAttachedService.create(createImagenDto);
        }
    
        @Get()
        findAll() {
        return this.imagenAttachedService.findAll();
        }
    
        @Get(':id')
        findOne(@Param('id') id: string) {
        return this.imagenAttachedService.finById(+id);
        }
    
        @Patch(':id')
        update(
        @Param('id') id: string,
        @Body() updateImagenDto: UpdateImagenDto,
        ) {
        return this.imagenAttachedService.update(+id, updateImagenDto);
        }
    
        @Delete(':id')
        remove(@Param('id') id: string) {
        return this.imagenAttachedService.delete(+id);
        }
    }
    