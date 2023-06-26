import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";
// @mui
import { Box, List, ListItemText, MenuItem } from "@mui/material";
//
import { StyledNavItem, StyledNavItemIcon } from "./styles";

import Collapse from "@mui/material/Collapse";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import StarBorder from "@mui/icons-material/StarBorder";
import { useSelector } from "react-redux";

import SvgColor from "../../components/svg-color";
// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

export default function NavSection({ data = [], ...other }) {
  const { user } = useSelector((state) => state.auth);
  const roles = user?.user.roles;

  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {/* {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))} */}

        <NavItem
          key={"dashboard"}
          item={{
            title: "dashboard",
            path: "/dashboard/app",
            icon: icon("ic_analytics"),
            info: "",
          }}
        ></NavItem>

        {roles?.find((rol) => rol.descripcion == "admin") ? (
          <NavItem
            key={"admin"}
            item={{
              title: "admin",
              path: "/admin",
              icon: icon("ic_admin"),
              info: "",
            }}
          ></NavItem>
        ) : null}
        {roles?.find((rol) => rol.descripcion == "viajes") ? (
          <NavItem
            key={"viajes"}
            item={{
              title: "viajes",
              path: "/viajes",
              icon: icon("ic_plane"),
              info: "",
            }}
          ></NavItem>
        ) : null}
        {roles?.find((rol) => rol.descripcion == "coldecam") ? (
          <NavItem
            key={"coldecam"}
            item={{
              title: "coldecam",
              path: "/coldecam",
              icon: icon("ic_car"),
              info: "",
            }}
          ></NavItem>
        ) : null}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        "&.active": {
          color: "text.primary",
          bgcolor: "action.selected",
          fontWeight: "fontWeightBold",
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
