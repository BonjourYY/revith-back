import { Injectable } from '@nestjs/common';
import { CreateBaseDto } from './dto/create-base.dto';
import { UpdateBaseDto } from './dto/update-base.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BaseService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBaseDto: CreateBaseDto) {
    return this.prisma.base.create({ data: createBaseDto });
  }

  findAll() {
    return this.prisma.base.findMany();
  }

  findOne(id: number) {
    return this.prisma.base.findUnique({ where: { id } });
  }

  update(id: number, updateBaseDto: UpdateBaseDto) {
    return this.prisma.base.update({ data: updateBaseDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.base.delete({ where: { id } });
  }
}
