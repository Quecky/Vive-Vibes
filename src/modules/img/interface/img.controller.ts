import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
    HttpException,
    HttpStatus,
    } from '@nestjs/common';
    import { ApiTags } from '@nestjs/swagger';
import { ImagesAttachedsService } from '../application/service/img.service';
import { CreateImagenDto } from '../application/dto/create-imagen.dto';
import { UpdateImagenDto } from '../application/dto/update-imagen.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../multer-config';

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

        
        @Post('upload-multiple')
        @UseInterceptors(FilesInterceptor('files', 10, multerConfig)) // Hasta 10 archivos
        async uploadMultipleImages(@UploadedFiles() files: Express.Multer.File[]) {
            if (!files || files.length === 0) {
            throw new HttpException('No se proporcionaron archivos', HttpStatus.BAD_REQUEST);
            }

            try {
            const uploadedImages = await this.imagenAttachedService.uploadImages2(files);
            return {
                message: 'Imágenes subidas con éxito',
                // data: uploadedImages,
                data: uploadedImages.map(image => ({
                    name: image.name, // El nombre original del archivo o procesado
                    url: image.url,   // URL devuelta por S3
                })),
            };
            } catch (error) {
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

    }
    