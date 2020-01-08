import React, { useState } from 'react';
import { Map } from 'immutable';
import noop from 'lodash/noop';
import { colorThemes } from '../../../theme';
import { Text, Placeholder } from '../../text';
import { SelectOption, ISelectProps, SelectOptions } from '../Select';
import {
  InlineSelectCurrentSelection,
  InlineSelectContainer,
} from './InlineSelect.styles';

export const InlineSelect = ({
  options = Map(),
  selected,
  placeholder = '',
  colorTheme = colorThemes.light,
  onSelectOption = noop,
}: ISelectProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <InlineSelectContainer data-test="inline-select">
      <InlineSelectCurrentSelection
        data-test="inline-select-current-selection"
        role="button"
        aria-expanded={!!selected}
        selected={!!selected}
        onClick={() => setShowMenu(!showMenu)}
      >
        {selected ? (
          <Text colorTheme={colorTheme}>
            {options.get(selected) ? options.get(selected)!.label : ''}
          </Text>
        ) : (
          <Placeholder colorTheme={colorTheme}>{placeholder}</Placeholder>
        )}
      </InlineSelectCurrentSelection>
      <SelectOptions
        data-test="inline-select-options"
        visible={showMenu}
        colorTheme={colorTheme}
        style={{ width: 'auto' }}
      >
        {options
          .mapEntries(([key, option]) => [
            key,
            <SelectOption
              key={key}
              colorTheme={colorTheme}
              selected={key === selected}
              onClick={() => {
                onSelectOption(key, option);
                setShowMenu(false);
              }}
            >
              {option.label}
            </SelectOption>,
          ])
          .valueSeq()
          .toArray()}
      </SelectOptions>
    </InlineSelectContainer>
  );
};
