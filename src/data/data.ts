//типы обычно в отдельной папке types, но здесь данных мало и решил все сгруппировать

export type Data = {
  date: string;
  month: string;
  indicator: string;
  value: number;
}[];

export type Item = {
  name: string;
  value: string;
};

export const items: Item[] = [
  {
    name: '$',
    value: 'Курс доллара',
  },
  {
    name: '€',
    value: 'Курс евро',
  },
  {
    name: '¥',
    value: 'Курс юаня',
  },
];
