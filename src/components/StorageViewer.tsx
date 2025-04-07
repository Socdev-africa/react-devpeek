import React, { useState } from 'react';
import { StorageItem } from '../types';
import { formatValue, truncateString, getStringByteSize, formatBytes } from '../utils/formatters';
import CustomJsonViewer from './CustomJsonViewer';

interface StorageViewerProps {
    items: StorageItem[];
    onRemove: (key: string, type: 'localStorage' | 'sessionStorage') => void;
    onClear: (type: 'localStorage' | 'sessionStorage') => void;
    parseItemValue: (item: StorageItem) => any;
    onUpdate: (key: string, value: string, type: 'localStorage' | 'sessionStorage') => void;
    isDarkMode: boolean;
}

export const StorageViewer: React.FC<StorageViewerProps> = ({
    items,
    onRemove,
    onClear,
    parseItemValue,
    onUpdate,
    isDarkMode
}) => {
    const [filter, setFilter] = useState('');
    const [editingItem, setEditingItem] = useState<StorageItem | null>(null);
    const [editValue, setEditValue] = useState('');
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    // Filter items based on search
    const filteredItems = items.filter(item =>
        item.key.toLowerCase().includes(filter.toLowerCase()) ||
        item.value.toLowerCase().includes(filter.toLowerCase())
    );

    // Group items by storage type
    const localStorageItems = filteredItems.filter(item => item.type === 'localStorage');
    const sessionStorageItems = filteredItems.filter(item => item.type === 'sessionStorage');

    // Toggle item expansion
    const toggleItemExpanded = (itemKey: string) => {
        const newExpandedItems = new Set(expandedItems);
        if (newExpandedItems.has(itemKey)) {
            newExpandedItems.delete(itemKey);
        } else {
            newExpandedItems.add(itemKey);
        }
        setExpandedItems(newExpandedItems);
    };

    // Start editing an item
    const startEditing = (item: StorageItem) => {
        setEditingItem(item);
        setEditValue(item.value);
    };

    // Save edited value
    const saveEdit = () => {
        if (editingItem) {
            onUpdate(editingItem.key, editValue, editingItem.type);
            setEditingItem(null);
        }
    };

    // Cancel editing
    const cancelEdit = () => {
        setEditingItem(null);
    };

    // Copy item value to clipboard
    const copyToClipboard = (value: string) => {
        navigator.clipboard.writeText(value);
    };

    const renderStorageSection = (title: string, storageItems: StorageItem[], storageType: 'localStorage' | 'sessionStorage') => (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title} ({storageItems.length})</h3>
                <button
                    onClick={() => onClear(storageType)}
                    className="px-2 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
                    disabled={storageItems.length === 0}
                >
                    Clear All
                </button>
            </div>

            {storageItems.length === 0 ? (
                <p className="text-gray-500 italic">No items found.</p>
            ) : (
                <div className="space-y-2">
                    {storageItems.map(item => (
                        <div
                            key={`${item.type}-${item.key}`}
                            className={`border rounded p-2 ${isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="font-mono text-sm mb-1 break-all">{item.key}</div>
                                    <div className="text-xs text-gray-500 mb-1">
                                        {formatBytes(getStringByteSize(item.value))}
                                    </div>
                                </div>
                                <div className="flex space-x-1">
                                    <button
                                        onClick={() => toggleItemExpanded(`${item.type}-${item.key}`)}
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                            }`}
                                        aria-label={expandedItems.has(`${item.type}-${item.key}`) ? 'Collapse' : 'Expand'}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            {expandedItems.has(`${item.type}-${item.key}`) ? (
                                                <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                            ) : (
                                                <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                            )}
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => copyToClipboard(item.value)}
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                            }`}
                                        aria-label="Copy"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => startEditing(item)}
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                                            }`}
                                        aria-label="Edit"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => onRemove(item.key, item.type)}
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700 text-red-400' : 'hover:bg-gray-100 text-red-500'
                                            }`}
                                        aria-label="Delete"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {!expandedItems.has(`${item.type}-${item.key}`) && (
                                <div className="mt-1 font-mono text-xs truncate">
                                    {truncateString(formatValue(parseItemValue(item)), 100)}
                                </div>
                            )}

                            {expandedItems.has(`${item.type}-${item.key}`) && (
                                <div className="mt-2 p-2 rounded font-mono text-xs overflow-auto max-h-60">
                                    <CustomJsonViewer
                                        data={parseItemValue(item)}
                                        expandLevel={2}
                                        theme={isDarkMode ? 'dark' : 'light'}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter storage items..."
                    className={`w-full p-2 border rounded ${isDarkMode
                            ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                            : 'bg-white border-gray-300 text-gray-800 placeholder-gray-400'
                        }`}
                />
                {filter && (
                    <button
                        onClick={() => setFilter('')}
                        className="ml-2 p-2 rounded-full"
                        aria-label="Clear filter"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                )}
            </div>

            {renderStorageSection('Local Storage', localStorageItems, 'localStorage')}
            {renderStorageSection('Session Storage', sessionStorageItems, 'sessionStorage')}

            {/* Edit Modal */}
            {editingItem && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-devpeek">
                    <div className={`w-full max-w-lg p-4 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <h3 className="text-lg font-semibold mb-2">Edit {editingItem.key}</h3>
                        <textarea
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className={`w-full h-40 p-2 border rounded font-mono mb-4 ${isDarkMode
                                    ? 'bg-gray-700 border-gray-600 text-white'
                                    : 'bg-white border-gray-300 text-gray-800'
                                }`}
                        ></textarea>
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={cancelEdit}
                                className={`px-3 py-1 rounded ${isDarkMode
                                        ? 'bg-gray-700 hover:bg-gray-600'
                                        : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={saveEdit}
                                className="px-3 py-1 rounded bg-devpeek-primary text-white hover:bg-devpeek-secondary"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};