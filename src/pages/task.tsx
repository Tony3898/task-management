import Box from '@mui/material/Box';
import React, {useEffect, useState} from 'react';
import Loader from '../components/wrapper/loader.tsx';
import {Button, Card, CardContent, Stack, TextField, ToggleButton, ToggleButtonGroup} from '@mui/material';
import Typography from '@mui/material/Typography';
import RenderTaskList from '../components/misc/renderTaskList.tsx';
import {PRIORITY, STATUS, Task as TaskInterface} from '../interfaces/Task.ts';
import CreateNewTaskDialogs from '../components/dialogs/createNewTaskDialogs.tsx';
import Divider from '@mui/material/Divider';
import {TASK_NAME} from "../constants";
import {fetchColorByPriority, fetchColorByStatus} from "../services/misc.ts";


const Task = ({priority, status, title, hideActions = false}: {
    priority?: PRIORITY, status?: STATUS, title: string, hideActions: boolean
}) => {

    const [loading, setLoading] = useState(true);
    const [editTask, setEditTask] = useState<TaskInterface>();
    const [allTask, setAllTask] = useState<Array<TaskInterface>>([]);
    const [checked, setChecked] = useState<Array<number>>([]);
    const [openForm, setOpenForm] = useState(false);
    const [priorityFilter, setPriorityFilter] = useState<Array<PRIORITY>>([]);
    const [statusFilter, setStatusFilter] = useState<Array<STATUS>>([]);

    useEffect(() => {
        setLoading(true);
        const taskRaw = window.localStorage.getItem(TASK_NAME)
        if (taskRaw) setAllTask(JSON.parse(taskRaw));
        setLoading(false);
        return;
    }, [])

    useEffect(() => {
        if (priority)
            setPriorityFilter([priority])
        if (status)
            setStatusFilter([status])
    }, [priority, status]);

    useEffect(() => {
        const taskRaw = window.localStorage.getItem(TASK_NAME);
        if (taskRaw) {
            let tasks: Array<TaskInterface> = JSON.parse(taskRaw);
            if (priority) {
                tasks = tasks.filter(t => t.priority === priority)
            }
            if (status) {
                tasks = tasks.filter(t => t.status === status)
            }
            setAllTask(tasks);
            setLoading(false);
        }
    }, [priority, status]);

    if (loading) return <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Loader size={20}/>
    </Box>

    const deleteSelectedTask = (id?: number) => {
        const newTaskList = allTask.filter(t => !id ? !checked.includes(t.id) : t.id !== id);
        setAllTask(newTaskList);
        setChecked([]);
        if (newTaskList.length)
            window.localStorage.setItem(TASK_NAME, JSON.stringify(newTaskList));
        else window.localStorage.removeItem(TASK_NAME);
    };

    const saveEditTask = (id: number) => {
        const taskToEdit = allTask.find(t => t.id === id);
        setEditTask(taskToEdit);
        setOpenForm(true);
    }

    const resetEditTask = () => {
        setEditTask(undefined);
    }

    const handlePriorityFilter = (
        _event: React.MouseEvent<HTMLElement>,
        newPriorityFilter: Array<PRIORITY>,
    ) => {
        const allStoredTaskRaw = window.localStorage.getItem(TASK_NAME);
        if (!allStoredTaskRaw) return;
        const allStoredTask = JSON.parse(allStoredTaskRaw);
        let filteredTask: Array<TaskInterface> = allStoredTask;
        if (newPriorityFilter.length) {
            filteredTask = allStoredTask.filter((task: TaskInterface) => newPriorityFilter.includes(task.priority))
            if (statusFilter.length)
                filteredTask = filteredTask.filter(taskF => statusFilter.includes(taskF.status))
        }
        setAllTask(filteredTask);
        setPriorityFilter(newPriorityFilter);
    };

    const handleStatusFilter = (
        _event: React.MouseEvent<HTMLElement>,
        newStatusFilter: Array<STATUS>,
    ) => {
        const allStoredTaskRaw = window.localStorage.getItem(TASK_NAME);
        if (!allStoredTaskRaw) return;
        const allStoredTask = JSON.parse(allStoredTaskRaw);
        let filteredTask: Array<TaskInterface> = allStoredTask;
        if (newStatusFilter.length) {
            filteredTask = allStoredTask.filter((task: TaskInterface) => newStatusFilter.includes(task.status))
            if (priorityFilter.length)
                filteredTask = filteredTask.filter(taskF => priorityFilter.includes(taskF.priority))
        }
        setAllTask(filteredTask);
        setStatusFilter(newStatusFilter);
    };


    const handleSearchFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        const search = event.target.value;
        const allStoredTaskRaw = window.localStorage.getItem(TASK_NAME);
        if (!allStoredTaskRaw) return;
        const allStoredTask = JSON.parse(allStoredTaskRaw);
        let filteredTask: Array<TaskInterface> = allStoredTask;
        if (search) {
            filteredTask = allStoredTask.filter((task: TaskInterface) => task.title.toLowerCase().includes(search.toLowerCase()) || task.description.toLowerCase().includes(search.toLowerCase()))
        }
        setAllTask(filteredTask);
    };

    return <Card className='w-100 flex-direction-row display-flex justify-content-between'>
        <CardContent className={'w-100 flex-direction-column display-flex items-flex-start'}>
            <CreateNewTaskDialogs open={openForm} onClose={() => setOpenForm(false)} editTask={editTask}
                                  resetEditTask={resetEditTask}
                                  updateTasks={(allTask: Array<TaskInterface>) => setAllTask(allTask)}/>
            <Stack flexDirection={'column'} spacing={{xs: 1, sm: 2}} useFlexGap flexWrap={'wrap'}
                   justifyContent={'space-between'} width={'100%'}>
                <Typography variant={'h6'} component={'p'}>{title || "All Task"}</Typography>
                {!hideActions && <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} spacing={2}
                           useFlexGap flexWrap='wrap'
                           divider={<Divider orientation='vertical' flexItem/>}>
                        <TextField size={'small'} label={'Search'} onChange={handleSearchFilter} color={'primary'}/>
                        <ToggleButtonGroup
                            size={'small'}
                            value={priorityFilter}
                            onChange={handlePriorityFilter}
                            aria-label="priority filter"
                            color={'secondary'}
                        >
                            <ToggleButton value="LOW" aria-label="LOW" color={fetchColorByPriority("LOW")}>
                                <Typography>Low</Typography>
                            </ToggleButton>
                            <ToggleButton value="MEDIUM" aria-label="MEDIUM" color={fetchColorByPriority("MEDIUM")}>
                                <Typography>Medium</Typography>
                            </ToggleButton>
                            <ToggleButton value="HIGH" aria-label="HIGH" color={fetchColorByPriority("HIGH")}>
                                <Typography>High</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <ToggleButtonGroup
                            size={'small'}
                            value={statusFilter}
                            onChange={handleStatusFilter}
                            aria-label="priority filter"
                            color={'secondary'}
                        >
                            <ToggleButton value="TODO" aria-label="TODO" color={fetchColorByStatus("TODO")}>
                                <Typography>TODO</Typography>
                            </ToggleButton>
                            <ToggleButton value="IN PROGRESS" aria-label="IN PROGRESS"
                                          color={fetchColorByStatus("IN PROGRESS")}>
                                <Typography>In Progress</Typography>
                            </ToggleButton>
                            <ToggleButton value="DONE" aria-label="DONE" color={fetchColorByStatus("DONE")}>
                                <Typography>Done</Typography>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                    <Stack flexDirection={'row'} spacing={2} useFlexGap flexWrap='wrap'
                           divider={<Divider orientation='vertical' flexItem/>}>
                        {allTask.length && (allTask.length != checked.length) &&
                            <Button color={'secondary'} variant={'outlined'}
                                    onClick={() => setChecked(allTask.map((task: TaskInterface) => task.id))}>Select
                                All</Button>}
                        {checked.length > 0 &&
                            <Button color={'secondary'} variant={'outlined'} onClick={() => setChecked([])}>Deselect
                                All</Button>}
                        {checked.length == 0 && <Button color={'primary'} variant={'contained'} onClick={() => {
                            setOpenForm(true);
                        }}>Add</Button>}
                        {checked.length >= 1 &&
                            <Button color={'error'} variant={'contained'}
                                    onClick={() => deleteSelectedTask()}>Delete</Button>}
                    </Stack>
                </Stack>}
            </Stack>
            <Box flexGrow={1} p={1}/>
            <Divider flexItem/>
            <Box width='100%'>
                {allTask.length ?
                    <RenderTaskList allTask={allTask} deleteTask={deleteSelectedTask} updateTask={saveEditTask} hideActions={hideActions}
                                    updateCheckedList={allTask.filter(task => checked.includes(task.id))}
                                    checkedList={(checkedListFromComponent: Array<number>): Array<number> | void => {
                                        setChecked([...checkedListFromComponent]);
                                    }}/> :
                    <Typography justifyContent={'center'} alignItems={'center'} textAlign={'center'}
                                variant={'subtitle1'}
                                component={'p'} p={2}>No Task</Typography>}
            </Box>
        </CardContent>
    </Card>
}

export default Task;