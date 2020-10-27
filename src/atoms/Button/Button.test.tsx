import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Button from './';

describe('Button', () => {
  test('renders Button component', () => {
    const props = {
      children: 'Click me!',
      onClick: () => {},
      color: 'default',
      variant: 'primary',
      size: 'small',
    };
    render(<Button {...props} />);

    const buttonEle = screen.getByRole('button');
    buttonEle.click();
  });
});
