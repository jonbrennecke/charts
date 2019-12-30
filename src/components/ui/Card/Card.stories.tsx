import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { CardBorder } from './CardBorder';
import { CardTitle } from './CardTitle';
import { CardHeader } from './CardHeader';
import { CardContent } from './CardContent';

import './Card.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Card', () => (
    <div className="cardStoryContainer">
      <CardBorder>
        <CardHeader>
          <CardTitle>Lorem ipsum dolor sit amet</CardTitle>
        </CardHeader>
        <CardContent />
      </CardBorder>
    </div>
  ));
