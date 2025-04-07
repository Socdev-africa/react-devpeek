// components/StateViewer.tsx
import React, { useState } from 'react';
import CustomJsonViewer from './CustomJsonViewer';

interface StateViewerProps {
    stateAdapters: Record<string, any>;
    refreshStates: () => void;
    isDarkMode: boolean;
}

export const StateViewer: React.FC<StateViewerProps> = ({
    stateAdapters,
    refreshStates,
    isDarkMode
}) => {
    const [filter, setFilter] = useState('');
    const [expandedAdapters, setExpandedAdapters] = useState<Set<string>>(new Set());

    // Get all adapter names
    const adapterNames = Object.keys(stateAdapters);

    // Filter adapter names based on search
    const filteredAdapterNames = adapterNames.filter(name =>
        name.toLowerCase().includes(filter.toLowerCase())
    );

    // Toggle adapter expansion
    const toggleAdapterExpanded = (adapterName: string) => {
        const newExpandedAdapters = new Set(expandedAdapters);
        if (newExpandedAdapters.has(adapterName)) {
            newExpandedAdapters.delete(adapterName);
        } else {
            newExpandedAdapters.add(adapterName);
        }
        setExpandedAdapters(newExpandedAdapters);
    };

    // Copy adapter state to clipboard
    const copyToClipboard = (data: any) => {
        try {
            navigator.clipboard.writeText(JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    return (
        <div>
            <div className="flex items-center mb-4">
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter state adapters..."
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
                <button
                    onClick={refreshStates}
                    className="ml-2 p-2 rounded"
                    aria-label="Refresh states"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                    </svg>
                </button>
            </div>

            {filteredAdapterNames.length === 0 ? (
                <div className="p-4 text-center">
                    {adapterNames.length === 0 ? (
                        <p className="text-gray-500">No state adapters connected. Add state adapters to see your app state here.</p>
                    ) : (
                        <p className="text-gray-500">No state adapters match your filter.</p>
                    )}
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredAdapterNames.map(adapterName => (
                        <div
                            key={adapterName}
                            className={`border rounded ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}
                        >
                            <div
                                className={`p-2 flex justify-between items-center cursor-pointer ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                                    }`}
                                onClick={() => toggleAdapterExpanded(adapterName)}
                            >
                                <h3 className="font-semibold">{adapterName}</h3>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(stateAdapters[adapterName]);
                                        }}
                                        className={`p-1 rounded ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
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
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        {expandedAdapters.has(adapterName) ? (
                                            <path d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z" />
                                        ) : (
                                            <path d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                        )}
                                    </svg>
                                </div>
                            </div>

                            {expandedAdapters.has(adapterName) && (
                                <div className={`p-2 overflow-auto max-h-96 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                                    <CustomJsonViewer
                                        data={stateAdapters[adapterName]}
                                        expandLevel={1}
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
};