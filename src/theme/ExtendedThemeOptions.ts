import { ThemeOptions, Palette, PaletteOptions, PaletteColorOptions, TypeBackground, Components, Theme, TypographyVariantsOptions, ComponentsProps, ComponentsOverrides, ComponentsVariants } from "@mui/material";
import { Typography, TypographyOptions } from "@mui/material/styles/createTypography";

export interface IExtendedThemeOptions extends ThemeOptions {
    palette?: IPaletteOptions;
    typography?: IExtendedTypographyOptions | ((palette: Palette) => IExtendedTypographyOptions);
    components: any;
}

export interface IPaletteOptions extends PaletteOptions {
    primary: PaletteColorOptions | IColorOption;
    secondary: PaletteColorOptions | IColorOption;
    background: Partial<IExtendedTypeBackground>;
}

export interface IColorOption {
    [key:number]: string;
}

export interface IExtendedTypographyOptions extends TypographyOptions {
    fontSizes: {
        xs?: string;
        sm?: string;
        md?: string;
        lg?: string;
        xlg?: string;
        xxlg?: string;
        link?: string;
    }
}

export interface IExtendedPalette extends Palette {
    background: TypeBackground & Partial<IExtendedTypeBackground>;
}

export interface IExtendedTypography extends Typography {
    fontSizes: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xlg: string;
        xxlg: string;
        link: string;
    }
}

export interface IExtendedTheme extends Theme {
    typography: IExtendedTypography;
    palette: IExtendedPalette;
}

export interface IExtendedTypeBackground extends TypeBackground {
    light: string;
    dark: string;
}
