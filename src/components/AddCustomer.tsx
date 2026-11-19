import { useState } from "react";
import type { Customer } from "../types";
import { addCustomer } from "../personalTrainerApi";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";


type AddCustomerProps = {
    fetchCustomers: () => void;
};

export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({} as Customer);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        addCustomer(customer)
            .then(() => {
                props.fetchCustomers();
                handleClose();
                setCustomer({} as Customer);
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add New Customer
            </Button>

            <Dialog open={open} onClose={handleClickOpen}>
                <DialogTitle>New Customer</DialogTitle>

                <CustomerForm
                    customer={customer}
                    setCustomer={setCustomer} />

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
    )
}