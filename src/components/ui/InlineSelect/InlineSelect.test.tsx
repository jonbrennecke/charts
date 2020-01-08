import React from 'react';
import { InlineSelect } from './InlineSelect';
import { shallow } from 'enzyme';
import { Map } from 'immutable';
import { dataTestAttr } from '../../../testUtils';

describe('InlineSelect', () => {
  it('works as expected with empty options map', () => {
    const component = shallow(<InlineSelect options={Map()} selected="test" />);
    expect(component.find(dataTestAttr('inline-select')).exists()).toBe(true);
  });
});
