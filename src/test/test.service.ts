import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class TestService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager: Cache) {}
  findAll() {
    // await this.cacheManager.set('key', { a: 112 });
    // return await this.cacheManager.get('key');
    console.log('缓存失效');
    return { a: 112 };
  }
}
