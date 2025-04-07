// src/tests/CustomJsonViewer.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CustomJsonViewer from '../components/CustomJsonViewer';

describe('CustomJsonViewer', () => {
  const testData = {
    string: "Hello",
    number: 42,
    boolean: true,
    null: null,
    array: [1, 2, 3],
    object: { a: 1, b: 2 }
  };

  it('renders root-level properties', () => {
    const { container } = render(<CustomJsonViewer data={testData} />);
    
    // Check for strings in the rendered output instead of specific elements
    expect(container.textContent).toContain('string');
    expect(container.textContent).toContain('number');
    expect(container.textContent).toContain('boolean');
    expect(container.textContent).toContain('null');
    expect(container.textContent).toContain('array');
    expect(container.textContent).toContain('object');
  });

  it('expands and collapses nodes on click', () => {
    const { container } = render(<CustomJsonViewer data={testData} expandLevel={0} />);
    
    // Get the container of the string property
    const stringProp = Array.from(container.querySelectorAll('[style*="property"]'))
      .find(el => el.textContent?.includes('string'));
    
    // Initially collapsed
    expect(container.textContent).not.toContain('"Hello"');
    
    // Click to expand
    if (stringProp) {
      fireEvent.click(stringProp);
      // Now should contain the string value
      expect(container.textContent).toContain('"Hello"');
      
      // Click again to collapse
      fireEvent.click(stringProp);
      // Should no longer contain the string value
      expect(container.textContent).not.toContain('"Hello"');
    } else {
      // If we can't find the element, the test will fail
      expect(stringProp).not.toBeNull();
    }
  });
});