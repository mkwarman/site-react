import {
  useState,
  MouseEvent,
  useCallback,
  useEffect
} from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Fade,
  useTheme,
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cursor } from "../cursor";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

const TYPE_DELAY_MS = 30;
const TEXT_COLOR = "#EEEEEE";

interface IPage {
   properName: string,
   location: string,
};

const pages: IPage[] = [
  {
    properName: "Home",
    location: "/",
  },
  {
    properName: "Projects",
    location: "/projects/",
  },
  {
    properName: "Experience",
    location: "/experience/",
  },
  {
    properName: "Resume",
    location: "/resume/",
  },
];

const monoStyle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  color: TEXT_COLOR,
  textDecoration: 'none',
}
const HintButton = styled(Button)({
  textTransform: "none",
  '&:hover': {
    color: '#FFFF00'
  },
})

const wait = async (delayMS: number) => new Promise(resolve => setTimeout(resolve, delayMS));
const isHome = (pathName: string) => pathName === "/";

interface ITopBarProps {
  changeThemeMode: (prevMode: 'light' | 'dark') => void;
}

// When on a child page, have "../" already typed out. It works to go 'home' and to other dirs
export const TopBar = ({changeThemeMode}: ITopBarProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [showDirs, setShowDirs] = useState(true);
  const [typeOutput, setTypeOutput] = useState("");
  const [workingDir, setWorkingDir] = useState("");
  const [navPrefix, setNavPrefix] = useState(".");
  const [availablePages, setAvailablePages] = useState(pages);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const simulateTyping = useCallback(async (toType: string, replace = false) => {
    if (replace === true) {
      setTypeOutput("");
    }

    const fullString = `${typeOutput}${toType}`;
    const offset = typeOutput.length;

    for (let i = offset; i <= fullString.length; i++) {
      setTypeOutput(toType.substring(0, i));
      await wait(TYPE_DELAY_MS);
    }
  }, [typeOutput])

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorElNav(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  
  const handleNavMenuClick = (location: string) => {
    setAnchorElNav(null);
    navigate(location);
  }

  const getFullPath = useCallback((pageLocation: string) =>
    `${navPrefix}${pageLocation}`, [navPrefix]);

  const handleChangePage = useCallback(async (page: IPage) => {
    setShowDirs(false);
    await simulateTyping(`cd ${getFullPath(page.location)}`);
    navigate(page.location);
  }, [simulateTyping, getFullPath, navigate]);

  const handleClickHome = useCallback(async (currentPath: string) => {
    if (currentPath === "/") return;

    await simulateTyping("cd ~");
    navigate('');

    setShowDirs(true);
  }, [navigate, simulateTyping])

  useEffect(() => {
    setAvailablePages(pages.filter(p => p.location !== location.pathname));
    if (isHome(location.pathname)) {
      setWorkingDir("");
      setNavPrefix(".");
    } else {
      setWorkingDir(location.pathname);
      setNavPrefix("..");
    }
    setShowDirs(true);
    setTypeOutput("");
  }, [location.pathname]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleClickHome(location.pathname)}
            sx={monoStyle}
          >
            mkwarman.com:~{workingDir}$ {typeOutput}<Cursor/>
          </Typography>

          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="navigation button"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {availablePages.map((page) => (
                <MenuItem key={page.properName} onClick={() => handleNavMenuClick(page.location)}>
                  <Typography textAlign="center">{page.properName}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                mx: 'auto'
              }}
            >
              &lt;MW /&gt;
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Fade in={showDirs} enter={false}>
              <Box>
                {availablePages.map((page) => (
                  <HintButton
                    disableElevation
                    key={page.properName}
                    onClick={() => handleChangePage(page)}
                  >
                    <Typography variant="h6" sx={monoStyle}>{`${navPrefix}${page.location}`}</Typography>
                  </HintButton>
                ))}
                </Box>
              </Fade>
          </Box>
          <Box>
            <IconButton
              size="large"
              onClick={() => changeThemeMode(theme.palette.mode)}
              color="inherit"
            >
              {theme.palette.mode === 'light'
                ? <DarkModeOutlined htmlColor={TEXT_COLOR} />
                : <LightModeOutlined htmlColor={TEXT_COLOR} />}
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
