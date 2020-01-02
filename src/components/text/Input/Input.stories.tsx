import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Input } from './Input';

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Input', () => <Input placeholder="Lorem ipsum" />);
