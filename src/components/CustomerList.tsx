import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getCustomers } from "../personalTrainerApi";
import type { Customer } from "../types";


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
            <Typography variant="h6">Customers</Typography>

            <div>
                <DataGrid
                    rows={customers || []}
                    columns={columns}
                />
            </div>
        </>
    );
};

export default CustomerList;