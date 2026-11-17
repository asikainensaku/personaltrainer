import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Home from "./components/Home";

function App() {
  return (

    <Container maxWidth="lg">
      <AppBar>
        <Toolbar>
          <Typography>
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>

      <Home />

      <CssBaseline />
    </Container>

  )
}

export default App
