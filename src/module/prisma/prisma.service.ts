import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '../../generated/client';
import { PrismaClient } from '@/generated/client';

@Injectable()
export class PrismaService extends PrismaClient {}
