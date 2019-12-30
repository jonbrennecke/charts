import React, { useState } from 'react';
import { Map } from 'immutable';
import noop from 'lodash/noop';
import { ColorTheme, colorThemes } from '../../../theme';
import { Text } from '../../text';
import { SelectOption } from './SelectOption';
import { SelectOptions, SelectCurrentSelection } from './Select.styles';

export interface ISelectOption {
  label: string;
}

export interface ISelectProps {
  colorTheme?: ColorTheme;
  placeholder?: string;
  options?: Map<string, ISelectOption>;
  onSelectOption?(key: string, option: ISelectOption): void;
}

export const Select = ({
  options = Map(),
  placeholder = '',
  colorTheme = colorThemes.light,
  onSelectOption = noop,
}: ISelectProps) => {
  const [showMenu, setState] = useState(false);
  return (
    <div data-test="select">
      <SelectCurrentSelection
        data-test="select-current-selection"
        colorTheme={colorTheme}
        onClick={() => setState(!showMenu)}
      >
        <Text colorTheme={colorTheme}>{placeholder}</Text>
      </SelectCurrentSelection>
      <SelectOptions data-test="select-options" visible={showMenu} colorTheme={colorTheme}>
        {options
          .mapEntries(([key, option]) => [
            key,
            <SelectOption
              key={key}
              colorTheme={colorTheme}
              onClick={() => onSelectOption(key, option)}
            >
              {option.label}
            </SelectOption>,
          ])
          .valueSeq()
          .toArray()}
      </SelectOptions>
    </div>
  );
};
