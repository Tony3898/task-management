import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import {Checkbox, Chip, Stack} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import {fetchColorByPriority, fetchColorByStatus} from "../../services/misc.ts";
import {PRIORITY, STATUS, Task} from "../../interfaces/Task.ts";
import List from "@mui/material/List";
import {useEffect, useState} from "react";

const RenderTaskList = ({allTask, checkedList, updateCheckedList, deleteTask, updateTask, hideActions = false}: {
    allTask: Array<Task>,
    updateTask: (id: number) => void,
    deleteTask: (id: number) => void,
    updateCheckedList: Array<Task>,
    hideActions: boolean,
    checkedList: (checkedListFromComponent: Array<number>) => Array<number> | void
}): JSX.Element => {

    const [checked, setChecked] = useState<Array<number>>([]);

    const handleToggle = (value: Task) => () => {
        const currentIndex = checked.indexOf(value.id);
        const newChecked: Array<number> = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value.id);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        checkedList(newChecked);
        setChecked(newChecked);
    };

    useEffect(() => {
        const initializeCheckedState = () => {
            const newChecked: Array<number> = updateCheckedList.map(task => task.id);
            checkedList(newChecked);
            setChecked(newChecked);
        };

        if (updateCheckedList.length > 0 && checked.length === 0) {
            initializeCheckedState();
        } else if (updateCheckedList.length === 0 && checked.length > 0) {
            setChecked([])
        }
    }, [updateCheckedList, checked, checkedList]);


    const renderTaskTitle = (title: string, priority: PRIORITY, dueDate: number, status: STATUS) => {
        return <Stack direction="row" spacing={1} alignItems={'center'}>
            <Typography component="span"
                        variant="body2" fontWeight='medium'>{title}</Typography>
            <Chip label={priority} variant="outlined" size='small' color={fetchColorByPriority(priority)}/>
            <Chip label={new Date(dueDate).toDateString()} size='small' variant="outlined" color={'info'}/>
            <Chip label={status} size='small' variant="outlined" color={fetchColorByStatus(status)}/>
        </Stack>;
    };
    const renderTaskDescription = (description: string) => {
        return <Typography color={'secondary'} component="span"
                           variant="body2">{description}</Typography>;
    };

    const renderTaskListItem = (task: Task) => <Box component={'span'} key={task.id}><ListItem
        key={`${task.id}-list-item`}
        secondaryAction={
            !hideActions && <Stack direction={'row'} spacing={1}>
                <IconButton edge="end" aria-label="edit" color={'info'} onClick={() => updateTask(task.id)}>
                    <EditIcon/>
                </IconButton>
                <IconButton edge="end" aria-label="delete" color={'error'} onClick={() => deleteTask(task.id)}>
                    <DeleteIcon/>
                </IconButton>
            </Stack>
        }
        disablePadding
    >
        <ListItemButton role={undefined} onClick={handleToggle(task)} dense>
            {
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.indexOf(task.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        color={fetchColorByPriority(task.priority)}
                        inputProps={{'aria-labelledby': task.id.toString()}}
                    />
                </ListItemIcon>
            }
            <ListItemText id={task.id.toString()}
                          primary={renderTaskTitle(task.title, task.priority, task.dueDate, task.status)}
                          secondary={renderTaskDescription(task.description)}/>
        </ListItemButton>
    </ListItem>
        <Divider variant="inset" component="li" key={`${task.id}-divider`}/>
    </Box>

    return <List>
        {allTask.map((task: Task) => renderTaskListItem(task))}
    </List>;
}

export default RenderTaskList;