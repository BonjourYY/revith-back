export interface BaseType {
  id: number;
  name: string;
}

export const BASE_TYPES: Readonly<BaseType[]> = [
  { id: 1, name: '爱国主义教育基地' },
  { id: 2, name: '科普教育基地' },
  { id: 3, name: '劳动教育实践基地' },
  { id: 4, name: '美丽乡村' },
];
