import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import styled from 'styled-components';
import { Heading } from './Heading';
import { unit } from '../../../constants';

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: ${unit}px;
`;

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .add('Heading', () => (
    <Container>
      <Heading variant="h1">Lorem ipsum dolor sit amet</Heading>
      <Heading variant="h2">Lorem ipsum dolor sit amet</Heading>
      <Heading variant="h3">Lorem ipsum dolor sit amet</Heading>
      <Heading variant="h4">Lorem ipsum dolor sit amet</Heading>
      <Heading variant="h5">Lorem ipsum dolor sit amet</Heading>
      <Heading variant="h6">Lorem ipsum dolor sit amet</Heading>
    </Container>
  ));
