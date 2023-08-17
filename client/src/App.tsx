import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  useMediaQuery
} from '@mui/material';
import { useCallback, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { TopBar } from './components/topBar';
import { Home } from './pages/home/';
import { Projects } from './pages/projects';
import { Resume } from './pages/resume';
import { Experience } from './pages/experience';

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
    ? {
      background: {
        default: "#FAF9F6" 
      },
      secondary: {
        main: "#999999"
      }
    } : {
      secondary: {
        main: "#999999"
      }
    })
  }
});

function App() {
  const [mode, setMode] = useState<PaletteMode>(
    useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
  );

  const changeThemeMode = useCallback((prevMode: 'light' | 'dark') => (
    setMode(prevMode === 'light' ? 'dark' : 'light')
  ), [setMode]);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container maxWidth={false} disableGutters sx={{height: "100vh"}}>
          <TopBar changeThemeMode={changeThemeMode} />
          <Box padding={3} margin={"auto"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </Box>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
