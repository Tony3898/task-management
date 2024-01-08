import Dialogs from "../wrapper/dialogs.tsx";
import {useFormik} from "formik";
import {useEffect, useState} from "react";
import * as yup from 'yup'
import dayjs from 'dayjs';
import {ModalProps} from "@mui/material/Modal";
import CreateNewTaskForm from "../forms/createNewTaskForm.tsx";
import {Task} from "../../interfaces/Task.ts";

const CreateNewTaskDialogs = ({open, onClose, updateTasks, editTask, resetEditTask}: {
    open: ModalProps['open'],
    onClose: () => void,
    resetEditTask: () => void,
    updateTasks: (tasks: Array<Task>) => void,
    editTask?: Task
}) => {
    const [isLoading, setIsLoading] = useState(false)
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            dueDate: dayjs().toDate().getTime(),
            id: 1,
            status: "TODO",
            priority: "LOW",
            ...editTask
        },
        validationSchema: yup.object({
            title: yup.string().required('Required'),
            description: yup.string().required('Required'),
        }),
        onSubmit: (values: Task) => {
            const storedTaskRaw = window.localStorage.getItem('tasks');
            let allTask: Array<Task>;
            if (storedTaskRaw) {
                let storedTask: Array<Task> = JSON.parse(storedTaskRaw);
                if (editTask) storedTask = storedTask.filter(sTask => sTask.id != editTask.id)
                allTask = [...storedTask, {
                    ...values,
                    id: editTask ? editTask.id : storedTask.sort((current, previous) => previous.id - current.id)[0]?.id + 1
                }];
                window.localStorage.setItem('tasks', JSON.stringify(allTask));
            } else {
                allTask = [{...values}]
                window.localStorage.setItem('tasks', JSON.stringify(allTask))
            }
            onClose();
            resetEditTask();
            updateTasks(allTask);
            formik.resetForm();
            setIsLoading(false);
        },
    });

    useEffect(() => {
        if (editTask) formik.setValues(editTask);
    }, [editTask]);
    return <Dialogs open={open} onClose={onClose} title="Add New Task" onSubmit={formik.handleSubmit}
                    loading={isLoading} submitButtonTitle={'Submit'}>
        <CreateNewTaskForm formik={formik} isLoading={isLoading} setFieldValue={formik.setFieldValue}/>
    </Dialogs>
}
export default CreateNewTaskDialogs;