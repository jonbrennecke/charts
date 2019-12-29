import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Card } from './Card';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Card', () => <Card />);
