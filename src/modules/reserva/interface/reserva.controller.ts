import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservaService } from '../application/service/reserva.service';
import { CreateReservaDto } from '../application/dto/create-reserva.dto';
import { UpdateReservaDto } from '../application/dto/update-reserva.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservaService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.reservaService.delete(+id);
  }
}
