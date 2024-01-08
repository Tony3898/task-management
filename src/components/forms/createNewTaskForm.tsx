import {MenuItem, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {FormikValues} from 'formik'
import dayjs from 'dayjs';
import {Task} from "../../interfaces/Task.ts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {FormikErrors} from "formik/dist/types";

const createNewTaskForm = ({formik, setFieldValue}: {
    formik: FormikValues,
    isLoading?: boolean,
    setFieldValue: (field: string, value: unknown, shouldValidate?: boolean) => Promise<FormikErrors<FormikValues>> | Promise<void>
}) => {
    const {title, description, status, priority, dueDate}: Task = formik.values;
    const {title: titleTouched, description: descriptionTouched} = formik.touched;
    const {title: titleError, description: descriptionError} = formik.errors;
    return <Box component={'form'} className={'form'} width={'100%'} display={'flex'} alignItems={'center'}
                flexDirection={'column'} my={2} noValidate>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}
             width={'100%'} mx={5} my={0}>
            <TextField
                fullWidth
                id='title'
                name='title'
                label='Title'
                value={title}
                onChange={formik.handleChange}
                error={titleError && Boolean(titleError)}
                helperText={titleError && titleTouched}
            />
        </Box>
        <Box m={1}/>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}
             width={'100%'} mx={5} my={0}>
            <TextField
                fullWidth
                id='description'
                name='description'
                label='Description'
                value={description}
                onChange={formik.handleChange}
                error={descriptionTouched && Boolean(descriptionError)}
                helperText={descriptionTouched && descriptionError}
            />
        </Box>
        <Box m={1}/>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}
             width={'100%'} mx={5} my={0}>
            <TextField
                id="status"
                name='status'
                select
                value={status}
                onChange={formik.handleChange}
                label="Status"
                defaultValue="TODO"
                fullWidth
            >
                <MenuItem key='TODO' value='TODO'>
                    To-do
                </MenuItem>
                <MenuItem key='IN PROGRESS' value='IN PROGRESS'>
                    In Progress
                </MenuItem>
                <MenuItem key='DONE' value='DONE'>
                    Done
                </MenuItem>
            </TextField>
            <Box m={1}/>
            <TextField
                id="priority"
                name='priority'
                select
                value={priority}
                onSelect={formik.handleChange}
                onChange={formik.handleChange}
                label="Priority"
                color={'primary'}
                defaultValue="LOW"
                fullWidth
            >
                <MenuItem key='LOW' value='LOW'>
                    Low
                </MenuItem>
                <MenuItem key='MEDIUM' value='MEDIUM'>
                    Medium
                </MenuItem>
                <MenuItem key='HIGH' value='HIGH'>
                    High
                </MenuItem>
            </TextField>
        </Box>
        <Box m={1}/>
        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}
             width={'100%'} mx={5} my={0}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={'Due Date'} name={'dueDate'} value={dayjs(dueDate)}
                            onChange={(value) => setFieldValue('dueDate', value)}/>
            </LocalizationProvider>
        </Box>
    </Box>
}

export default createNewTaskForm;