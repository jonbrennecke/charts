import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { useState } from '@storybook/addons';
import { Map } from 'immutable';

import { Text } from '../../';
import { InlineSelect } from './InlineSelect';

import './InlineSelect.stories.css';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('InlineSelect', () => {
    const [selected, setSelected] = useState<string | undefined>(undefined);
    return (
      <div className="selectStoryContainer">
        <Text>
          Lorem ipsum dolor sit amet
          <InlineSelect
            placeholder="sed do eiusmod tempor"
            selected={selected}
            options={Map({
              a: { label: 'Option #1' },
              b: { label: 'Option #2' },
              c: { label: 'Option #3' },
            })}
            onSelectOption={option => setSelected(option)}
          />
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
        </Text>
      </div>
    );
  });
