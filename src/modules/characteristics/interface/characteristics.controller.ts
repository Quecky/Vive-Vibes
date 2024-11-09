import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CharacteristicsService } from '../application/service/characteristics.service';
import { CreateCharacteristicDto } from '../application/dto/create-characteristic.dto';
import { UpdateCharacteristicDto } from '../application/dto/update-characteristic.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('characteristic')
@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Post()
  create(@Body() createCharacteristicDto: CreateCharacteristicDto) {
    return this.characteristicsService.create(createCharacteristicDto);
  }

  @Get()
  findAll() {
    return this.characteristicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characteristicsService.finById(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCharacteristicDto: UpdateCharacteristicDto,
  ) {
    return this.characteristicsService.update(+id, updateCharacteristicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsService.delete(+id);
  }
}
