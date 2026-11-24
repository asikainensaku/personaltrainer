import { IconButton, Snackbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, type GridColDef, type GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCustomer, getCustomers } from "../personalTrainerApi";
import type { Customer } from "../types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[] | null>();
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [

        { field: "firstname", headerName: "First name", flex: 1 },
        { field: "lastname", headerName: "Last name", flex: 1 },
        { field: "streetaddress", headerName: "Address", flex: 1 },
        { field: "postcode", headerName: "Postcode", flex: 1 },
        { field: "city", headerName: "City", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
        { field: "phone", headerName: "Phone", flex: 1 },
        {
            field: "edit",
            headerName: "Edit",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <EditCustomer
                    customer={params.row}
                    fetchCustomers={fetchCustomers} />
            )
        },
        {
            field: "_links.self.href",
            headerName: " ",
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) =>
                <IconButton onClick={() => handleDelete(params.row._links.self.href)}>
                    <DeleteIcon color="error" />

                </IconButton>
        }

    ];

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = (url: string) => {
        if (window.confirm("Are you sure you want to delete this customer? All their trainings will also be deleted.")) {
            deleteCustomer(url)
                .then(() => {
                    fetchCustomers();
                    setOpen(true);
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Customers</Typography>
                <AddCustomer fetchCustomers={fetchCustomers} />
            </div>

            <div style={{ width: "100%", height: 900, marginTop: 10 }}>
                <DataGrid
                    rows={customers || []}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                />
            </div>
            <Snackbar
                open={open}
                message="Customer deleted successfully"
                autoHideDuration={3000}
                onClose={() => setOpen(false)}
            />
        </>
    );
};

export default CustomerList;