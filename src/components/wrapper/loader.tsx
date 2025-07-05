import { CircularProgress } from "@mui/material";

const Loader = ({size=40}: { size?: number }) => {
    return <CircularProgress size={size} disableShrink variant={'indeterminate'}/>
}
export default Loader;