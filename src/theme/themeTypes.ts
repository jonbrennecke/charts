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
    form: {
      field: {
        shadowColor: HexColor;
        borderColor: HexColor;
      };
    };
    button: {
      base: {
        borderColor: HexColor;
        shadowColor: HexColor;
      };
      hover: {
        borderColor: HexColor;
        shadowColor: HexColor;
      };
    };
  };
}
