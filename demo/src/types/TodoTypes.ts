// src/types/TodoTypes.ts

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  tags: string[];
}

export type TodoFilter = 'all' | 'active' | 'completed';
export type PriorityFilter = 'all' | 'low' | 'medium' | 'high';

export interface TodoState {
  todos: TodoItem[];
  filter: TodoFilter;
  priorityFilter: PriorityFilter;
}

export type TodoAction =
  | { type: 'ADD_TODO'; payload: { text: string; priority?: 'low' | 'medium' | 'high'; tags?: string[] } }
  | { type: 'TOGGLE_TODO'; payload: { id: string } }
  | { type: 'DELETE_TODO'; payload: { id: string } }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<TodoItem> } }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: { filter: TodoFilter } }
  | { type: 'SET_PRIORITY_FILTER'; payload: { priority: PriorityFilter } };