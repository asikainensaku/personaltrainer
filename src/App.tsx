import { AppBar, Container, CssBaseline, Toolbar, Typography } from "@mui/material";
import Home from "./components/Home";

function App() {
  return (

    <Container maxWidth="lg">
      <AppBar position="static" sx={{ mb: 2 }}>
        <Toolbar>
          <Typography variant="h6">Personal Trainer</Typography>
        </Toolbar>
      </AppBar>

      <Home />

      <CssBaseline />
    </Container>

  )
}

export default App
