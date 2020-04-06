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
  };
}
