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
import { Reserva } from '../domain/reserva.domain';

@ApiTags('Reserva')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}
  @Post()
  async create(@Body() createReservaDto: CreateReservaDto): Promise<Reserva> {
    return this.reservaService.createReserva(createReservaDto);
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
