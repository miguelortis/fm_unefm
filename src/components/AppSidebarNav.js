import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../contexts/Context";
import PropTypes from "prop-types";

import { CBadge } from "@coreui/react";
import { useSelector } from "react-redux";
//
export const AppSidebarNav = ({ items }) => {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  const location = useLocation();
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
            activeClassName: "active",
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    );
  };
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items?.map((item, index) => {
          return currentUser?.role?.options?.find((role) => role === item?.code)
            ? item?.items
              ? navGroup(item, index)
              : navItem(item, index)
            : currentUser?.role?.name !== "USER" &&
                item?.code === 4 &&
                navItem(item, index);
        })}
    </React.Fragment>
    // <React.Fragment>
    //   {items &&
    //     items.map((item, index) =>
    //       currentUser?.code?.includes(item.code) ? item.items ? navGroup(item, index) : navItem(item, index) : '',
    //     )}
    // </React.Fragment>
    // <React.Fragment>
    //   {items &&
    //     items.map((item, index) =>
    //       item?.role === currentUser?.role || item?.role === 'user'
    //         ? item.items
    //           ? navGroup(item, index)
    //           : navItem(item, index)
    //         : '',
    //     )}
    // </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
