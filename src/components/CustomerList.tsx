import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getCustomers } from "../personalTrainerApi";
import type { Customer } from "../types";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[] | null>();

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
        </>
    );
};

export default CustomerList;