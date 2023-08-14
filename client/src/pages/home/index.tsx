import { Avatar, Box, Card, CardContent, Container, Divider, Grid, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LinkEnum } from "../../constants";

export const Home = () => {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Grid
        container
        justifyContent={"center"}
        alignItems={"center"}
        spacing={2}
        maxWidth={"md"}
      >
        <Grid item xs={12} sm={4}>
          <Avatar
            sx={{height: "100%", width: "100%", maxHeight: "250px", maxWidth: "250px", margin: "auto"}}
            alt="a picture of me"
            src="/img/profile.jpg"
          ></Avatar>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Card>
            <CardContent>
              <Typography variant="h5">Hi!</Typography>
              <Typography marginTop={1} marginBottom={2} variant="body1">
                I'm <b>Matt Warman</b>, a Full Stack Software Engineer working at <Link href="https://www.zeal.com" underline="none" target="new">Zeal</Link>.
              </Typography>
              <Divider variant="middle"/>
              <Typography marginTop={2} variant="body1">
                You can also find me on:
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemButton component="a" href={LinkEnum.LinkedInProfile} target="new">
                    <ListItemIcon>
                      <LinkedInIcon htmlColor="#0077B5" />
                    </ListItemIcon>
                    <ListItemText primary="LinkedIn" />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton component="a" href={LinkEnum.GitHubProfile} target="new">
                    <ListItemIcon>
                      <GitHubIcon htmlColor="#000000" />
                    </ListItemIcon>
                    <ListItemText primary="GitHub" />
                  </ListItemButton>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
};