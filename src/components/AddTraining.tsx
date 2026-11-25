import type { Dayjs } from "dayjs";
import type { Customer } from "../types";
import { useState } from "react";
import dayjs from "dayjs";
import { addTraining } from "../personalTrainerApi";
import { Button, Dialog, DialogActions, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TrainingForm from "./TrainingForm";


type AddTrainingProps = {
    customers: Customer[];
    fetchTrainings: () => void;
};

export default function AddTraining(props: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState<Dayjs | null>(dayjs());
    const [duration, setDuration] = useState(60);
    const [activity, setActivity] = useState("");
    const [customerUrl, setCustomerUrl] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (!date || !customerUrl) {
            return;
        }

        // Date conversion to ISO 8601 format: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        addTraining({
            date: date.toISOString(),
            duration: String(duration),
            activity: activity,
            customer: customerUrl
        })
            .then(() => {
                props.fetchTrainings();
                handleClose();
                setDate(dayjs());
                setDuration(60);
                setActivity("");
                setCustomerUrl("");
            })
            .catch(err => {
                console.error("Training save failed:", err);
                alert("Training could not be saved.");
            });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Training
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>

                <TrainingForm
                    date={date}
                    setDate={setDate}
                    duration={duration}
                    setDuration={setDuration}
                    activity={activity}
                    setActivity={setActivity}
                />

                <DialogActions>
                    <FormControl fullWidth sx={{ mx: 2 }}>
                        <InputLabel id="customer-label">
                            Customer
                        </InputLabel>

                        <Select
                            labelId="customer-label"
                            value={customerUrl}
                            label="Customer"
                            onChange={e => setCustomerUrl(e.target.value)}
                        >
                            {/* Use of map(): https://react.dev/learn/rendering-lists */}
                            {props.customers.map(customer => {
                                const url = customer._links?.self.href;
                                if (!url) return null;

                                return (
                                    <MenuItem key={url} value={url}>
                                        {customer.firstname} {customer.lastname}
                                    </MenuItem>
                                );
                            })}

                        </Select>
                    </FormControl>
                </DialogActions>

                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleSubmit}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}