import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Home from "./components/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Calendar from "./components/Calendar";

function App() {
  return (

    // Source for using LocalizationProvider and Dayjs: https://mui.com/x/react-date-pickers/quickstart/

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg" disableGutters>
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>Power PT</Typography>

              <Button color="inherit" component={Link} to="/">Home</Button>

              <Button color="inherit" component={Link} to="/customers">Customers</Button>

              <Button color="inherit" component={Link} to="/trainings">Trainings</Button>

              <Button color="inherit" component={Link} to="/calendar">Calendar</Button>

            </Toolbar>
          </AppBar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/trainings" element={<TrainingList />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>

        </Container>
      </BrowserRouter>
    </LocalizationProvider>
  );
}

export default App;
