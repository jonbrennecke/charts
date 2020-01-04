import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { List } from './List';

import './List.stories.css';
import { useState } from '@storybook/addons';
import { Map } from 'immutable';

const listItems = Map({
  a: { label: 'Option #1' },
  b: {
    label: 'Option #2',
    items: Map({
      a: { label: 'Nested option #1' },
      b: {
        label: 'Nested option #2',
        items: Map({
          a: { label: 'Nested option #1' },
          b: { label: 'Nested option #2' },
          c: { label: 'Nested option #3' },
        }),
      },
      c: { label: 'Nested option #3' },
    }),
  },
  c: { label: 'Option #3' },
});

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('List', () => {
    const [selected, setSelected] = useState(['b', 'c']);
    return (
      <div className="listStoriesContainer">
        <List
          items={listItems}
          selected={selected}
          onSelectItem={setSelected}
        />
      </div>
    );
  });
