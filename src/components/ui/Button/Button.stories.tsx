import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button, EButtonVariant } from './Button';

import './Button.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <div className="buttonStoryContainer">
      <Button>Lorem ipsum solor sit amet</Button>
      <Button variant={EButtonVariant.primary}>
        Lorem ipsum solor sit amet
      </Button>
      <Button>Lorem ipsum solor sit amet</Button>
      <Button>Lorem ipsum solor sit amet</Button>
    </div>
  ));
