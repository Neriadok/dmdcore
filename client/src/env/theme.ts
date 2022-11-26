import {createTheme, ThemeOptions} from "@mui/material";

export const themeOptions: ThemeOptions = {
    palette: {
        primary: {main: "#44ebeb"},
        secondary: {main: "#ebeb44"},
        error: {main: "#eb4444"},
        warning: {main: "#eb9844"},
        info: {main: "#4498eb"},
        success: {main: "#44eb98"}
    }
};

export const theme = createTheme(themeOptions)

