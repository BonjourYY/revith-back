import { BadRequestException, Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    return cat;
  }

  findAll(): Cat[] {
    // throw new BadRequestException();
    return this.cats;
  }
}
