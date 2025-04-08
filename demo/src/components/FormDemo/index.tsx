// src/components/FormDemo/index.tsx
import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';

interface FormState {
    username: string;
    email: string;
    password: string;
    rememberMe: boolean;
    notifications: 'all' | 'important' | 'none';
    interests: string[];
}

interface FormErrors {
    username: string;
    email: string;
    password: string;
}

const FormView: React.FC = () => {
    const { theme } = useTheme();

    // Form state
    const [formState, setFormState] = useState<FormState>({
        username: '',
        email: '',
        password: '',
        rememberMe: false,
        notifications: 'all',
        interests: [],
    });

    // Form validation errors
    const [formErrors, setFormErrors] = useState<FormErrors>({
        username: '',
        email: '',
        password: '',
    });

    // Form submission state
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormState(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Validation
        if (name === 'username' && value.trim() === '') {
            setFormErrors(prev => ({ ...prev, username: 'Username is required' }));
        } else if (name === 'username') {
            setFormErrors(prev => ({ ...prev, username: '' }));
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setFormErrors(prev => ({ ...prev, email: 'Invalid email format' }));
            } else {
                setFormErrors(prev => ({ ...prev, email: '' }));
            }
        }

        if (name === 'password' && value.length < 8) {
            setFormErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
        } else if (name === 'password') {
            setFormErrors(prev => ({ ...prev, password: '' }));
        }
    };

    // Handle interest changes
    const handleInterestChange = (interest: string) => {
        setFormState(prev => {
            const currentInterests = [...prev.interests];

            if (currentInterests.includes(interest)) {
                // Remove if already selected
                return {
                    ...prev,
                    interests: currentInterests.filter(i => i !== interest)
                };
            } else {
                // Add if not selected
                return {
                    ...prev,
                    interests: [...currentInterests, interest]
                };
            }
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Check for any errors
        const hasErrors = Object.values(formErrors).some(error => error !== '');

        if (!hasErrors) {
            // Here you would normally make an API call
            console.log('Form submitted:', formState);

            // For demo purposes, simulate success
            setIsSubmitted(true);

            // Store in localStorage for demo
            localStorage.setItem('form_submission', JSON.stringify({
                ...formState,
                submittedAt: new Date().toISOString()
            }));
        }
    };

    // Handle form reset
    const handleReset = () => {
        setFormState({
            username: '',
            email: '',
            password: '',
            rememberMe: false,
            notifications: 'all',
            interests: [],
        });

        setFormErrors({
            username: '',
            email: '',
            password: '',
        });

        setIsSubmitted(false);
    };

    return (
        <div>
            <h2 style={{
                fontSize: theme.fontSizes.xxl,
                fontWeight: theme.fontWeights.bold,
                color: theme.colors.text.primary,
                marginBottom: theme.spacing.lg,
            }}>
                Form State Management
            </h2>

            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 400px',
                gap: theme.spacing.xl,
            }}>
                {/* Form */}
                <Card variant="glass">
                    {isSubmitted ? (
                        <div style={{
                            textAlign: 'center',
                            padding: theme.spacing.xl,
                        }}>
                            <div style={{
                                fontSize: '72px',
                                marginBottom: theme.spacing.md,
                            }}>
                                ✅
                            </div>
                            <h3 style={{
                                fontSize: theme.fontSizes.xl,
                                fontWeight: theme.fontWeights.bold,
                                color: theme.colors.success,
                                marginBottom: theme.spacing.md,
                            }}>
                                Form Submitted Successfully!
                            </h3>
                            <p style={{
                                fontSize: theme.fontSizes.md,
                                color: theme.colors.text.secondary,
                                marginBottom: theme.spacing.lg,
                            }}>
                                Thank you for your submission, {formState.username}.
                            </p>
                            <Button variant="primary" onClick={handleReset}>
                                Reset Form
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: theme.spacing.lg,
                            }}>
                                {/* Account Information Section */}
                                <div>
                                    <h3 style={{
                                        fontSize: theme.fontSizes.lg,
                                        fontWeight: theme.fontWeights.semibold,
                                        marginBottom: theme.spacing.md,
                                        color: theme.colors.primary.base,
                                    }}>
                                        Account Information
                                    </h3>

                                    {/* Username */}
                                    <div style={{ marginBottom: theme.spacing.md }}>
                                        <label
                                            htmlFor="username"
                                            style={{
                                                display: 'block',
                                                marginBottom: theme.spacing.xs,
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.text.secondary,
                                            }}
                                        >
                                            Username:
                                        </label>
                                        <input
                                            id="username"
                                            type="text"
                                            name="username"
                                            value={formState.username}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: theme.spacing.md,
                                                borderRadius: theme.radii.lg,
                                                border: `1px solid ${formErrors.username
                                                    ? theme.colors.error
                                                    : theme.colors.border.medium}`,
                                                backgroundColor: theme.colors.surface.primary,
                                                color: theme.colors.text.primary,
                                            }}
                                        />
                                        {formErrors.username && (
                                            <div style={{
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.error,
                                                marginTop: theme.spacing.xs,
                                            }}>
                                                {formErrors.username}
                                            </div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div style={{ marginBottom: theme.spacing.md }}>
                                        <label
                                            htmlFor="email"
                                            style={{
                                                display: 'block',
                                                marginBottom: theme.spacing.xs,
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.text.secondary,
                                            }}
                                        >
                                            Email:
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formState.email}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: theme.spacing.md,
                                                borderRadius: theme.radii.lg,
                                                border: `1px solid ${formErrors.email
                                                    ? theme.colors.error
                                                    : theme.colors.border.medium}`,
                                                backgroundColor: theme.colors.surface.primary,
                                                color: theme.colors.text.primary,
                                            }}
                                        />
                                        {formErrors.email && (
                                            <div style={{
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.error,
                                                marginTop: theme.spacing.xs,
                                            }}>
                                                {formErrors.email}
                                            </div>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label
                                            htmlFor="password"
                                            style={{
                                                display: 'block',
                                                marginBottom: theme.spacing.xs,
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.text.secondary,
                                            }}
                                        >
                                            Password:
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={formState.password}
                                            onChange={handleInputChange}
                                            style={{
                                                width: '100%',
                                                padding: theme.spacing.md,
                                                borderRadius: theme.radii.lg,
                                                border: `1px solid ${formErrors.password
                                                    ? theme.colors.error
                                                    : theme.colors.border.medium}`,
                                                backgroundColor: theme.colors.surface.primary,
                                                color: theme.colors.text.primary,
                                            }}
                                        />
                                        {formErrors.password && (
                                            <div style={{
                                                fontSize: theme.fontSizes.sm,
                                                color: theme.colors.error,
                                                marginTop: theme.spacing.xs,
                                            }}>
                                                {formErrors.password}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Preferences Section */}
                                <div>
                                    <h3 style={{
                                        fontSize: theme.fontSizes.lg,
                                        fontWeight: theme.fontWeights.semibold,
                                        marginBottom: theme.spacing.md,
                                        color: theme.colors.primary.base,
                                    }}>
                                        Preferences
                                    </h3>

                                    {/* Remember Me */}
                                    <div style={{ marginBottom: theme.spacing.md }}>
                                        <label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: theme.spacing.sm,
                                            cursor: 'pointer',
                                        }}>
                                            <input
                                                type="checkbox"
                                                name="rememberMe"
                                                checked={formState.rememberMe}
                                                onChange={handleInputChange}
                                            />
                                            <span>Remember me</span>
                                        </label>
                                    </div>

                                    {/* Notification Settings */}
                                    <div style={{ marginBottom: theme.spacing.md }}>
                                        <p style={{
                                            marginBottom: theme.spacing.xs,
                                            fontSize: theme.fontSizes.sm,
                                            color: theme.colors.text.secondary,
                                        }}>
                                            Notification Settings:
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: theme.spacing.xs,
                                        }}>
                                            {(['all', 'important', 'none'] as const).map(option => (
                                                <label
                                                    key={option}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: theme.spacing.sm,
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="notifications"
                                                        value={option}
                                                        checked={formState.notifications === option}
                                                        onChange={handleInputChange}
                                                    />
                                                    <span>
                                                        {option === 'all' ? 'All notifications' :
                                                            option === 'important' ? 'Important only' :
                                                                'No notifications'}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Interests */}
                                    <div>
                                        <p style={{
                                            marginBottom: theme.spacing.xs,
                                            fontSize: theme.fontSizes.sm,
                                            color: theme.colors.text.secondary,
                                        }}>
                                            Interests:
                                        </p>
                                        <div style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            gap: theme.spacing.sm,
                                            marginBottom: theme.spacing.md,
                                        }}>
                                            {['development', 'design', 'devops', 'management'].map(interest => (
                                                <label
                                                    key={interest}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: theme.spacing.sm,
                                                        padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
                                                        borderRadius: theme.radii.full,
                                                        backgroundColor: formState.interests.includes(interest)
                                                            ? `${theme.colors.primary.lightest}80`
                                                            : theme.colors.surface.secondary,
                                                        border: `1px solid ${formState.interests.includes(interest)
                                                            ? theme.colors.primary.base
                                                            : 'transparent'}`,
                                                        color: formState.interests.includes(interest)
                                                            ? theme.colors.primary.dark
                                                            : theme.colors.text.primary,
                                                        cursor: 'pointer',
                                                        transition: theme.transitions.fast,
                                                    }}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={formState.interests.includes(interest)}
                                                        onChange={() => handleInterestChange(interest)}
                                                        style={{ display: 'none' }}
                                                    />
                                                    <span style={{ fontSize: theme.fontSizes.sm }}>
                                                        {interest.charAt(0).toUpperCase() + interest.slice(1)}
                                                    </span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Form Actions */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: theme.spacing.md,
                                }}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>

                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={
                                            !formState.username ||
                                            !formState.email ||
                                            !formState.password ||
                                            Object.values(formErrors).some(error => error !== '')
                                        }
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </Card>

                {/* Form State Preview */}
                <Card title="Form State Preview" variant="glass">
                    <pre
                        style={{
                            backgroundColor: theme.colors.surface.secondary,
                            padding: theme.spacing.md,
                            borderRadius: theme.radii.md,
                            fontSize: theme.fontSizes.sm,
                            fontFamily: theme.fonts.mono,
                            overflow: 'auto',
                            maxHeight: '600px',
                            color: theme.colors.text.primary,
                        }}
                    >
                        {JSON.stringify(
                            {
                                values: formState,
                                errors: formErrors,
                                isValid: !Object.values(formErrors).some(error => error !== ''),
                                isSubmitted
                            },
                            null,
                            2
                        )}
                    </pre>
                </Card>
            </div>
        </div>
    );
};

export default FormView;