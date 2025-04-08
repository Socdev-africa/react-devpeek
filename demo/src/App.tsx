// src/App.tsx
import ReactDevPeek from '../../src/index';
import { Theme } from '../../src/types';
// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './contexts/ThemeContext';
// Store imports (we'll create these files separately)
import { useUserStore, useProductsStore, useCartStore, useAnalyticsStore } from './stores';
import { reduxStore } from './redux/store';

// Component imports
import Header from './components/common/Header';
import TabNavigation from './components/common/TabNavigation';


// Global CSS
import './index.css';
import ProductsView from './components/Products';
import CounterView from './components/counter';
import TodoView from './components/todo';
import FormView from './components/FormDemo';
import AnalyticsView from './components/Analytics';

const App: React.FC = () => {
    // State for active tab
    const [activeTab, setActiveTab] = useState<string>('products');

    // Initialize analytics and product data
    useEffect(() => {
        // Initialize analytics data
        useAnalyticsStore.getState().refreshData();

        // Fetch products
        useProductsStore.getState().fetchProducts();

        // Set localStorage items for demo
        localStorage.setItem('app_version', '1.5.3');
        localStorage.setItem('feature_flags', JSON.stringify({
            newDashboard: true,
            betaFeatures: true,
            experimentalApi: false,
            performanceMode: true
        }));

        // Set sessionStorage items
        sessionStorage.setItem('session_id', `sess_${Math.random().toString(36).substring(2, 15)}`);
        sessionStorage.setItem('csrf_token', `csrf_${Math.random().toString(36).substring(2, 15)}`);
    }, []);

    // Define tabs
    const tabs = [
        { id: 'products', label: 'Products', icon: '🛍️' },
        { id: 'counter', label: 'Counter', icon: '🔢' },
        { id: 'todo', label: 'Todo List', icon: '✅' },
        { id: 'form', label: 'Form Demo', icon: '📝' },
        { id: 'analytics', label: 'Analytics', icon: '📊' },
    ];

    return (
        <ThemeProvider>
            <Provider store={reduxStore}>
                <div className="app">
                    <Header title="React devpeek demo app" />

                    <main className="main-content">
                        <TabNavigation
                            tabs={tabs}
                            activeTab={activeTab}
                            onChange={setActiveTab}
                            variant="segmented"
                        />

                        {/* Tab content */}
                        <div className="tab-content">
                            {activeTab === 'products' && <ProductsView />}
                            {activeTab === 'counter' && <CounterView />}
                            {activeTab === 'todo' && <TodoView />}
                            {activeTab === 'form' && <FormView />}
                            {activeTab === 'analytics' && <AnalyticsView />}
                        </div>
                    </main>

                    {/* ReactDevPeek for development */}
                    <ReactDevPeek
                        showInProduction={true}
                        position="bottom-right"
                        theme={'system'}
                        enableLocalStorage={true}
                        enableSessionStorage={true}
                        stateAdapters={[
                            {
                                name: 'UserStore',
                                getState: useUserStore.getState,
                                subscribe: useUserStore.subscribe
                            },
                            {
                                name: 'ProductsStore',
                                getState: useProductsStore.getState,
                                subscribe: useProductsStore.subscribe
                            },
                            {
                                name: 'CartStore',
                                getState: useCartStore.getState,
                                subscribe: useCartStore.subscribe
                            },
                            {
                                name: 'AnalyticsStore',
                                getState: useAnalyticsStore.getState,
                                subscribe: useAnalyticsStore.subscribe
                            },
                            {
                                name: 'ReduxCounter',
                                getState: () => reduxStore.getState(),
                                subscribe: (callback) => {
                                    const unsubscribe = reduxStore.subscribe(callback);
                                    return unsubscribe;
                                }
                            }
                        ]}
                    />
                </div>
            </Provider>
        </ThemeProvider>
    );
};

export default App;