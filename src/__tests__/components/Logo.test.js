import React from 'react';
import { render } from '@testing-library/react';
import Logo from '../../components/Logo';

describe('Logo Component', () => {
  test('renders logo SVG', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  test('renders with default size', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '80');
    expect(svg).toHaveAttribute('height', '80');
  });

  test('renders with custom size', () => {
    const { container } = render(<Logo size={100} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  test('has aria-label for accessibility', () => {
    const { container } = render(<Logo />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', 'Security Logo');
  });

  test('contains gradient definitions', () => {
    const { container } = render(<Logo />);
    const gradient = container.querySelector('#shieldGradient');
    expect(gradient).toBeInTheDocument();
  });
});
