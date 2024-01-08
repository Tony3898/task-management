import React from "react";
import Task from "./task.tsx";
import {Stack} from "@mui/material";

export default function Dashboard(): React.ReactNode {
    return (
        <Stack flexDirection={'column'} width={'100%'} spacing={2}>
            <Task title={'Completed'} hideActions={true} status={'DONE'}/>
            <Task title={'High'} hideActions={true} priority={'HIGH'}/>
        </Stack>
    );
}
