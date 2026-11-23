import { useState } from "react";
import type { Customer } from "../types"
import { updateCustomer } from "../personalTrainerApi";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";


type EditCustomerProps = {
    customer: Customer;
    fetchCustomers: () => void;
};

export default function EditCustomer(props: EditCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>(props.customer);

    const handleClickOpen = () => {
        setCustomer(props.customer);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        const url = props.customer._links?.self.href;

        if (!url) {
            console.error("Customer URL is missing");
            return;
        }
        updateCustomer(url, customer)
            .then(() => {
                props.fetchCustomers();
                handleClose();
            })
            .catch(err => console.error(err));
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Edit
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Customer</DialogTitle>

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