import {createTheme} from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "#222831",
            paper: "#393E46"
        },
        text: {
            primary: "#EEEEEE",
            secondary: "#393E46",
        },
        primary: {
            main: "#00ADB5"
        },
        secondary: {
            main: "#EEEEEE"
        }
    },
    components: {
        MuiInputBase:{
            styleOverrides:{
                input:{
                    "::placeholder":{
                        color:"#00ADB5"
                    }
                }
            }
        }
    }
});

export default Theme;