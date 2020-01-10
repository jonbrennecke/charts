import { withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { Button, EButtonSize, EButtonVariant } from '../Button';
import './Card.stories.css';
import { CardBorder } from './CardBorder';
import { CardContent } from './CardContent';
import { CardHeader } from './CardHeader';
import { CardTitle } from './CardTitle';

const Header = styled(CardHeader)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

storiesOf('UI', module)
  .addDecorator(withKnobs)
  .add('Card', () => (
    <div className="cardStoryContainer">
      <CardBorder>
        <Header>
          <CardTitle>Lorem ipsum dolor sit amet</CardTitle>
          <Button variant={EButtonVariant.primary} size={EButtonSize.small}>
            Button
          </Button>
        </Header>
        <CardContent />
      </CardBorder>
    </div>
  ));
