import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import type { Training } from "../types";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { getTrainings } from "../personalTrainerApi";


function TrainingList() {
    const [trainings, setTrainings] = useState<Training[]>([]);

    const columns: GridColDef<Training>[] = [
        { field: "date", headerName: "Date" },
        { field: "duration", headerName: "Duration (min)" },
        { field: "activity", headerName: "Activity" },
        {
            field: "customer",
            headerName: "Customer",
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

            <div style={{ width: "100%", height: 500, marginTop: 10 }}>
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