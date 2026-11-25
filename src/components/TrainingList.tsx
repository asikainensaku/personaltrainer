import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddTraining from "./AddTraining";
import type { Training } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getTrainings, getCustomers } from "../personalTrainerApi";
import type { Customer } from "../types";
import dayjs from "dayjs";


function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef<Training>[] = [
        {
            field: "date", headerName: "Date", flex: 1,
            valueFormatter: (value) => dayjs(value).format("DD.MM.YYYY HH:mm")
        },
        { field: "duration", headerName: "Duration (min)", flex: 1 },
        { field: "activity", headerName: "Activity", flex: 1 },
        {
            field: "customer",
            headerName: "Customer",
            flex: 1,
            renderCell: (params) =>
                `${params.row.customer.firstname} ${params.row.customer.lastname}`
        },
    ];

    const fetchTrainings = () => {
        getTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    };

    const fetchCustomers = () => {
        getCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchTrainings();
        fetchCustomers();
    }, []);

    return (
        <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6">Trainings</Typography>
                <AddTraining
                    customers={customers}
                    fetchTrainings={fetchTrainings}
                />
            </div>

            <div style={{ width: "100%", height: 600, marginTop: 10 }}>
                <DataGrid
                    rows={trainings}
                    columns={columns}
                    getRowId={row => row.id}
                />
            </div>
        </>
    );
};

export default TrainingList;