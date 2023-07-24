import { createTheme } from "@mui/material";
import { IExtendedThemeOptions, IExtendedTheme } from "./ExtendedThemeOptions";
import { leastSquaresFit } from "./theme.util";
import "@fontsource/dm-sans";

export const themeConfig: IExtendedThemeOptions = {
  spacing: (factor: number) =>
    ["0", "4px", "8px", "16px", "32px", "64px"][factor],
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme: IExtendedTheme) => ({
        html: {
          display: "flex",
          WebkitFontSmoothing: "auto",
          minHeight: "100%",
        },
        body: {
          overflowX: "hidden",
          overflowY: "auto !important",
          flexGrow: 1,
          minHeight: "100%",
          fontFamily: "MulishRegular, sans-serif",
          backgroundColor: `${theme.palette.background.light} !important`,
        },
        /* width */
        "*::-webkit-scrollbar": {
          width: 5,
        },
        /* Track */
        "*::-webkit-scrollbar-track": {
          boxShadow: "inset 0 0 5px grey",
          borderRadius: 15,
        },
        /* Handle */
        "*::-webkit-scrollbar-thumb": {
          background: `${theme.palette.primary.main}`,
          borderRadius: 10,
        },
        /* Handle on hover */
        "*::-webkit-scrollbar-thumb:hover": {
          background: `${theme.palette.primary.main}`,
        },
      }),
    },
  },
  palette: {
    // Brand Primary colors in 10% shades — dark to light
    primary: {
      main: "#353535",
      900: "#030303",
      800: "#353535",
      700: "#4f4f4f",
      600: "#686868",
      500: "#818181",
      400: "#9a9a9a",
      300: "#b3b3b3",
      200: "#cdcdcd",
      100: "#e6e6e6",
      light: "#e6e6e6",
      dark: "#000000",
      contrastText: "#fff",
    },
    // Brand Secondary colors in 10% shades — dark to light
    secondary: {
      main: "#5BBE88",
      900: "#2F4858",
      800: "#275F70",
      700: "#147782",
      600: "#0A8F8C",
      500: "#5BBE88",
      400: "#2F4858",
      300: "#D1FAE0",
      200: "#D9EDDF",
      100: "#EDFDF3",
      light: "#f1ecff",
      contrastText: "#fff",
    },
    error: {
      main: "#b00020",
      900: "#b00020",
      800: "#bf152c",
      700: "#cc1d33",
      600: "#de2839",
      500: "#ed323b",
      400: "#e84853",
      300: "#de6c74",
      200: "#ea959b",
      100: "#fbcad2",
      light: "#fdeaee",
      contrastText: "#fff",
    },
    success: {
      main: "#8AC99D",
      900: "#0e6410",
      800: "#298324",
      700: "#35942f",
      600: "#41a63a",
      500: "#4bb543",
      400: "#66c060",
      300: "#82cc7d",
      200: "#a6d9a3",
      100: "#c9e8c7",
      light: "#e8f6e8",
      contrastText: "#fff",
    },
    common: {
      black: "#000",
      white: "#fff",
    },
    background: {
      paper: "#fff",
      default: "#fafafa", // Used by css baseline to set body bg color
      light: "#F9FBFF",
    },
    text: {
      primary: "#313131",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "DM SANS, sans-serif, Roboto",
    h1: {
      fontSize: leastSquaresFit({ 0: 25, 480: 24, 960: 40 }),
      fontWeight: 600,
    },
    h2: {
      fontSize: leastSquaresFit({ 0: 20, 480: 26, 960: 36 }),
      fontWeight: 600,
    },
    h3: {
      fontSize: leastSquaresFit({ 0: 18, 480: 20, 960: 30 }),
      fontWeight: 600,
    },
    h4: {
      fontSize: leastSquaresFit({ 0: 16, 480: 18, 960: 24 }),
      fontWeight: 600,
    },
    h5: {
      fontSize: leastSquaresFit({ 0: 14, 480: 16, 960: 18 }),
      fontWeight: 600,
    },
    body1: {
      fontWeight: 500,
      fontSize: leastSquaresFit({ 0: 14, 480: 14, 960: 16 }),
    },
    body2: {
      fontWeight: 400,
      fontSize: leastSquaresFit({ 0: 12, 480: 12, 960: 14 }),
    },
    fontSizes: {
      xs: leastSquaresFit({ 0: 10, 480: 10, 960: 12 }),
      sm: leastSquaresFit({ 0: 12, 480: 12, 960: 14 }),
      md: leastSquaresFit({ 0: 14, 480: 14, 960: 16 }),
      lg: leastSquaresFit({ 0: 14, 480: 16, 960: 18 }),
      xlg: leastSquaresFit({ 0: 16, 480: 18, 960: 20 }),
      xxlg: leastSquaresFit({ 0: 20, 480: 24, 960: 30 }),
      link: leastSquaresFit({ 0: 12, 480: 12, 960: 12 }),
    },
  },
};

export default createTheme({
  palette: themeConfig.palette,
  typography: themeConfig.typography,
  spacing: themeConfig.spacing,
  breakpoints: themeConfig.breakpoints,
  components: themeConfig.components,
}) as IExtendedTheme;
