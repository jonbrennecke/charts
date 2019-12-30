import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Select } from './Select';
import { SelectOption } from './SelectOption';

import './Select.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Select', () => (
    <div className="selectStoryContainer">
      <Select placeholder="Lorem ipsum dolor sit amet">
        <SelectOption>Option #1</SelectOption>
        <SelectOption>Option #2</SelectOption>
        <SelectOption>Option #3</SelectOption>
      </Select>
    </div>
  ));
