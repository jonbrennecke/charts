export type HexColor = string;

export interface ColorTheme {
  components: {
    chart: {
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
      color: HexColor;
    };
    select: {
      border: {
        color: HexColor;
        hoverColor: HexColor;
      };
      option: {
        hoverBackgroundColor: HexColor;
      };
    };
  };
}
