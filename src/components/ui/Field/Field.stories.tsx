import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Field } from './Field';
import { Input } from '../../text';

import './Field.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Field', () => (
    <div className="fieldStoryContainer">
      <Field>
        <Input placeholder="Lorem ipsum dolor sit amet" />
      </Field>
    </div>
  ));
