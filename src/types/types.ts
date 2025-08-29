export interface Todo {
  text: string;
  completed: boolean;
}

export enum Filter {
  all = 'Все',
  active = 'Активные',
  completed = 'Завершенные'
};