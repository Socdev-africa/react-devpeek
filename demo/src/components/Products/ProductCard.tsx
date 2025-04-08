// src/components/Products/ProductCard.tsx
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';

// Import types
interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    ratings: number[];
}

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onRate: (productId: string, rating: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onRate }) => {
    const { theme } = useTheme();

    // Calculate average rating
    const averageRating = product.ratings.length > 0
        ? (product.ratings.reduce((a, b) => a + b, 0) / product.ratings.length).toFixed(1)
        : 'No ratings';

    // Stock status
    const getStockStatus = (): { color: string; label: string } => {
        if (product.stock > 20) {
            return {
                color: theme.colors.success,
                label: 'In Stock'
            };
        } else if (product.stock > 0) {
            return {
                color: theme.colors.warning,
                label: 'Low Stock'
            };
        } else {
            return {
                color: theme.colors.error,
                label: 'Out of Stock'
            };
        }
    };

    const stockStatus = getStockStatus();

    return (
        <Card variant="glass">
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}>
                {/* Category badge */}
                <div style={{
                    alignSelf: 'flex-start',
                    backgroundColor: `${theme.colors.primary.lightest}80`, // 80% opacity
                    color: theme.colors.primary.dark,
                    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                    borderRadius: theme.radii.full,
                    fontSize: theme.fontSizes.xs,
                    fontWeight: theme.fontWeights.medium,
                    marginBottom: theme.spacing.sm,
                }}>
                    {product.category}
                </div>

                {/* Product name */}
                <h3 style={{
                    fontSize: theme.fontSizes.xl,
                    fontWeight: theme.fontWeights.semibold,
                    margin: `0 0 ${theme.spacing.xs}`,
                    color: theme.colors.text.primary,
                }}>
                    {product.name}
                </h3>

                {/* Price */}
                <div style={{
                    fontSize: theme.fontSizes.xxl,
                    fontWeight: theme.fontWeights.bold,
                    color: theme.colors.primary.base,
                    margin: `${theme.spacing.xs} 0`,
                }}>
                    ${product.price.toFixed(2)}
                </div>

                {/* Product details */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    margin: `${theme.spacing.md} 0`,
                }}>
                    {/* Stock status */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.xs,
                    }}>
                        <div style={{
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: stockStatus.color,
                        }}></div>
                        <span style={{
                            fontSize: theme.fontSizes.sm,
                            color: theme.colors.text.secondary,
                        }}>
                            {stockStatus.label} ({product.stock})
                        </span>
                    </div>

                    {/* Rating */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.xs,
                    }}>
                        <span style={{
                            fontSize: theme.fontSizes.lg,
                        }}>
                            ⭐
                        </span>
                        <span style={{
                            fontSize: theme.fontSizes.sm,
                            fontWeight: theme.fontWeights.medium,
                        }}>
                            {averageRating}
                        </span>
                        <span style={{
                            fontSize: theme.fontSizes.xs,
                            color: theme.colors.text.tertiary,
                        }}>
                            ({product.ratings.length})
                        </span>
                    </div>
                </div>

                {/* Rating controls */}
                <div style={{
                    marginBottom: theme.spacing.md,
                }}>
                    <p style={{
                        fontSize: theme.fontSizes.sm,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing.xs,
                    }}>
                        Rate this product:
                    </p>
                    <div style={{
                        display: 'flex',
                        gap: theme.spacing.xs,
                    }}>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => onRate(product.id, rating)}
                                style={{
                                    backgroundColor: theme.colors.surface.secondary,
                                    border: 'none',
                                    borderRadius: theme.radii.full,
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: theme.fontSizes.sm,
                                    cursor: 'pointer',
                                    transition: theme.transitions.fast,
                                    color: theme.colors.text.primary,
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = theme.colors.primary.lightest;
                                    e.currentTarget.style.color = theme.colors.primary.dark;
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = theme.colors.surface.secondary;
                                    e.currentTarget.style.color = theme.colors.text.primary;
                                }}
                            >
                                {rating}★
                            </button>
                        ))}
                    </div>
                </div>

                {/* Add to cart button */}
                <div style={{ marginTop: 'auto' }}>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => onAddToCart(product)}
                        disabled={product.stock === 0}
                    >
                        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;