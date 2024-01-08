import {Modal} from "@mui/material";

const Modals = ({children, open, onClose}: any) => {
    return <Modal open={open} children={children} onClose={onClose}/>
}

export default Modals