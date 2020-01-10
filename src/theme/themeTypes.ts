import { EButtonVariant } from '../components';

export type HexColor = string;

export interface ColorTheme {
  components: {
    chart: {
      // TODO: { [key in EChartType] }
      pie: {
        slice: {
          stroke: HexColor;
        };
      };
      axis: {
        tick: {
          color: HexColor;
        };
        line: {
          stroke: HexColor;
        };
        gridline: {
          stroke: HexColor;
        };
      };
    };
    card: {
      border: {
        borderColor: HexColor;
        shadowColor: HexColor;
      };
      header: {
        border: {
          color: HexColor;
        };
        shadow: {
          color: HexColor;
        };
      };
    };
    text: {
      base: {
        color: HexColor;
      };
      placeholder: {
        color: HexColor;
      };
      link: {
        color: HexColor;
        activeColor: HexColor;
        hoverColor: HexColor;
      };
      input: {
        placeholderColor: HexColor;
        color: HexColor;
      };
    };
    select: {
      border: {
        color: HexColor;
        hoverColor: HexColor;
      };
      options: {
        backgroundColor: HexColor;
      };
      option: {
        hoverBackgroundColor: HexColor;
      };
    };
    list: {
      item: {
        hoverColor: HexColor;
        selectedBackgroundColor: HexColor;
        selectedColor: HexColor;
      };
    };
    form: {
      field: {
        shadowColor: HexColor;
        borderColor: HexColor;
      };
    };
    button: {
      base: {
        primaryText: HexColor;
        shadow: HexColor;
        backgroundColor: { [key in EButtonVariant]: HexColor };
        color: { [key in EButtonVariant]: HexColor };
      };
      hover: {
        shadow: HexColor;
        backgroundColor: { [key in EButtonVariant]: HexColor };
        border: { [key in EButtonVariant]: HexColor };
        color: { [key in EButtonVariant]: HexColor };
      };
      active: {
        backgroundColor: { [key in EButtonVariant]: HexColor };
        border: { [key in EButtonVariant]: HexColor };
        color: { [key in EButtonVariant]: HexColor };
        borderShadow: { [key in EButtonVariant]: HexColor };
      };
    };
  };
}
