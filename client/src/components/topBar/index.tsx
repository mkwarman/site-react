import { useState, MouseEvent, useCallback } from 'react';
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
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import styled from '@emotion/styled';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cursor } from "../cursor";

const TYPE_DELAY_MS = 50;

const pages = ['Projects', 'Resume', 'About'];
const monoStyle = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontFamily: 'monospace',
  fontWeight: 700,
  color: 'inherit',
  textDecoration: 'none',
}
const HintButton = styled(Button)({
  textTransform: "none",
  color: '#EEEEEE',
  '&:hover': {
    color: '#FFFF00'
  },
})

const dirify = (name: string) => `./${name.toLowerCase()}/`

// When on a child page, have "../" already typed out. It works to go 'home' and to other dirs
export const TopBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [showDirs, setShowDirs] = useState(true);
  const [typeOutput, setTypeOutput] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  
  const type = async (toType: string) => {
    // Simulate typing
    for (let i = 0; i <= toType.length; i++) {
      setTypeOutput(toType.substring(0, i));
      await new Promise(resolve => setTimeout(resolve, TYPE_DELAY_MS));
    }
  }

  const handleCD = useCallback(async (page: string) => {
    setShowDirs(false);
    const dir = dirify(page);
    await type(dir);
    navigate(page.toLowerCase());

    await type("../");
  }, [setTypeOutput]);

  const handleHome = useCallback(() => {
    navigate('');

    setTypeOutput("");
    setShowDirs(true);
  }, [setTypeOutput])

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => handleHome()}
            sx={monoStyle}
          >
            {/* &lt;MW&gt; */}
            [mkwarman.com]$ cd&nbsp;
            {typeOutput && <Typography variant="h6" sx={monoStyle}>{typeOutput}</Typography>}
            <Cursor override={!!typeOutput.length} />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            &lt;MW /&gt;
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Fade in={showDirs} enter={false}>
              <Box>
                {pages.map((page) => (
                  <HintButton
                    disableElevation
                    key={page}
                    onClick={() => handleCD(page)}
                  >
                    <Typography variant="h6" sx={monoStyle}>{dirify(page)}</Typography>
                  </HintButton>
                ))}
                </Box>
              </Fade>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
