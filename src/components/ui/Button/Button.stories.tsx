import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button } from './Button';

import './Button.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <div className="buttonStoryContainer">
      <Button>Lorem ipsum solor sit amet</Button>
    </div>
  ));
