import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Input } from './Input';
import { useState } from '@storybook/addons';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Input', () => {
    const [value, setValue] = useState('');
    return (
      <Input
        placeholder="Lorem ipsum"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    );
  });
