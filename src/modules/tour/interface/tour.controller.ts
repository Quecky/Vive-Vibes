import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TourService } from '../application/service/tour.service';
import { CreateTourDto } from '../application/dto/create-tour.dto';
import { UpdateTourDto } from '../application/dto/update-tour.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tour')
@Controller('tour')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post()
  create(@Body() createTourDto: CreateTourDto) {
    return this.tourService.create(createTourDto);
  }

  @Get()
  findAll() {
    return this.tourService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tourService.finById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTourDto: UpdateTourDto) {
    return this.tourService.update(+id, updateTourDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tourService.delete(+id);
  }

  @Delete(':tourId/characteristic/:characteristicId')
  deleteCharacteristic(
    @Param('tourId') tourId: string,
    @Param('characteristicId') characteristicId: string,
  ) {
    return this.tourService.deleteCharacteristic(+tourId, +characteristicId);
  }
}
