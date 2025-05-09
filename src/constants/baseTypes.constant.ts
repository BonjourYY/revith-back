export interface BaseType {
  id: number;
  name: string;
}

export const BASE_TYPES: Readonly<BaseType[]> = [
  { id: 1, name: '爱国主义教育基地' },
  { id: 2, name: '科普教育基地' },
  { id: 3, name: '劳动教育实践基地' },
  { id: 4, name: '美丽乡村' },
  { id: 5, name: '美2丽乡村' },
];

// 创建一个从 ID 到名称的映射，方便查找
export const baseTypeIdToNameMap: ReadonlyMap<number, string> = new Map(
  BASE_TYPES.map((type) => [type.id, type.name]),
);

// 创建一个包含所有有效 ID 的集合，方便验证
export const validBaseTypeIds: ReadonlySet<number> = new Set(
  BASE_TYPES.map((type) => type.id),
);
