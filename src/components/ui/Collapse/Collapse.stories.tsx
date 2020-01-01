import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { useState } from '@storybook/addons';

import { Collapse } from './Collapse';

import './Collapse.stories.css';
import { Text } from '../../text';
import { InlineSelect } from '../InlineSelect';
import { Map } from 'immutable';

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Collapse', () => {
    const [collapsed, setCollapsed] = useState<boolean>(false);
    return (
      <div className="collapseStoryContainer">
        <Collapse
          heading="Lorem ipsum dolor sit amet"
          collapsed={collapsed}
          onClickHeader={() => setCollapsed(!collapsed)}
        >
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
            <InlineSelect
              placeholder="sed do eiusmod tempor"
              options={Map({
                a: { label: 'Option #1' },
                b: { label: 'Option #2' },
                c: { label: 'Option #3' },
              })}
            />
            Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Collapse>
      </div>
    );
  });
