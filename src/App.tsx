import { AppBar, Button, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Home from "./components/Home";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import TrainingList from "./components/TrainingList";

function App() {
  return (

    <BrowserRouter>
      <CssBaseline />
      <Container maxWidth="lg" disableGutters>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>Power PT</Typography>

            <Button color="inherit" component={Link} to="/">Home</Button>

            <Button color="inherit" component={Link} to="/customers">Customers</Button>

            <Button color="inherit" component={Link} to="/trainings">Trainings</Button>

          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
        </Routes>

      </Container>
    </BrowserRouter>

  );
}

export default App;
