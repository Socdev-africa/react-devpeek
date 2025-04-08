// demo/src/App.tsx
import React, { useEffect } from 'react';
import ReactDevPeek from '../../src/index';
import { create } from 'zustand';

// Create a Zustand store
interface TestStoreState {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const useTestStore = create<TestStoreState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
}));

function App() {
    // Set some localStorage items
    useEffect(() => {
        localStorage.setItem('testString', 'Hello world');
        localStorage.setItem('testNumber', '42');
        localStorage.setItem('testObject', JSON.stringify({ name: 'Test', value: 123 }));

        sessionStorage.setItem('sessionTest', 'Session value');
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">React DevPeek Demo</h1>

            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                    onClick={() => useTestStore.getState().increment()}
                >
                    Increment
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    onClick={() => useTestStore.getState().decrement()}
                >
                    Decrement
                </button>
            </div>

            <div className="mb-4">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => localStorage.setItem('random', Math.random().toString())}
                >
                    Add Random Value
                </button>
            </div>

            <ReactDevPeek
                showInProduction={true}
                position="bottom-right"
                theme="light"
                stateAdapters={[
                    {
                        name: 'TestStore',
                        getState: useTestStore.getState,
                        subscribe: useTestStore.subscribe
                    }
                ]}
            />
        </div>
    );
}

export default App;