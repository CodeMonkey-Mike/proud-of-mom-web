import React from 'react';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Logo from './Logo';

describe('Logo', () => {
  test('renders Logo component', () => {
    const props = {
      imageUrl: 'http://test.com/image.png',
      alt: 'test alt',
    };
    render(<Logo {...props} />);

    const imgElement = screen.getByRole('img');
    expect(imgElement).toHaveAttribute('src', props.imageUrl);
    expect(imgElement).toHaveAttribute('alt', props.alt);
  });
});
