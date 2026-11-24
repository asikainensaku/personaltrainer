import type React from "react";
import { DialogContent, TextField } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import type { Dayjs } from "dayjs"


type TrainingFormProps = {
    date: Dayjs | null;
    setDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
    duration: number;
    setDuration: React.Dispatch<React.SetStateAction<number>>;
    activity: string;
    setActivity: React.Dispatch<React.SetStateAction<string>>;
};

function TrainingForm(props: TrainingFormProps) {
    return (
        <DialogContent>

            {/* Use of Date and Time Picker: https://mui.com/x/react-date-pickers/date-time-picker/ */}
            <DateTimePicker
                label="Date and time"
                value={props.date}
                onChange={props.setDate}
                sx={{ mt: 2, mb: 2, width: "100%" }}
            />
            <TextField
                required
                margin="dense"
                label="Duration (minutes)"
                type="number"
                value={props.duration}
                onChange={e => props.setDuration(Number(e.target.value))}
                fullWidth
            />

            <TextField
                required
                margin="dense"
                label="Activity"
                value={props.activity}
                onChange={e => props.setActivity(e.target.value)}
                fullWidth
            />

        </DialogContent>
    );
}

export default TrainingForm;