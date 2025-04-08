// src/components/Products/index.tsx
import React, { useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useProductsStore, useCartStore } from '../../stores';
import Card from '../common/Card';
import Button from '../common/Button';
import ProductCard from './ProductCard';
import CartSummary from './CartSummary';
import { Product } from '../../types/ProductTypes';

const ProductsView: React.FC = () => {
    const { theme } = useTheme();
    const products = useProductsStore();
    const cart = useCartStore();
    const [sortOption, setSortOption] = useState<string>('name-asc');

    useEffect(() => {
        if (products.products.length === 0) {
            products.fetchProducts();
        }
    }, [products]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSortOption(value);
        const [key, order] = value.split('-');
        products.sortProducts(key as keyof Product, order as 'asc' | 'desc');
    };

    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: theme.spacing.lg,
            }}>
                <h2 style={{
                    fontSize: theme.fontSizes.xxl,
                    fontWeight: theme.fontWeights.bold,
                    color: theme.colors.text.primary,
                    margin: 0,
                }}>
                    Product Catalog
                </h2>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.md,
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.sm,
                    }}>
                        <label htmlFor="sort-select" style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.text.secondary,
                        }}>
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={sortOption}
                            onChange={handleSortChange}
                            style={{
                                padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                borderRadius: theme.radii.md,
                                border: `1px solid ${theme.colors.border.medium}`,
                                backgroundColor: theme.colors.surface.primary,
                                color: theme.colors.text.primary,
                                fontSize: theme.fontSizes.sm,
                            }}
                        >
                            <option value="name-asc">Name (A-Z)</option>
                            <option value="name-desc">Name (Z-A)</option>
                            <option value="price-asc">Price (Low to High)</option>
                            <option value="price-desc">Price (High to Low)</option>
                            <option value="stock-asc">Stock (Low to High)</option>
                            <option value="stock-desc">Stock (High to Low)</option>
                        </select>
                    </div>

                    <div style={{
                        position: 'relative',
                    }}>
                        <Button
                            variant="primary"
                            icon={<span>🛒</span>}
                        >
                            Cart ({cart.getTotalItems()})
                        </Button>
                        {cart.getTotalItems() > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                right: '-8px',
                                backgroundColor: theme.colors.error,
                                color: 'white',
                                borderRadius: '50%',
                                width: '20px',
                                height: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: theme.fontSizes.xs,
                                fontWeight: theme.fontWeights.bold,
                            }}>
                                {cart.getTotalItems()}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Category filters */}
            <Card variant="glass">
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: theme.spacing.sm,
                }}>
                    <Button
                        variant="primary"
                        onClick={() => products.filterByCategory('All')}
                    >
                        All Products
                    </Button>

                    {products.categories.map(category => (
                        <Button
                            key={category}
                            variant="outline"
                            onClick={() => products.filterByCategory(category)}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </Card>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 350px',
                gap: theme.spacing.xl,
                marginTop: theme.spacing.xl,
            }}>
                {/* Product grid */}
                <div>
                    {products.loading ? (
                        <Card>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: theme.spacing.xl,
                            }}>
                                <div className="loading-spinner"></div>
                                <span style={{ marginLeft: theme.spacing.md }}>Loading products...</span>
                            </div>
                        </Card>
                    ) : products.filteredProducts.length === 0 ? (
                        <Card>
                            <div style={{
                                textAlign: 'center',
                                padding: theme.spacing.xl,
                            }}>
                                <p style={{
                                    fontSize: theme.fontSizes.lg,
                                    marginBottom: theme.spacing.md,
                                }}>
                                    No products found
                                </p>
                                <Button variant="primary" onClick={() => products.filterByCategory('All')}>
                                    Show all products
                                </Button>
                            </div>
                        </Card>
                    ) : (
                        <div className="products-grid">
                            {products.filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={cart.addItem}
                                    onRate={products.addRating}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Cart summary */}
                <div>
                    <CartSummary />
                </div>
            </div>
        </div>
    );
};

export default ProductsView;