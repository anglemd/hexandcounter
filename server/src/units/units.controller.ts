import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnitsService } from './units.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { Types } from 'mongoose';
import { IUnitJson } from './interfaces/unit.interface';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Post()
  create(@Body() createUnitDto: IUnitJson) {
    return this.unitsService.create(createUnitDto);
  }

  @Get()
  findAll() {
    return this.unitsService.findAll();
  }

  @Get('match/:term')
  findMatching(@Param('term') term: string) {
    return this.unitsService.findAllMatchingRecords(term);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.unitsService.findOneByOidOrRecordId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnitDto: IUnitJson) {
    return this.unitsService.update(id, updateUnitDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.unitsService.remove(+id);
  // }
}
