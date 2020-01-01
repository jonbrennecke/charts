import styled from 'styled-components';

export const InlineSelectContainer = styled.div`
  position: relative;
  display: inline-block;
  margin: 0 0.28em;
`;

export interface IInlineSelectCurrentSelection {
  selected: boolean;
}

export const InlineSelectCurrentSelection = styled.div`
  cursor: pointer;
  transition: border-color 250ms ease-in-out;
  font-weight: ${(props: IInlineSelectCurrentSelection) =>
    props.selected ? 'bold' : ''};

  span {
    text-decoration: underline;
  }
`;
