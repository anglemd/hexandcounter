// SEE:  https://www.rapidtables.com/web/color/RGB_Color.html

import { ColorEnum } from 'src/app/enums/rendering/color.enum';
import { Util } from '../utility/util.class';

export class CanvasColor {
  static getEnumFromString(color: string | undefined) {
    if (!color) return ColorEnum.UNKNOWN;
    return ColorEnum[color as keyof typeof ColorEnum];
  }

  static setStrokeStyle(
    ctx: CanvasRenderingContext2D,
    color: ColorEnum,
    transparency?: number
  ) {
    if (Util.isNullOrUndefined(transparency)) transparency = 1.0;
    if (!transparency) transparency = 0;
    ctx.strokeStyle = CanvasColor.getRGBA(color, transparency);
  }

  static setFillStyle(
    ctx: CanvasRenderingContext2D,
    color: ColorEnum,
    transparency?: number
  ) {
    if (Util.isNullOrUndefined(transparency)) transparency = 1.0;
    if (!transparency) transparency = 0;
    ctx.fillStyle = CanvasColor.getRGBA(color, transparency);
  }

  static getRGB(colEnum: ColorEnum): string {
    let colStr = '';
    let arr = CanvasColor.getRGBArray(colEnum);
    colStr = 'rgb(' + arr.toString() + ')';
    return colStr;
  }

  static getRGBA(colEnum: ColorEnum, opacityVal: number): string {
    let colStr = '';
    let arr = CanvasColor.getRGBArray(colEnum);
    arr.push(opacityVal);
    colStr = 'rgba(' + arr.toString() + ')';
    return colStr;
  }

  static getRGBArray(color: ColorEnum): number[] {
    let colArr = [0, 0, 0];
    switch (color) {
      case ColorEnum.UNKNOWN: {
        return [0, 0, 0];
      }
      case ColorEnum.BLACK: {
        return [0, 0, 0];
      }
      case ColorEnum.MAROON: {
        return [128, 0, 0];
      }
      case ColorEnum.DARK_RED: {
        return [139, 0, 0];
      }
      case ColorEnum.BROWN: {
        return [165, 42, 42];
      }
      case ColorEnum.FIREBRICK: {
        return [178, 34, 34];
      }
      case ColorEnum.CRIMSON: {
        return [220, 20, 60];
      }
      case ColorEnum.RED: {
        return [255, 0, 0];
      }
      case ColorEnum.TOMATO: {
        return [255, 99, 71];
      }
      case ColorEnum.CORAL: {
        return [255, 127, 80];
      } // coral	#FF7F50	(255,127,80)
      case ColorEnum.INDIAN_RED: {
        return [205, 92, 92];
      } // indian red	#CD5C5C	(205,92,92)
      case ColorEnum.LIGHT_CORAL: {
        return [240, 128, 128];
      } // light coral	{return [240,128,128]; }
      case ColorEnum.DARK_SALMON: {
        return [233, 150, 122];
      } // dark salmon	{return [233,150,122]; }
      case ColorEnum.SALMON: {
        return [233, 150, 122];
      } // salmon	{return [250,128,114]; }
      case ColorEnum.LIGHT_SALMON: {
        return [255, 160, 122];
      } // light salmon	{return [255,160,122]; }
      case ColorEnum.ORANGE_RED: {
        return [255, 69, 0];
      } // orange red	{return [255,69,0]; }
      case ColorEnum.DARK_ORANGE: {
        return [255, 140, 0];
      } // dark orange	{return [255,140,0]; }
      case ColorEnum.ORANGE: {
        return [255, 165, 0];
      } //orange	{return [255,165,0]; }
      case ColorEnum.GOLD: {
        return [255, 215, 0];
      } // gold	{return [255,215,0]; }
      case ColorEnum.DARK_GOLDEN_ROD: {
        return [184, 134, 11];
      } // dark golden rod	{return [184,134,11]; }
      case ColorEnum.GOLDEN_ROD: {
        return [218, 165, 32];
      } // golden rod	{return [218,165,32]; }
      case ColorEnum.PALE_GOLDEN_ROD: {
        return [238, 232, 170];
      } // pale golden rod	{return [238,232,170]; }
      case ColorEnum.DARK_KHAKI: {
        return [189, 183, 107];
      } // dark khaki	{return [189,183,107]; }
      case ColorEnum.KHAKI: {
        return [240, 230, 140];
      } // khaki	{return [240,230,140]; }
      case ColorEnum.OLIVE: {
        return [128, 128, 0];
      } // olive	{return [128,128,0]; }
      case ColorEnum.YELLOW: {
        return [255, 255, 0];
      } // yellow	{return [255,255,0]; }
      case ColorEnum.YELLOW_GREEN: {
        return [154, 205, 50];
      }
      case ColorEnum.DARK_OLIVE_GREEN: {
        return [85, 107, 47];
      }
      case ColorEnum.OLIVE_DRAB: {
        return [107, 142, 35];
      }
      case ColorEnum.LAWN_GREEN: {
        return [124, 252, 0];
      }
      case ColorEnum.CHART_REUSE: {
        return [127, 255, 0];
      }
      case ColorEnum.GREEN_YELLOW: {
        return [173, 255, 47];
      }
      case ColorEnum.DARK_GREEN: {
        return [0, 100, 0];
      }
      case ColorEnum.GREEN: {
        return [0, 128, 0];
      }
      case ColorEnum.FOREST_GREEN: {
        return [34, 139, 34];
      }
      case ColorEnum.LIME: {
        return [0, 255, 0];
      }
      case ColorEnum.LIME_GREEN: {
        return [50, 205, 50];
      }
      case ColorEnum.LIGHT_GREEN: {
        return [144, 238, 144];
      }
      case ColorEnum.PALE_GREEN: {
        return [152, 251, 152];
      }
      case ColorEnum.DARK_SEA_GREEN: {
        return [143, 188, 143];
      }
      case ColorEnum.MEDIUM_SPRING_GREEN: {
        return [0, 250, 154];
      }
      case ColorEnum.SPRING_GREEN: {
        return [0, 255, 127];
      }
      case ColorEnum.SEA_GREEN: /*  sea green	*/ {
        return [46, 139, 87];
      }
      case ColorEnum.MEDIUM_AQUA_MARINE: /*  medium aqua marine	*/ {
        return [102, 205, 170];
      }
      case ColorEnum.MEDIUM_SEA_GREEN: /*  medium sea green	*/ {
        return [60, 179, 113];
      }
      case ColorEnum.LIGHT_SEA_GREEN: /*  light sea green	*/ {
        return [32, 178, 170];
      }
      case ColorEnum.DARK_SLATE_GRAY: /*  dark slate gray	*/ {
        return [47, 79, 79];
      }
      case ColorEnum.TEAL: /*  teal	*/ {
        return [0, 128, 128];
      }
      case ColorEnum.DARK_CYAN: /*  dark cyan	*/ {
        return [0, 139, 139];
      }
      case ColorEnum.AQUA: /*  aqua	*/ {
        return [0, 255, 255];
      }
      case ColorEnum.CYAN: /*  cyan	*/ {
        return [0, 255, 255];
      }
      case ColorEnum.LIGHT_CYAN: /*  light cyan	*/ {
        return [224, 255, 255];
      }
      case ColorEnum.DARK_TURQUOISE: /*  dark turquoise	*/ {
        return [0, 206, 209];
      }
      case ColorEnum.TURQUOISE: /*  turquoise	*/ {
        return [64, 224, 208];
      }
      case ColorEnum.MEDIUM_TURQUOISE: /*  medium turquoise	*/ {
        return [72, 209, 204];
      }
      case ColorEnum.PALE_TURQUOISE: /*  pale turquoise	*/ {
        return [175, 238, 238];
      }
      case ColorEnum.AQUA_MARINE: /*  aqua marine	*/ {
        return [127, 255, 212];
      }
      case ColorEnum.POWDER_BLUE: /*  powder blue	*/ {
        return [176, 224, 230];
      }
      case ColorEnum.CADET_BLUE: /*  cadet blue	*/ {
        return [95, 158, 160];
      }
      case ColorEnum.STEEL_BLUE: /*  steel blue	*/ {
        return [70, 130, 180];
      }
      case ColorEnum.CORN_FLOWER_BLUE: /*  corn flower blue	*/ {
        return [100, 149, 237];
      }
      case ColorEnum.DEEP_SKY_BLUE: /*  deep sky blue	*/ {
        return [0, 191, 255];
      }
      case ColorEnum.DODGER_BLUE: /*  dodger blue	*/ {
        return [30, 144, 255];
      }
      case ColorEnum.LIGHT_BLUE: /*  light blue	*/ {
        return [173, 216, 230];
      }
      case ColorEnum.SKY_BLUE: /*  sky blue	*/ {
        return [135, 206, 235];
      }
      case ColorEnum.LIGHT_SKY_BLUE: /*  light sky blue	*/ {
        return [135, 206, 250];
      }
      case ColorEnum.MIDNIGHT_BLUE: /*  midnight blue	*/ {
        return [25, 25, 112];
      }
      case ColorEnum.NAVY: /*  navy	*/ {
        return [0, 0, 128];
      }
      case ColorEnum.DARK_BLUE: /*  dark blue	*/ {
        return [0, 0, 139];
      }
      case ColorEnum.MEDIUM_BLUE: /*  medium blue	*/ {
        return [0, 0, 205];
      }
      case ColorEnum.BLUE: /*  blue	*/ {
        return [0, 0, 255];
      }
      case ColorEnum.ROYAL_BLUE: /*  royal blue	*/ {
        return [65, 105, 225];
      }
      case ColorEnum.BLUE_VIOLET: /*  blue violet	*/ {
        return [138, 43, 226];
      }
      case ColorEnum.INDIGO: /*  indigo	*/ {
        return [75, 0, 130];
      }
      case ColorEnum.DARK_SLATE_BLUE: /*  dark slate blue	*/ {
        return [72, 61, 139];
      }
      case ColorEnum.SLATE_BLUE: /*  slate blue	*/ {
        return [106, 90, 205];
      }
      case ColorEnum.MEDIUM_SLATE_BLUE: /*  medium slate blue	*/ {
        return [123, 104, 238];
      }
      case ColorEnum.MEDIUM_PURPLE: /*  medium purple	*/ {
        return [147, 112, 219];
      }
      case ColorEnum.DARK_MAGENTA: /*  dark magenta	*/ {
        return [139, 0, 139];
      }
      case ColorEnum.DARK_VIOLET: /*  dark violet	*/ {
        return [148, 0, 211];
      }
      case ColorEnum.DARK_ORCHID: /*  dark orchid	*/ {
        return [153, 50, 204];
      }
      case ColorEnum.MEDIUM_ORCHID: /*  medium orchid	*/ {
        return [186, 85, 211];
      }
      case ColorEnum.PURPLE: /*  purple	*/ {
        return [128, 0, 128];
      }
      case ColorEnum.THISTLE: /*  thistle	*/ {
        return [216, 191, 216];
      }
      case ColorEnum.PLUM: /*  plum	*/ {
        return [221, 160, 221];
      }
      case ColorEnum.VIOLET: /*  violet	*/ {
        return [238, 130, 238];
      }
      case ColorEnum.MAGENTA: /*  magenta / fuchsia	*/ {
        return [255, 0, 255];
      }
      case ColorEnum.ORCHID: /*  orchid	*/ {
        return [218, 112, 214];
      }
      case ColorEnum.MEDIUM_VIOLET_RED: /*  medium violet red	*/ {
        return [199, 21, 133];
      }
      case ColorEnum.PALE_VIOLET_RED: /*  pale violet red	*/ {
        return [219, 112, 147];
      }
      case ColorEnum.DEEP_PINK: /*  deep pink	*/ {
        return [255, 20, 147];
      }
      case ColorEnum.HOT_PINK: /*  hot pink	*/ {
        return [255, 105, 180];
      }
      case ColorEnum.LIGHT_PINK: /*  light pink	*/ {
        return [255, 182, 193];
      }
      case ColorEnum.PINK: /*  pink	*/ {
        return [255, 192, 203];
      }
      case ColorEnum.ANTIQUE_WHITE: /*  antique white	*/ {
        return [250, 235, 215];
      }
      case ColorEnum.LIGHT_SLATE_GRAY: /*  light slate gray	*/ {
        return [119, 136, 153];
      }
      case ColorEnum.HONEYDEW: /*  honeydew	*/ {
        return [240, 255, 240];
      }
      case ColorEnum.LIGHT_STEEL_BLUE: /*  light steel blue	*/ {
        return [176, 196, 222];
      }

      case ColorEnum.WHEAT: /*  wheat	*/ {
        return [245, 222, 179];
      }
      case ColorEnum.LIGHT_GRAY: /*  light gray / light grey	*/ {
        return [211, 211, 211];
      }
      case ColorEnum.DARK_GRAY: /*  dark gray / dark grey	*/ {
        return [169, 169, 169];
      }
      case ColorEnum.GRAY: /*  gray / grey	*/ {
        return [128, 128, 128];
      }
      case ColorEnum.SILVER: /*  silver	*/ {
        return [192, 192, 192];
      }
      case ColorEnum.WHITE: /*  white	*/ {
        return [255, 255, 255];
      }

      case ColorEnum.BEIGE: /*  beige	*/ {
        return [245, 245, 220];
      }
      // case ColorEnum.XXX: /*  bisque	*/ {return [255,228,196]; }
      // case ColorEnum.XXX: /*  blanched almond	*/ {return [255,235,205]; }

      // case ColorEnum.XXX: /*  corn silk	*/ {return [255,248,220]; }
      // case ColorEnum.XXX: /*  lemon chiffon	*/ {return [255,250,205]; }
      case ColorEnum.LIGHT_GOLDEN_ROD_YELLOW: /*  light golden rod yellow	*/ {
        return [250, 250, 210];
      }
      // case ColorEnum.XXX: /*  light yellow	*/ {return [255,255,224]; }
      // case ColorEnum.XXX: /*  saddle brown	*/ {return [139,69,19]; }
      // case ColorEnum.XXX: /*  sienna	*/ {return [160,82,45]; }
      // case ColorEnum.XXX: /*  chocolate	*/ {return [210,105,30]; }
      case ColorEnum.PERU: /*  peru	*/ {
        return [205, 133, 63];
      }
      // case ColorEnum.XXX: /*  sandy brown	*/ {return [244,164,96]; }
      // case ColorEnum.XXX: /*  burly wood	*/ {return [222,184,135]; }
      case ColorEnum.TAN: /*  tan	*/ {
        return [210, 180, 140];
      }
      // case ColorEnum.XXX: /*  rosy brown	*/ {return [188,143,143]; }
      // case ColorEnum.XXX: /*  moccasin	*/ {return [255,228,181]; }
      // case ColorEnum.XXX: /*  navajo white	*/ {return [255,222,173]; }
      // case ColorEnum.XXX: /*  peach puff	*/ {return [255,218,185]; }
      // case ColorEnum.XXX: /*  misty rose	*/ {return [255,228,225]; }
      // case ColorEnum.XXX: /*  lavender blush	*/ {return [255,240,245]; }
      // case ColorEnum.XXX: /*  linen	*/ {return [250,240,230]; }
      // case ColorEnum.XXX: /*  old lace	*/ {return [253,245,230]; }
      // case ColorEnum.XXX: /*  papaya whip	*/ {return [255,239,213]; }
      // case ColorEnum.XXX: /*  sea shell	*/ {return [255,245,238]; }
      // case ColorEnum.XXX: /*  mint cream	*/ {return [245,255,250]; }
      // case ColorEnum.XXX: /*  slate gray	*/ {return [112,128,144]; }
      // case ColorEnum.XXX: /*  light slate gray	*/ {return [119,136,153]; }
      // case ColorEnum.XXX: /*  light steel blue	*/ {return [176,196,222]; }
      // case ColorEnum.XXX: /*  lavender	*/ {return [230,230,250]; }
      // case ColorEnum.XXX: /*  floral white	*/ {return [255,250,240]; }
      // case ColorEnum.XXX: /*  alice blue	*/ {return [240,248,255]; }
      // case ColorEnum.XXX: /*  ghost white	*/ {return [248,248,255]; }

      // case ColorEnum.XXX: /*  ivory	*/ {return [255,255,240]; }
      // case ColorEnum.XXX: /*  azure	*/ {return [240,255,255]; }
      // case ColorEnum.XXX: /*  snow	*/ {return [255,250,250]; }
      case ColorEnum.DIM_GRAY: /*  dim gray / dim grey	*/ {
        return [105, 105, 105];
      }

      // case ColorEnum.XXX: /*  gainsboro	*/ {return [220,220,220]; }
      case ColorEnum.WHITE_SMOKE: /*  white smoke	*/ {
        return [245, 245, 245];
      }
      case ColorEnum.RUSSIAN_ORANGE: {
        return [205, 153, 73];
      }
      case ColorEnum.GERMAN_GRAY: {
        return [197, 193, 176];
      }
      case ColorEnum.CLEAR_TERAIN: {
        return [219, 219, 187];
      }
    }
    return colArr;
  }
}
