import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Map } from 'immutable';

import { Select } from './Select';
import { SelectOption } from './SelectOption';

import './Select.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Select', () => (
    <div className="selectStoryContainer">
      <Select
        placeholder="Lorem ipsum dolor sit amet"
        options={Map({
          a: { label: 'Option #1' },
          b: { label: 'Option #2' },
          c: { label: 'Option #3' },
        })}
      />
    </div>
  ));
