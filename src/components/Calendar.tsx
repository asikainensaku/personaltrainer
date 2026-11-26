import FullCalendar from "@fullcalendar/react";

//FulLCalendar React documentation:
//https://fullcalendar.io/docs/react
import dayGridPlugin from "@fullcalendar/react/daygrid";
import timeGridPlugin from "@fullcalendar/react/timegrid"
import listPlugin from "@fullcalendar/react/list";
import interactionPlugin from "@fullcalendar/react/interaction";
import classicThemePlugin from "@fullcalendar/react/themes/classic";

//FullCalendar themes:
//https://fullcalendar.io/docs/stock-themes
import "@fullcalendar/react/skeleton.css"
import '@fullcalendar/react/themes/classic/theme.css';
import '@fullcalendar/react/themes/classic/palette.css';

import { useEffect, useState } from "react";
import { getTrainings } from "../personalTrainerApi";
import type { Training } from "../types";

function Calendar() {

    const [trainings, setTrainings] = useState<Training[]>([]);

    useEffect(() => {
        getTrainings()
            .then(data => setTrainings(data))
            .catch(err => console.error(err));
    }, []);

    // Convert trainings into FullCalendar event objects.
    //https://fullcalendar.io/docs/event-object
    const events = trainings.map(training => {
        const startDate = new Date(training.date);

        //Calculate the end time using the training duration
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + training.duration);

        return {
            title: training.customer
                ? `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`
                : training.activity,
            start: startDate,
            end: endDate
        };
    });

    return (
        <FullCalendar

            //Calendar views and plugins:
            //https://fullcalendar.io/docs/react
            //https://fullcalendar.io/docs/month-view
            //https://fullcalendar.io/docs/timegrid-view
            //https://fullcalendar.io/docs/list-view
            plugins={[
                dayGridPlugin,
                timeGridPlugin,
                listPlugin,
                interactionPlugin,
                classicThemePlugin
            ]}
            initialView="timeGridWeek"

            //Header Toolbar:
            //https://fullcalendar.io/docs/headerToolbar
            headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
            }}

            //Display events in FullCalendar
            events={events}
            height="auto"
        />
    );
}

//FullCalendar documentation used as a reference:
//https://fullcalendar.io/

export default Calendar;
