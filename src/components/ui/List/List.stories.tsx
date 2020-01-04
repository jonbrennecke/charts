import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import times from 'lodash/times';
import { List } from './List';
import { ListItem } from './ListItem';

import './List.stories.css';
import { useState } from '@storybook/addons';

const listItems = times(100);

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('List', () => {
    const [selectedIndex, setSelectedIndex] = useState(3);
    return (
      <div className="listStoriesContainer">
        <List>
          {listItems.map(i => (
            <ListItem
              key={i}
              selected={i === selectedIndex}
              onClick={() => setSelectedIndex(i)}
            >
              Lorem ipsum
            </ListItem>
          ))}
        </List>
      </div>
    );
  });
