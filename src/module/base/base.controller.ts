import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
} from '@nestjs/common';
import { BaseService } from './base.service';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { BASE_TYPES, BaseType } from 'src/constants/baseTypes.constant';
import { Public } from 'src/common/decorators/public.decorator';
import { BaseEntity } from './entities/base.entity';

@Controller('base')
@SerializeOptions({ type: BaseEntity })
@Public()
export class BaseController {
  constructor(private readonly baseService: BaseService) {}

  // 基地类型
  @Get('types')
  getAllBaseTypes(): BaseType[] {
    return [...BASE_TYPES];
  }

  // 新增基地
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

  // 更新基地
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDto: UpdateBaseDto) {
    return this.baseService.update(+id, updateBaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseService.remove(+id);
  }
}
