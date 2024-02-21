import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
    dark: "dark",
    light : "light"
};

const themeConfigs = {
    custom: ({ mode }) => {
        const customPalette = mode === themeModes.dark ? {
            primary: {
                main: "#3dd2cc",
                contrastText: "#ffffff"
            },
            secondary: {
                main: "#37b3ae",
                contrastText: "#ffffff"
            },
            background: {
                default: "#000000",
                paper: "#131313"
            },
        } : {
            primary: {
                main: "#3dd2cc",
            },
            secondary: {
                main: "#37b3ae",
            },
            background: {
                default: colors.grey['100'],
            },
        };

        return createTheme({
            palette: {
                mode,
                ...customPalette,
            },
            components: {
                MuiButton: {
                    defaultProps: { disableElevation: true }
                }
            }
        });
    }
};

export default themeConfigs;