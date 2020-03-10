import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Map } from 'immutable';

import { Select } from './Select';

import './Select.stories.css';
import { useState } from '@storybook/addons';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Select', () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
      <div className="selectStoryContainer">
        <Select
          placeholder="Lorem ipsum dolor sit amet"
          selected={selected}
          options={Map({
            a: { label: 'Option #1' },
            b: { label: 'Option #2' },
            c: { label: 'Option #3' },
          })}
          onSelectOption={option => setSelected(option)}
        />
      </div>
    );
  });
