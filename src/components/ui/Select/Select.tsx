import React, { useState } from 'react';
import { Map } from 'immutable';
import noop from 'lodash/noop';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text, Placeholder } from '../../text';
import { SelectOption } from './SelectOption';
import {
  SelectOptions,
  SelectCurrentSelection,
  SelectContainer,
} from './Select.styles';

export interface ISelectOption {
  label: string;
}

export interface ISelectProps<K = string> {
  colorTheme?: ColorTheme;
  placeholder?: string;
  selected?: K;
  options?: Map<K, ISelectOption>;
  onSelectOption?(key: string, option: ISelectOption): void;
}

export const Select = ({
  options = Map(),
  selected,
  placeholder = '',
  colorTheme = colorThemes.light,
  onSelectOption = noop,
}: ISelectProps) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <SelectContainer data-test="select">
      <SelectCurrentSelection
        data-test="select-current-selection"
        role="button"
        aria-expanded={!!selected}
        colorTheme={colorTheme}
        onClick={() => setShowMenu(!showMenu)}
      >
        {selected ? (
          <Text colorTheme={colorTheme}>{options.get(selected)!.label}</Text>
        ) : (
          <Placeholder colorTheme={colorTheme}>{placeholder}</Placeholder>
        )}
      </SelectCurrentSelection>
      <SelectOptions
        data-test="select-options"
        visible={showMenu}
        colorTheme={colorTheme}
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
    </SelectContainer>
  );
};
