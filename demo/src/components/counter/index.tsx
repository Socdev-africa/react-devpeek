// src/components/Counter/index.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../contexts/ThemeContext';
import Card from '../common/Card';
import Button from '../common/Button';
import { RootState } from '../../redux/store';
import { 
  increment, 
  decrement, 
  reset, 
  setStep,
  setMin,
  setMax,
  setTitle 
} from '../../redux/counterSlice';

const CounterView: React.FC = () => {
  const { theme } = useTheme();
  const counterState = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  
  return (
    <div>
      <h2 style={{
        fontSize: theme.fontSizes.xxl,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.lg,
      }}>
        {counterState.title}
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 350px',
        gap: theme.spacing.xl,
      }}>
        {/* Counter display and controls */}
        <Card variant="glass">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing.lg,
          }}>
            {/* Counter value */}
            <div style={{
              fontSize: '72px',
              fontWeight: theme.fontWeights.bold,
              background: theme.colors.primary.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              padding: theme.spacing.md,
              borderRadius: theme.radii.lg,
              minWidth: '200px',
              textAlign: 'center',
            }}>
              {counterState.count}
            </div>
            
            {/* Counter controls */}
            <div style={{
              display: 'flex',
              gap: theme.spacing.md,
            }}>
              <Button
                variant="primary"
                size="lg"
                onClick={() => dispatch(decrement())}
                disabled={counterState.count <= counterState.min}
              >
                -
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => dispatch(reset())}
              >
                Reset
              </Button>
              
              <Button
                variant="primary"
                size="lg"
                onClick={() => dispatch(increment())}
                disabled={counterState.count >= counterState.max}
              >
                +
              </Button>
            </div>
            
            {/* Step size slider */}
            <div style={{
              width: '100%',
              maxWidth: '300px',
              marginTop: theme.spacing.md,
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: theme.spacing.xs,
              }}>
                <label 
                  htmlFor="step-size" 
                  style={{
                    fontSize: theme.fontSizes.sm,
                    color: theme.colors.text.secondary,
                  }}
                >
                  Step Size: {counterState.step}
                </label>
                <span style={{
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.primary.base,
                  fontWeight: theme.fontWeights.medium,
                }}>
                  {counterState.step}
                </span>
              </div>
              <input
                id="step-size"
                type="range"
                min="1"
                max="10"
                value={counterState.step}
                onChange={(e) => dispatch(setStep(parseInt(e.target.value)))}
                style={{
                  width: '100%',
                  accentColor: theme.colors.primary.base,
                }}
              />
            </div>
          </div>
        </Card>
        
        {/* Counter settings */}
        <Card title="Counter Settings" variant="glass">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: theme.spacing.md,
          }}>
            {/* Title input */}
            <div>
              <label 
                htmlFor="counter-title" 
                style={{
                  display: 'block',
                  marginBottom: theme.spacing.xs,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                Counter Title
              </label>
              <input
                id="counter-title"
                type="text"
                value={counterState.title}
                onChange={(e) => dispatch(setTitle(e.target.value))}
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
            
            {/* Min value input */}
            <div>
              <label 
                htmlFor="min-value" 
                style={{
                  display: 'block',
                  marginBottom: theme.spacing.xs,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                Minimum Value
              </label>
              <input
                id="min-value"
                type="number"
                value={counterState.min}
                onChange={(e) => dispatch(setMin(parseInt(e.target.value)))}
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
            
            {/* Max value input */}
            <div>
              <label 
                htmlFor="max-value" 
                style={{
                  display: 'block',
                  marginBottom: theme.spacing.xs,
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text.secondary,
                }}
              >
                Maximum Value
              </label>
              <input
                id="max-value"
                type="number"
                value={counterState.max}
                onChange={(e) => dispatch(setMax(parseInt(e.target.value)))}
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
        </Card>
      </div>
      
      {/* Counter history */}
      <Card title="Counter History" variant="glass" className="fade-in">
        <div style={{
          maxHeight: '200px',
          overflowY: 'auto',
          padding: theme.spacing.sm,
          backgroundColor: theme.colors.surface.secondary,
          borderRadius: theme.radii.md,
        }}>
          {counterState.history.map((value, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing.sm,
                borderRadius: theme.radii.sm,
                backgroundColor: index === counterState.history.length - 1 
                  ? `${theme.colors.primary.lightest}80` // Current value highlighted
                  : 'transparent',
                marginBottom: theme.spacing.xs,
              }}
            >
              <span style={{
                width: '30px',
                fontSize: theme.fontSizes.sm,
                color: theme.colors.text.secondary,
              }}>
                {index + 1}.
              </span>
              <span style={{
                fontSize: theme.fontSizes.md,
                fontWeight: index === counterState.history.length - 1 
                  ? theme.fontWeights.semibold 
                  : theme.fontWeights.regular,
                color: value > 0
                  ? theme.colors.success
                  : value < 0
                    ? theme.colors.error
                    : theme.colors.text.primary,
              }}>
                {value}
              </span>
              
              {/* Show change amount for non-first items */}
              {index > 0 && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: theme.fontSizes.sm,
                  color: theme.colors.text.tertiary,
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {value > counterState.history[index - 1] && (
                    <span style={{ color: theme.colors.success }}>▲ </span>
                  )}
                  {value < counterState.history[index - 1] && (
                    <span style={{ color: theme.colors.error }}>▼ </span>
                  )}
                  {value === counterState.history[index - 1] && (
                    <span>=</span>
                  )}
                  {Math.abs(value - counterState.history[index - 1])}
                </span>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CounterView;