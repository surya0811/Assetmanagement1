import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AppsIcon from "@mui/icons-material/Apps";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 240;

const StyledHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const StyledFeatureList = styled("ul")(({ theme }) => ({
  paddingLeft: theme.spacing(4),
  marginBottom: theme.spacing(3),
  "& li": {
    marginBottom: theme.spacing(1),
    listStyleType: "none",
    "&::before": {
      content: '"\\2022"',
      color: theme.palette.secondary.main,
      display: "inline-block",
      width: "1em",
      marginLeft: "-1em",
    },
  },
}));

const StyledGetStarted = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "white",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  backgroundColor: "#2196f3",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

function Sidebar1() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const handleNavigation = (route) => {
    navigate(route);
  };
  const handleLogout = () => {
    axios
      .get("http://localhost:3000/logout")
      .then((res) => {
        navigate("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const iconList = [<AppsIcon />];
  const itemList = [
    "PRODUCT INFO",
    "VARIANT INFO",
    "COMPLETE INFO",
    "DEPARTMENT INFO",
  ];
  const routeList = ["/productreport", "/VariantReport", "/report1", "/report"];
  // const iconList = [<SearchIcon />, <InventoryIcon />, <AppsIcon />, <DatasetIcon/>];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="div"
            textTransform={"Uppercase"}
            textAlign={"center"}
          >
            Asset management Report information portal
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h6"
            noWrap
            component="div"
            textTransform={"Uppercase"}
            textAlign={"center"}
          >
            Asset@INFO
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemList.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => handleNavigation(routeList[index])}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {iconList}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["LogOut"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block" }}
              onClick={handleLogout}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {<LogoutIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <StyledHeading variant="h4" gutterBottom>
        Welcome to the Asset Management System
      </StyledHeading>
      <Typography variant="body1">
        Our Asset Management System provides a comprehensive solution for
        managing various types of assets within your organization. Whether it's
        equipment, inventory, facilities, or digital assets, our system helps
        you track, monitor, and optimize your assets' lifecycle.
      </Typography>
      <StyledHeading variant="h5" gutterBottom>
        Key Features:
      </StyledHeading>
      <StyledFeatureList>
        <li>
          Inventory Management: Keep track of all your assets in one central
          repository.
        </li>
        <li>
          Asset Tracking: Monitor the location, status, and condition of assets
          in real-time.
        </li>
        <li>
          Maintenance Scheduling: Schedule and manage maintenance tasks to
          ensure assets are properly maintained.
        </li>
        <li>
          Depreciation Calculation: Automatically calculate asset depreciation
          to maintain accurate financial records.
        </li>
        <li>
          Reporting and Analytics: Generate reports and analytics to gain
          insights into asset performance and utilization.
        </li>
        <li>
          Integration: Seamlessly integrate with other business systems for data
          exchange and workflow automation.
        </li>
      </StyledFeatureList>
      <Typography variant="body1">
        Our Asset Management System is designed to streamline your asset
        management processes, improve efficiency, and reduce operational costs.
        Whether you're a small business or a large enterprise, our solution can
        scale to meet your needs.
      </Typography>
      <StyledHeading variant="h5" gutterBottom>
        Get Started:
      </StyledHeading>
      <StyledGetStarted variant="body1">
        To get started, explore the menu options on the left to access different
        features of the system. If you have any questions or need assistance,
        feel free to contact our support team.
      </StyledGetStarted>
    </Box>
    </Box>
  );
}


export default Sidebar1;
