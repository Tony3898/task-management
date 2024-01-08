import {DialogProps} from "@mui/material/Dialog/Dialog";

export interface DialogPropsInterface extends DialogProps {
    submitButtonTitle: string,
    loading: boolean,
    onSubmit : ()=> any,
    onClose: ()=>any
}