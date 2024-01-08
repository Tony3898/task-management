import {Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import Loader from "./loader.tsx";
import {DialogPropsInterface} from "../../interfaces/WrapperDialogsInterface.ts";


const Dialogs = ({
                     children,
                     open,
                     onClose,
                     onSubmit,
                     title,
                     submitButtonTitle = "Submit",
                     loading = false
                 }: DialogPropsInterface) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

    return <Dialog open={open} onClose={onClose} fullScreen={fullScreen}>
        <DialogTitle color='primary'>{title}</DialogTitle>
        <DialogContent>
            {children}
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color='secondary' variant='outlined' disabled={loading}>Cancel</Button>
            <Button color='primary' variant='contained' type='submit' disabled={loading} onClick={onSubmit}>
                {loading ? <Loader size={20}/> : submitButtonTitle}
            </Button>
        </DialogActions>
    </Dialog>
}

export default Dialogs