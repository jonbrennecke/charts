import { ellipsis } from './chartText';

describe('ellipsis', () => {
  it('adds an ellipsis after the given number of characters', () => {
    const renderedText = ellipsis('Lorem ipsum dolor sit amet', 5);
    expect(renderedText).toEqual('Lorem…');
  });

  it('does not add an ellipsis if the text is the same length as the limit', () => {
    const renderedText = ellipsis('Lorem', 5);
    expect(renderedText).toEqual('Lorem');
  });
});
