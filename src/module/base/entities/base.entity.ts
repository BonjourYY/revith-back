import { Base } from '@/generated/client';
import { Exclude, Expose } from 'class-transformer';
import { baseTypeIdToNameMap } from 'src/constants/baseTypes.constant';

export class BaseEntity implements Base {
  id: number;
  name: string;
  contactPerson: string;
  contactPhone: string;
  type: number[];
  area: string;
  address: string;
  isChargeable: string;
  openDate: Date | null;
  openDuration: number | null;
  description: string | null;
  images: string[];

  @Expose()
  get typeNames(): string[] {
    // 确保 this.type 是一个数组，以防万一
    if (!Array.isArray(this.type)) {
      return [];
    }
    // 计算逻辑和之前一样，但现在封装在 getter 里
    return this.type.map(
      (id) => baseTypeIdToNameMap.get(id) || `未知类型ID: ${id}`,
    );
  }

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
}
