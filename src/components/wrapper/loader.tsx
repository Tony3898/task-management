import {CircularProgress} from "@mui/material";

const Loader = ({size}: { size: number }) => {
    return <CircularProgress size={size || 40} disableShrink variant={'indeterminate'}/>
}
export default Loader;