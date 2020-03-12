import styled from 'styled-components';
import { unit } from '../../../constants';

export const Color = styled.div<{ color: string }>`
  height: ${unit * 2}px;
  width: ${unit * 2}px;
  border-radius: 50%;
  border: 2px solid ${props => props.color};
  margin-right: ${unit * 0.5}px;
`;
