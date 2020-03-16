import styled from 'styled-components';
import { unit } from '../../../constants';

export const Color = styled.div<{ color: string }>`
  min-height: ${unit * 2}px;
  min-width: ${unit * 2}px;
  border-radius: ${unit}px;
  background-color: ${props => props.color};
  margin-right: ${unit * 0.5}px;
`;
