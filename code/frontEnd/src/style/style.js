import {createMuiTheme} from "@material-ui/core/styles/index";

export const theme2=createMuiTheme({
    palette: {
        primary: {
            light: '#d0e7b7',
            main: '#c5e1a5',
            dark: '#899d73',
            contrastText: '#424242',
        },
        secondary: {
            light: '#ffefc2',
            main: '#ffecb3',
            dark: '#b2a57d',
            contrastText: '#424242',
        },

    },
    typography: {
        // Tell Material-UI what the font-size on the html element is.
        fontSize: 22,
        /*fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),*/
        fontFamily:'Helvetica'
    },
    }


);

export const primaryColor = '#c5e1a5';
export const primaryDarkColor = '#899d73';
export const primaryLightColor =  '#d0e7b7';
export const secondaryColor = '#ffecb3';
export const secondaryLightColor =  '#ffefc2';
export const fontColor = '#424242';

