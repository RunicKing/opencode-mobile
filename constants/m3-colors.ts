type RGB = readonly [number, number, number];

export type Md3ColorRoles = {
  primary: string;
  primaryContainer: string;
  secondary: string;
  secondaryContainer: string;
  tertiary: string;
  tertiaryContainer: string;
  surface: string;
  surfaceVariant: string;
  surfaceDisabled: string;
  background: string;
  error: string;
  errorContainer: string;
  onPrimary: string;
  onPrimaryContainer: string;
  onSecondary: string;
  onSecondaryContainer: string;
  onTertiary: string;
  onTertiaryContainer: string;
  onSurface: string;
  onSurfaceVariant: string;
  onSurfaceDisabled: string;
  onError: string;
  onErrorContainer: string;
  onBackground: string;
  outline: string;
  outlineVariant: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
  shadow: string;
  scrim: string;
  backdrop: string;
  elevation: { level0: string; level1: string; level2: string; level3: string; level4: string; level5: string };
};

export const STOCK_MD3_ROLES_LIGHT: Md3ColorRoles = {
  primary: '#6750A4',
  primaryContainer: '#EADDFF',
  secondary: '#625B71',
  secondaryContainer: '#E8DEF8',
  tertiary: '#7D5260',
  tertiaryContainer: '#FFD8E4',
  surface: '#FEF7FF',
  surfaceVariant: '#E7E0EC',
  surfaceDisabled: 'rgba(29, 27, 32, 0.12)',
  background: '#FEF7FF',
  error: '#B3261E',
  errorContainer: '#F9DEDC',
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005D',
  onSecondary: '#FFFFFF',
  onSecondaryContainer: '#1D192B',
  onTertiary: '#FFFFFF',
  onTertiaryContainer: '#31111D',
  onSurface: '#1D1B20',
  onSurfaceVariant: '#49454F',
  onSurfaceDisabled: 'rgba(29, 27, 32, 0.38)',
  onError: '#FFFFFF',
  onErrorContainer: '#410E0B',
  onBackground: '#1D1B20',
  outline: '#79747E',
  outlineVariant: '#CAC4D0',
  inverseSurface: '#322F35',
  inverseOnSurface: '#F5EFF7',
  inversePrimary: '#D0BCFF',
  shadow: '#000000',
  scrim: '#000000',
  backdrop: 'rgba(50, 47, 53, 0.4)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(247, 243, 249)',
    level2: 'rgb(243, 237, 246)',
    level3: 'rgb(238, 232, 244)',
    level4: 'rgb(236, 230, 243)',
    level5: 'rgb(233, 227, 241)',
  },
};

export const STOCK_MD3_ROLES_DARK: Md3ColorRoles = {
  primary: '#D0BCFF',
  primaryContainer: '#4F378B',
  secondary: '#CCC2DC',
  secondaryContainer: '#4A4458',
  tertiary: '#EFB8C8',
  tertiaryContainer: '#633B48',
  surface: '#141218',
  surfaceVariant: '#49454F',
  surfaceDisabled: 'rgba(230, 224, 233, 0.12)',
  background: '#141218',
  error: '#F2B8B5',
  errorContainer: '#8C1D18',
  onPrimary: '#381E72',
  onPrimaryContainer: '#EADDFF',
  onSecondary: '#332D41',
  onSecondaryContainer: '#E8DEF8',
  onTertiary: '#492532',
  onTertiaryContainer: '#FFD8E4',
  onSurface: '#E6E0E9',
  onSurfaceVariant: '#CAC4D0',
  onSurfaceDisabled: 'rgba(230, 224, 233, 0.38)',
  onError: '#601410',
  onErrorContainer: '#F9DEDC',
  onBackground: '#E6E0E9',
  outline: '#938F99',
  outlineVariant: '#49454F',
  inverseSurface: '#E6E0E9',
  inverseOnSurface: '#322F35',
  inversePrimary: '#6750A4',
  shadow: '#000000',
  scrim: '#000000',
  backdrop: 'rgba(50, 47, 53, 0.4)',
  elevation: {
    level0: 'transparent',
    level1: 'rgb(37, 35, 42)',
    level2: 'rgb(44, 40, 49)',
    level3: 'rgb(49, 44, 56)',
    level4: 'rgb(51, 46, 58)',
    level5: 'rgb(52, 49, 63)',
  },
};

type HexString = string;

export function hexToRgb(hex: HexString): RGB {
  const normalized = hex.replace('#', '');
  const expanded = normalized.length === 3 ? normalized.split('').map((channel) => channel + channel).join('') : normalized;
  return [parseInt(expanded.slice(0, 2), 16), parseInt(expanded.slice(2, 4), 16), parseInt(expanded.slice(4, 6), 16)];
}

export function rgbToHex([r, g, b]: RGB) {
  const toChannel = (channel: number) => Math.round(channel).toString(16).padStart(2, '0');
  return `#${toChannel(r)}${toChannel(g)}${toChannel(b)}`;
}

export function mixHex(a: HexString, b: HexString, weight: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  return rgbToHex([ar + (br - ar) * weight, ag + (bg - ag) * weight, ab + (bb - ab) * weight]);
}

type Hsl = { hue: number; saturation: number; lightness: number };

function toHsl(hex: HexString): Hsl {
  const [r, g, b] = hexToRgb(hex).map((channel) => channel / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;
  if (delta === 0) {
    return { hue: 0, saturation: 0, lightness };
  }

  const saturation = lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let hue: number;
  if (max === r) {
    hue = ((g - b) / delta + (g < b ? 6 : 0)) * 60;
  } else if (max === g) {
    hue = ((b - r) / delta + 2) * 60;
  } else {
    hue = ((r - g) / delta + 4) * 60;
  }

  return { hue: Math.round(hue), saturation, lightness };
}

export function hueOf(hex: HexString) {
  return toHsl(hex).hue;
}

export function saturationOf(hex: HexString) {
  return toHsl(hex).saturation;
}

export function hslToHex(hue: number, saturation: number, lightness: number) {
  const h = (((hue % 360) + 360) % 360) / 360;
  const s = Math.min(1, Math.max(0, saturation));
  const l = Math.min(1, Math.max(0, lightness));
  const convert = (p: number, q: number, t: number) => {
    let channel = t;
    if (channel < 0) {
      channel += 1;
    }
    if (channel > 1) {
      channel -= 1;
    }
    if (channel < 1 / 6) {
      return p + (q - p) * 6 * channel;
    }
    if (channel < 1 / 2) {
      return q;
    }
    if (channel < 2 / 3) {
      return p + (q - p) * (2 / 3 - channel) * 6;
    }
    return p;
  };

  let r: number;
  let g: number;
  let b: number;
  if (s === 0) {
    r = l;
    g = l;
    b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = convert(p, q, h + 1 / 3);
    g = convert(p, q, h);
    b = convert(p, q, h - 1 / 3);
  }

  return rgbToHex([r * 255, g * 255, b * 255]);
}

export type TertiaryAndInverseRoles = {
  tertiary: string;
  onTertiary: string;
  tertiaryContainer: string;
  onTertiaryContainer: string;
  inverseSurface: string;
  inverseOnSurface: string;
  inversePrimary: string;
};

export function deriveTertiaryAndInverseRoles(colorScheme: 'light' | 'dark', tint: HexString): TertiaryAndInverseRoles {
  const tintHue = hueOf(tint);
  const tintSaturation = saturationOf(tint);
  const tertiaryHue = tintHue + 300;
  const saturation = Math.min(0.72, Math.max(0.28, (tintSaturation + 0.5) / 2));

  if (colorScheme === 'dark') {
    return {
      tertiary: hslToHex(tertiaryHue, saturation, 0.84),
      onTertiary: hslToHex(tertiaryHue, saturation, 0.18),
      tertiaryContainer: hslToHex(tertiaryHue, saturation, 0.3),
      onTertiaryContainer: hslToHex(tertiaryHue, saturation * 0.94, 0.9),
      inverseSurface: hslToHex(tintHue, 0.05, 0.92),
      inverseOnSurface: hslToHex(tintHue, 0.05, 0.2),
      inversePrimary: mixHex(tint, '#FFFFFF', 0.42),
    };
  }

  return {
    tertiary: hslToHex(tertiaryHue, saturation, 0.45),
    onTertiary: '#FFFFFF',
    tertiaryContainer: hslToHex(tertiaryHue, saturation, 0.9),
    onTertiaryContainer: hslToHex(tertiaryHue, saturation, 0.14),
    inverseSurface: hslToHex(tintHue, 0.05, 0.21),
    inverseOnSurface: hslToHex(tintHue, 0.05, 0.94),
    inversePrimary: mixHex(tint, '#FFFFFF', 0.78),
  };
}