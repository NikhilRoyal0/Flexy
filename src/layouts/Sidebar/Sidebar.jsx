import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link, NavLink } from "react-router-dom";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@mui/material";
import { SidebarWidth } from "../../assets/global/Theme-variable";
import LogoIcon from "../Logo/LogoIcon";
import Buynow from "./Buynow";

import { fetchMenuItems } from "../../app/menuSlice";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const menuItems = useSelector((state) => state.menu.menuItems);

  const [open, setOpen] = React.useState(true);

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Box sx={{ p: 3, height: "calc(100vh - 40px)" }}>
      <Link to="/">
        <Box sx={{ display: "flex", alignItems: "Center" }}>
          <LogoIcon />
        </Box>
      </Link>

      <Box>
      <List
        sx={{
          mt: 4,
        }}
      >
        {menuItems.map((item, index) => (
          <React.Fragment key={item.id}>
            <List component="li" disablePadding>
              <ListItem
                onClick={() => handleClick(index)}
                button
                component={NavLink}
                to={item.href}
                selected={pathDirect === item.href}
                sx={{
                  mb: 1,
                  ...(pathDirect === item.href && {
                    color: "white",
                    backgroundColor: (theme) =>
                      `${theme.palette.primary.main}!important`,
                  }),
                }}
                disabled={item.disabled}
              >
                <ListItemIcon
                  sx={{
                    ...(pathDirect === item.href && { color: "white" }),
                  }}
                >
                  <item.icon width="20" height="20" />
                </ListItemIcon>
                <ListItemText>
                  {item.title}
                  {item.subItems && (
                    <IconButton
                      sx={{ ml: 1, color: "inherit", p: 0 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleClick(index);
                      }}
                    >
                      {open === index ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  )}
                </ListItemText>
              </ListItem>
            </List>

            {item.subItems && open === index && (
              <List component="ul" disablePadding sx={{ paddingLeft: 2 }}>
                {item.subItems.map((subItem) => (
                  <ListItem
                    key={subItem.id}
                    button
                    component={NavLink}
                    to={subItem.href}
                    selected={pathDirect === subItem.href}
                    sx={{
                      mb: 1,
                      ...(pathDirect === subItem.href && {
                        color: "white",
                        backgroundColor: (theme) =>
                          `${theme.palette.primary.main}!important`,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ...(pathDirect === subItem.href && { color: "white" }),
                      }}
                    >
                      <subItem.icon width="20" height="20" />
                    </ListItemIcon>
                    <ListItemText>{subItem.title}</ListItemText>
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
      </Box>
      <Buynow />
    </Box>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={props.isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        {SidebarContent}
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
        },
      }}
      variant="temporary"
    >
      {SidebarContent}
    </Drawer>
  );
};

export default Sidebar;
