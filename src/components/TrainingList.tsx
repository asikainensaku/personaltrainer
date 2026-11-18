import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Training } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getTrainings } from "../personalTrainerApi";
import dayjs from "dayjs";


function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

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

    useEffect(() => {
        fetchTrainings();
    }, []);

    return (
        <>
            <Typography variant="h6">Trainings</Typography>

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