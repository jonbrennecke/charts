import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Card } from './Card';
import { CardTitle } from './CardTitle';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Card', () => (
    <Card>
      <CardTitle>
        Lorem ipsum dolor sit amet
      </CardTitle>
    </Card>
  ));
