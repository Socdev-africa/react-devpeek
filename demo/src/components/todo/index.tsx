import React, { useReducer, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import {
    TodoState,
    TodoAction,
    TodoItem,
    TodoFilter,
    PriorityFilter
} from '../../types/TodoTypes';

const initialState: TodoState = {
    todos: [
        {
            id: '1',
            text: 'Learn React Hooks',
            completed: false,
            priority: 'high',
            createdAt: new Date().toISOString(),
            tags: ['learning', 'react']
        },
        {
            id: '2',
            text: 'Build a modern UI',
            completed: true,
            priority: 'medium',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            tags: ['design', 'development']
        },
        {
            id: '3',
            text: 'Write documentation',
            completed: false,
            priority: 'medium',
            createdAt: new Date(Date.now() - 172800000).toISOString(),
            tags: ['writing', 'docs']
        }
    ],
    filter: 'all',
    priorityFilter: 'all'
};

// Reducer function
function todoReducer(state: TodoState, action: TodoAction): TodoState {
    switch (action.type) {
        case 'ADD_TODO':
            const newTodo: TodoItem = {
                id: `todo-${Date.now()}`,
                text: action.payload.text,
                completed: false,
                priority: action.payload.priority || 'medium',
                createdAt: new Date().toISOString(),
                tags: action.payload.tags || []
            };
            return {
                ...state,
                todos: [...state.todos, newTodo]
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };

        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload.id)
            };

        case 'UPDATE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id
                        ? { ...todo, ...action.payload.updates }
                        : todo
                )
            };

        case 'CLEAR_COMPLETED':
            return {
                ...state,
                todos: state.todos.filter(todo => !todo.completed)
            };

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload.filter
            };

        case 'SET_PRIORITY_FILTER':
            return {
                ...state,
                priorityFilter: action.payload.priority
            };

        default:
            return state;
    }
}

const TodoView: React.FC = () => {
    const { theme } = useTheme();
    const [state, dispatch] = useReducer(todoReducer, initialState);
    const [newTodoText, setNewTodoText] = useState('');
    const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [newTodoTags, setNewTodoTags] = useState('');

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            dispatch({
                type: 'ADD_TODO',
                payload: {
                    text: newTodoText,
                    priority: newTodoPriority,
                    tags: newTodoTags.split(',').map(tag => tag.trim()).filter(Boolean)
                }
            });
            setNewTodoText('');
            setNewTodoTags('');
        }
    };

    // Filter todos based on current filters
    const filteredTodos = state.todos.filter(todo => {
        // Filter by completion status
        if (state.filter === 'active' && todo.completed) return false;
        if (state.filter === 'completed' && !todo.completed) return false;

        // Filter by priority
        if (state.priorityFilter !== 'all' && todo.priority !== state.priorityFilter) return false;

        return true;
    });

    return (
        <div>
            <h2 style={{
                fontSize: theme.fontSizes.xxl,
                fontWeight: theme.fontWeights.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
            }}>
                Todo List Manager
            </h2>

            {/* Add todo form */}
            <Card variant="glass">
                <form onSubmit={handleAddTodo}>
                    <div style={{
                        display: 'flex',
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.md,
                    }}>
                        <input
                            type="text"
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder="What needs to be done?"
                            style={{
                                flex: 1,
                                padding: theme.spacing.md,
                                borderRadius: theme.radii.lg,
                                border: `1px solid ${theme.colors.border.medium}`,
                                backgroundColor: theme.colors.surface.primary,
                                color: theme.colors.text.primary,
                                fontSize: theme.fontSizes.md,
                            }}
                        />
                        <Button
                            type="submit"
                            variant="primary"
                            disabled={!newTodoText.trim()}
                        >
                            Add Todo
                        </Button>
                    </div>

                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: theme.spacing.md,
                        alignItems: 'center',
                    }}>
                        {/* Priority selection */}
                        <div>
                            <label style={{
                                fontSize: theme.fontSizes.sm,
                                color: theme.colors.text.secondary,
                                marginBottom: theme.spacing.xs,
                                display: 'block',
                            }}>
                                Priority:
                            </label>
                            <div style={{
                                display: 'flex',
                                gap: theme.spacing.xs,
                            }}>
                                {(['low', 'medium', 'high'] as const).map(priority => (
                                    <label
                                        key={priority}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                            borderRadius: theme.radii.full,
                                            backgroundColor:
                                                priority === newTodoPriority
                                                    ? priority === 'high'
                                                        ? theme.colors.error
                                                        : priority === 'medium'
                                                            ? theme.colors.warning
                                                            : theme.colors.success
                                                    : theme.colors.surface.secondary,
                                            color:
                                                priority === newTodoPriority
                                                    ? theme.colors.text.inverse
                                                    : theme.colors.text.primary,
                                            cursor: 'pointer',
                                            fontSize: theme.fontSizes.sm,
                                            transition: theme.transitions.fast,
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={priority}
                                            checked={newTodoPriority === priority}
                                            onChange={() => setNewTodoPriority(priority)}
                                            style={{ display: 'none' }}
                                        />
                                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tags input */}
                        <div style={{ flex: 1 }}>
                            <label
                                htmlFor="tags-input"
                                style={{
                                    fontSize: theme.fontSizes.sm,
                                    color: theme.colors.text.secondary,
                                    marginBottom: theme.spacing.xs,
                                    display: 'block',
                                }}
                            >
                                Tags (comma separated):
                            </label>
                            <input
                                id="tags-input"
                                type="text"
                                value={newTodoTags}
                                onChange={(e) => setNewTodoTags(e.target.value)}
                                placeholder="e.g. work, personal, urgent"
                                style={{
                                    width: '100%',
                                    padding: theme.spacing.sm,
                                    borderRadius: theme.radii.md,
                                    border: `1px solid ${theme.colors.border.medium}`,
                                    backgroundColor: theme.colors.surface.primary,
                                    color: theme.colors.text.primary,
                                }}
                            />
                        </div>
                    </div>
                </form>
            </Card>

            {/* Todo filters */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: `${theme.spacing.lg} 0`,
            }}>
                <div style={{
                    display: 'flex',
                    gap: theme.spacing.sm,
                }}>
                    {/* Status filter */}
                    <select
                        value={state.filter}
                        onChange={(e) => dispatch({
                            type: 'SET_FILTER',
                            payload: { filter: e.target.value as TodoFilter }
                        })}
                        style={{
                            padding: theme.spacing.sm,
                            borderRadius: theme.radii.md,
                            border: `1px solid ${theme.colors.border.medium}`,
                            backgroundColor: theme.colors.surface.primary,
                            color: theme.colors.text.primary,
                        }}
                    >
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>

                    {/* Priority filter */}
                    <select
                        value={state.priorityFilter}
                        onChange={(e) => dispatch({
                            type: 'SET_PRIORITY_FILTER',
                            payload: { priority: e.target.value as PriorityFilter }
                        })}
                        style={{
                            padding: theme.spacing.sm,
                            borderRadius: theme.radii.md,
                            border: `1px solid ${theme.colors.border.medium}`,
                            backgroundColor: theme.colors.surface.primary,
                            color: theme.colors.text.primary,
                        }}
                    >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                {/* Clear completed */}
                <Button
                    variant="outline"
                    onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
                    disabled={!state.todos.some(todo => todo.completed)}
                >
                    Clear Completed
                </Button>
            </div>

            {/* Todo list */}
            <div className="todo-list">
                {filteredTodos.length === 0 ? (
                    <Card className="fade-in">
                        <div style={{
                            textAlign: 'center',
                            padding: theme.spacing.xl,
                        }}>
                            <p style={{
                                fontSize: theme.fontSizes.lg,
                                color: theme.colors.text.secondary,
                                marginBottom: theme.spacing.md,
                            }}>
                                {state.filter === 'all'
                                    ? 'No todos to display'
                                    : state.filter === 'active'
                                        ? 'No active todos'
                                        : 'No completed todos'}
                            </p>
                            {state.filter !== 'all' && (
                                <Button
                                    variant="outline"
                                    onClick={() => dispatch({
                                        type: 'SET_FILTER',
                                        payload: { filter: 'all' }
                                    })}
                                >
                                    Show all todos
                                </Button>
                            )}
                        </div>
                    </Card>
                ) : (
                    filteredTodos.map(todo => (
                        <Card
                            key={todo.id}
                            variant="glass"
                            className={`fade-in ${todo.completed ? 'completed' : ''}`}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: theme.spacing.md,
                            }}>
                                {/* Checkbox */}
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id={`todo-${todo.id}`}
                                        checked={todo.completed}
                                        onChange={() => dispatch({
                                            type: 'TOGGLE_TODO',
                                            payload: { id: todo.id }
                                        })}
                                    />
                                    <label htmlFor={`todo-${todo.id}`}>
                                        <div className="checkbox-custom"></div>
                                    </label>
                                </div>

                                {/* Todo content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{
                                        fontSize: theme.fontSizes.lg,
                                        fontWeight: theme.fontWeights.medium,
                                        color: todo.completed
                                            ? theme.colors.text.tertiary
                                            : theme.colors.text.primary,
                                        textDecoration: todo.completed ? 'line-through' : 'none',
                                        marginBottom: todo.tags.length > 0 ? theme.spacing.xs : 0,
                                    }}>
                                        {todo.text}
                                    </div>

                                    {/* Todo metadata */}
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: theme.spacing.md,
                                        fontSize: theme.fontSizes.sm,
                                        color: theme.colors.text.tertiary,
                                    }}>
                                        {/* Priority badge */}
                                        <span style={{
                                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                            borderRadius: theme.radii.full,
                                            fontSize: theme.fontSizes.xs,
                                            fontWeight: theme.fontWeights.medium,
                                            backgroundColor:
                                                todo.priority === 'high'
                                                    ? `${theme.colors.error}40`
                                                    : todo.priority === 'medium'
                                                        ? `${theme.colors.warning}40`
                                                        : `${theme.colors.success}40`,
                                            color:
                                                todo.priority === 'high'
                                                    ? theme.colors.error
                                                    : todo.priority === 'medium'
                                                        ? theme.colors.warning
                                                        : theme.colors.success,
                                        }}>
                                            {todo.priority}
                                        </span>

                                        {/* Date */}
                                        <span>
                                            {new Date(todo.createdAt).toLocaleDateString()}
                                        </span>

                                        {/* Tags */}
                                        {todo.tags.length > 0 && (
                                            <div style={{
                                                display: 'flex',
                                                gap: theme.spacing.xs,
                                                flexWrap: 'wrap',
                                            }}>
                                                {todo.tags.map((tag, index) => (
                                                    <span
                                                        key={index}
                                                        style={{
                                                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                                            borderRadius: theme.radii.full,
                                                            backgroundColor: theme.colors.surface.secondary,
                                                            fontSize: theme.fontSizes.xs,
                                                        }}
                                                    >
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <Button
                                    variant="error"
                                    size="sm"
                                    onClick={() => dispatch({
                                        type: 'DELETE_TODO',
                                        payload: { id: todo.id }
                                    })}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoView;