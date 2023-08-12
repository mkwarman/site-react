import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, Container, createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import { TopBar } from './components/topBar';
import { Home } from './pages/home/';
import { Projects } from './pages/projects';
import { Resume } from './pages/resume';
import { About } from './pages/about';

const theme = createTheme({
  palette: {
    background: {
      default: "#FAF9F6" 
    }
  }
});


function App() {
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <TopBar />
      <Container maxWidth={false} disableGutters sx={{height: "100vh"}}>
        <Box maxWidth={"md"} padding={3} margin={"auto"}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  </ThemeProvider>
  );
}

export default App;
