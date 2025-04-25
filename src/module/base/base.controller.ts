import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BASE_TYPES, BaseType } from 'src/constants/baseTypes.constant';

@Controller('base')
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  @Get('types')
  getAllBaseTypes(): BaseType[] {
    return [...BASE_TYPES];
  }

  @Post()
  create(@Body() createBaseDto: CreateBaseDto) {
    return this.baseService.create(createBaseDto);
  }

  @Get()
  findAll() {
    return this.baseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
