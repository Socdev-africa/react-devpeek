// src/components/Products/CartSummary.tsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { useCartStore } from '../../stores';
import type { CartItem } from '../../types/CartTypes';

const CartSummary: React.FC = () => {
    const { theme } = useTheme();
    const cart = useCartStore();
    const [couponInput, setCouponInput] = useState('');

    const handleApplyCoupon = () => {
        if (couponInput.trim()) {
            cart.applyCoupon(couponInput.trim());
            setCouponInput('');
        }
    };

    return (
        <Card title="Shopping Cart" variant="glass">
            {cart.items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: theme.spacing.lg }}>
                    <p style={{
                        fontSize: theme.fontSizes.lg,
                        color: theme.colors.text.secondary,
                        marginBottom: theme.spacing.md
                    }}>
                        Your cart is empty
                    </p>
                    <Button variant="outline">Browse Products</Button>
                </div>
            ) : (
                <>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: theme.spacing.md,
                        marginBottom: theme.spacing.lg
                    }}>
                        {cart.items.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div style={{
                        padding: theme.spacing.md,
                        background: theme.colors.surface.secondary,
                        borderRadius: theme.radii.md,
                        marginBottom: theme.spacing.lg
                    }}>
                        {/* Coupon input */}
                        <div style={{
                            display: 'flex',
                            gap: theme.spacing.xs,
                            marginBottom: theme.spacing.md
                        }}>
                            <input
                                type="text"
                                value={couponInput}
                                onChange={(e) => setCouponInput(e.target.value)}
                                placeholder="Enter coupon code"
                                style={{
                                    flex: 1,
                                    padding: theme.spacing.sm,
                                    borderRadius: theme.radii.md,
                                    border: `1px solid ${theme.colors.border.medium}`,
                                    backgroundColor: theme.colors.surface.primary,
                                    color: theme.colors.text.primary,
                                }}
                            />
                            <Button variant="secondary" onClick={handleApplyCoupon}>
                                Apply
                            </Button>
                        </div>

                        {/* Order summary */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: theme.spacing.xs
                        }}>
                            <SummaryRow
                                label="Subtotal"
                                value={`$${cart.getSubtotal().toFixed(2)}`}
                            />

                            {cart.couponCode && (
                                <SummaryRow
                                    label={`Discount (${cart.couponCode})`}
                                    value={`-$${cart.getDiscountAmount().toFixed(2)}`}
                                    valueColor={theme.colors.success}
                                />
                            )}

                            <SummaryRow
                                label={`Tax (${(cart.taxRate * 100).toFixed(0)}%)`}
                                value={`$${cart.getTaxAmount().toFixed(2)}`}
                            />

                            <div style={{ margin: `${theme.spacing.xs} 0` }}>
                                <hr style={{
                                    border: 'none',
                                    borderTop: `1px solid ${theme.colors.border.light}`
                                }} />
                            </div>

                            <SummaryRow
                                label="Total"
                                value={`$${cart.getTotal().toFixed(2)}`}
                                isBold
                            />
                        </div>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: theme.spacing.md,
                        justifyContent: 'space-between'
                    }}>
                        <Button variant="outline" onClick={() => cart.clearCart()}>
                            Clear Cart
                        </Button>
                        <Button variant="primary">
                            Checkout ({cart.getTotalItems()} items)
                        </Button>
                    </div>
                </>
            )}
        </Card>
    );
};

// Individual cart item component
interface CartItemProps {
    item: CartItem;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const { theme } = useTheme();
    const cart = useCartStore();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: theme.spacing.sm,
            borderBottom: `1px solid ${theme.colors.border.light}`,
        }}>
            <div style={{ flex: 1 }}>
                <div style={{
                    fontWeight: theme.fontWeights.medium,
                    marginBottom: theme.spacing.xs
                }}>
                    {item.name}
                </div>
                <div style={{
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.text.secondary
                }}>
                    ${item.price.toFixed(2)} × {item.quantity}
                </div>
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: theme.spacing.sm
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: theme.spacing.xs,
                    border: `1px solid ${theme.colors.border.medium}`,
                    borderRadius: theme.radii.full,
                    overflow: 'hidden',
                }}>
                    <button
                        onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        style={{
                            border: 'none',
                            background: 'none',
                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                            cursor: 'pointer',
                            fontWeight: theme.fontWeights.bold,
                            color: theme.colors.text.secondary,
                        }}
                    >
                        −
                    </button>
                    <span style={{
                        minWidth: '24px',
                        textAlign: 'center'
                    }}>
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                        style={{
                            border: 'none',
                            background: 'none',
                            padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                            cursor: 'pointer',
                            fontWeight: theme.fontWeights.bold,
                            color: theme.colors.text.secondary,
                        }}
                    >
                        +
                    </button>
                </div>

                <button
                    onClick={() => cart.removeItem(item.id)}
                    style={{
                        border: 'none',
                        background: 'none',
                        color: theme.colors.error,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );
};

// Summary row component
interface SummaryRowProps {
    label: string;
    value: string;
    isBold?: boolean;
    valueColor?: string;
}

const SummaryRow: React.FC<SummaryRowProps> = ({
    label,
    value,
    isBold = false,
    valueColor
}) => {
    const { theme } = useTheme();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: isBold ? theme.fontSizes.lg : theme.fontSizes.md,
            fontWeight: isBold ? theme.fontWeights.semibold : theme.fontWeights.regular,
        }}>
            <span>{label}</span>
            <span style={{
                color: valueColor || (isBold ? theme.colors.primary.base : theme.colors.text.primary)
            }}>
                {value}
            </span>
        </div>
    );
};

export default CartSummary;