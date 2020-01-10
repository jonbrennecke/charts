import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Button, EButtonVariant, EButtonSize } from './Button';

import './Button.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Button', () => (
    <div className="buttonStoryContainer">
      <Button>Lorem ipsum solor sit amet</Button>
      <Button variant={EButtonVariant.primary}>
        Lorem ipsum solor sit amet
      </Button>
      <Button size={EButtonSize.small}>Lorem ipsum solor sit amet</Button>
      <Button size={EButtonSize.medium}>Lorem ipsum solor sit amet</Button>
      <Button size={EButtonSize.large}>Lorem ipsum solor sit amet</Button>
      <Button size={EButtonSize.small} variant={EButtonVariant.primary}>
        Lorem ipsum solor sit amet
      </Button>
      <Button size={EButtonSize.medium} variant={EButtonVariant.primary}>
        Lorem ipsum solor sit amet
      </Button>
      <Button size={EButtonSize.large} variant={EButtonVariant.primary}>
        Lorem ipsum solor sit amet
      </Button>
    </div>
  ));
