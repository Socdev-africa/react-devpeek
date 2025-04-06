import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StateViewer } from './StateViewer';
import { StorageViewer } from './Storageiewer';

interface DebugPanelProps {
    isOpen: boolean;
    onClose: () => void;
    storageItems: any[];
    onRemoveStorageItem: (key: string, type: 'localStorage' | 'sessionStorage') => void;
    onClearStorage: (type: 'localStorage' | 'sessionStorage') => void;
    parseItemValue: (item: any) => any;
    onUpdateStorageItem: (key: string, value: string, type: 'localStorage' | 'sessionStorage') => void;
    adapterStates: Record<string, any>;
    refreshStates: () => void;
    refreshStorage: () => void;
    isDarkMode: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
    isOpen,
    onClose,
    storageItems,
    onRemoveStorageItem,
    onClearStorage,
    parseItemValue,
    onUpdateStorageItem,
    adapterStates,
    refreshStates,
    refreshStorage,
    isDarkMode
}) => {
    const [activeTab, setActiveTab] = useState<'storage' | 'state'>('storage');
    const [isPanelDragging, setIsPanelDragging] = useState(false);
    const [panelPosition, setPanelPosition] = useState({ x: 0, y: 0 });
    const constraintsRef = useRef(null);

    // Reset panel position when closing
    useEffect(() => {
        if (!isOpen) {
            setPanelPosition({ x: 0, y: 0 });
        }
    }, [isOpen]);

    const handleExport = () => {
        const data = {
            timestamp: new Date().toISOString(),
            storage: storageItems.reduce((acc, item) => {
                acc[`${item.type}:${item.key}`] = parseItemValue(item);
                return acc;
            }, {}),
            state: adapterStates
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `devpeek-export-${new Date().toISOString().replace(/:/g, '-')}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={constraintsRef}
                    className="fixed inset-0 z-devpeek pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className={`pointer-events-auto absolute w-4/5 max-w-xl h-4/5 rounded-lg shadow-devpeek overflow-hidden flex flex-col ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                            }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: panelPosition.x,
                            y: panelPosition.y
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.1}
                        onDragStart={() => setIsPanelDragging(true)}
                        onDragEnd={() => setIsPanelDragging(false)}
                        style={{
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {/* Panel Header */}
                        <div className={`p-3 flex items-center justify-between border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                            }`}>
                            <div className="flex items-center space-x-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={isDarkMode ? 'text-devpeek-accent' : 'text-devpeek-primary'}
                                >
                                    <polyline points="16 18 22 12 16 6"></polyline>
                                    <polyline points="8 6 2 12 8 18"></polyline>
                                </svg>
                                <h2 className="text-lg font-semibold">
                                    React DevPeek
                                </h2>
                            </div>

                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handleExport}
                                    className={`p-1.5 rounded hover:bg-opacity-80 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                        }`}
                                    title="Export data"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />
                                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={onClose}
                                    className={`p-1.5 rounded hover:bg-opacity-80 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                                        }`}
                                    title="Close panel"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className={`flex border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'
                            }`}>
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'storage'
                                    ? isDarkMode
                                        ? 'text-devpeek-accent border-b-2 border-devpeek-accent'
                                        : 'text-devpeek-primary border-b-2 border-devpeek-primary'
                                    : ''
                                    }`}
                                onClick={() => setActiveTab('storage')}
                            >
                                Storage
                            </button>
                            <button
                                className={`px-4 py-2 font-medium ${activeTab === 'state'
                                    ? isDarkMode
                                        ? 'text-devpeek-accent border-b-2 border-devpeek-accent'
                                        : 'text-devpeek-primary border-b-2 border-devpeek-primary'
                                    : ''
                                    }`}
                                onClick={() => setActiveTab('state')}
                            >
                                App State
                            </button>
                        </div>

                        {/* Panel Content */}
                        <div className="flex-1 overflow-y-auto p-4">
                            {activeTab === 'storage' && (
                                <StorageViewer
                                    items={storageItems}
                                    onRemove={onRemoveStorageItem}
                                    onClear={onClearStorage}
                                    parseItemValue={parseItemValue}
                                    onUpdate={onUpdateStorageItem}
                                    isDarkMode={isDarkMode}
                                />
                            )}

                            {activeTab === 'state' && (
                                <StateViewer
                                    stateAdapters={adapterStates}
                                    refreshStates={refreshStates}
                                    isDarkMode={isDarkMode}
                                />
                            )}
                        </div>

                        {/* Panel Footer */}
                        <div className={`p-2 text-xs text-center border-t ${isDarkMode ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'
                            }`}>
                            React DevPeek v0.1.0 • Drag header to move • <button
                                onClick={activeTab === 'storage' ? refreshStorage : refreshStates}
                                className="underline hover:text-devpeek-primary"
                            >
                                Refresh
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};