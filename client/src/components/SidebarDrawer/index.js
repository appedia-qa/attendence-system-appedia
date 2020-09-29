import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { Typography } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import styled from "styled-components";
import { withRouter } from "react-router";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const menuitem = [
  {
    title: "Home",
    navPath: "/",
    isAuthGuardActive: false,
  },
  {
    title: "Indoor Plants",
    navPath: "/categories/1",
    isAuthGuardActive: false,
  },
  {
    title: "Outdoor Plants",
    navPath: "/categories/2",
    isAuthGuardActive: false,
  },
  {
    title: "Accessories",
    navPath: "/categories/3",
    isAuthGuardActive: false,
  },
  {
    title: "Gardening Needs",
    navPath: "/categories/4",
    isAuthGuardActive: false,
  },
  {
    title: "Our Services",
    navPath: "/our-services",
    isAuthGuardActive: false,
  },
  {
    title: "Account Details",
    navPath: "/admin/account-details",
    isAuthGuardActive: true,
  },
  {
    title: "Contact Us",
    navPath: "/contact-us",
    isAuthGuardActive: true,
  },
  {
    title: "My Favorites",
    navPath: "/admin/my-favorites",
    isAuthGuardActive: true,
  },
  {
    title: "My Order",
    navPath: "/admin/my-order",
    isAuthGuardActive: true,
  },
  {
    title: "Reset Password",
    navPath: "/ResetPassword",
    isAuthGuardActive: true,
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .top-menu {
    flex: 1;
  }
`;
const InfoBar = styled.div`
  ${({ theme }) => `
    display:flex;
    padding: 20px 20px;
    justify-content: space-between;
    align-items: center;

    .user {
      font-size: 18px;
      font-weight: bold;
      color: ${theme.palette.primary.main};
    }

    .auth {
      font-size: 14px;
      color: ${theme.palette.primary.main};
    }
  `}
`;

const StyledList = styled(List)`
  padding: 0 5%;
`;

const StyledListItem = styled(ListItem)`
  height: 60px;
`;

const StyledListItemText = styled.p`
  ${({ theme }) => `
    font-size: 20px !important;
    font-weight: 500;
    flex:1;
    color: ${theme.palette.primary.main};
  `}
`;

const StyledListItemIcon = styled(ListItemIcon)`
  ${({ theme }) => `
    height: 17px;
    width: auto;
    min-width: 25px;
  `}
`;

const BottomMenu = styled.div`
  ${({ theme }) => `
  padding: 0 30px;
  text-align:center;
  margin-top: 30px;
  .download-icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    svg {
      width: 120px;
      height: auto;
    }
    
    .download-icon {
      width: 120px;
      height: auto;

    }
  }
  .trademark {
    font-size: 14px;
    font-weight: 300;
  }
`}
`;

const SidebarDrawer = (props) => {
  const handleNavChange = (navPath) => {
    props.history.push(navPath);
    props.onDrawerClose();
  };

  const userLoggedIn = (props) => {
    if (user && user.id) {
      return true;
    }
    return false;
  };
  const translate = (handel, val) => {
    if (val === "Home") {
      return handel._(t`Home`);
    } else if (val === "Indoor Plants") {
      return handel._(t`Indoor Plants`);
    } else if (val === "Outdoor Plants") {
      return handel._(t`Outdoor Plants`);
    } else if (val === "Accessories") {
      return handel._(t`Accessories`);
    } else if (val === "Gardening Needs") {
      return handel._(t`Gardening Needs`);
    } else if (val === "Our Services") {
      return handel._(t`Our Services`);
    } else if (val === "Account Details") {
      return handel._(t`Account Details`);
    } else if (val === "My Favorites") {
      return handel._(t`My Favorites`);
    } else if (val === "My Order") {
      return handel._(t`My Order`);
    } else if (val === "Contact Us") {
      return handel._(t`Contact Us`);
    } else if (val === "Reset Password") {
      return handel._(t`Reset Password`);
    }
  };
  const { user } = useSelector((state) => state.authentication);

  const SideBar = (props) => (
    <I18n>
      {({ i18n }) => (
        <Container>
          <div class="top-menu">
            <InfoBar>
              <p class="user">
                {userLoggedIn() ? user.name : i18n._(t`Guest User`)}
              </p>
              <p class="auth" onClick={() => handleNavChange("/login")}>
                {!userLoggedIn() && " Login / Signup"}
              </p>
            </InfoBar>
            <Divider />
            <StyledList>
              {menuitem.map((item) => {
                if (item.isAuthGuardActive && userLoggedIn()) {
                  return (
                    <div>
                      <StyledListItem
                        button
                        key={item.title}
                        onClick={() => handleNavChange(item.navPath)}
                      >
                        <StyledListItemText>
                          {translate(i18n, item.title)}
                        </StyledListItemText>
                        <StyledListItemIcon>
                          <ChevronRightIcon />
                        </StyledListItemIcon>
                      </StyledListItem>
                      <Divider />
                    </div>
                  );
                }
                if (!item.isAuthGuardActive) {
                  return (
                    <div>
                      <StyledListItem
                        button
                        key={item.title}
                        onClick={() => handleNavChange(item.navPath)}
                      >
                        <StyledListItemText>
                          {translate(i18n, item.title)}
                        </StyledListItemText>
                        <StyledListItemIcon>
                          <ChevronRightIcon />
                        </StyledListItemIcon>
                      </StyledListItem>
                      <Divider />
                    </div>
                  );
                }
              })}
            </StyledList>
          </div>
          <BottomMenu>
            <p class="trademark">
              {i18n._(t`© 2020 GREEN TREE NURSERY. All Rights Reserved`)}
            </p>
          </BottomMenu>
        </Container>
      )}
    </I18n>
  );

  return (
    <React.Fragment key={"left"}>
      <SwipeableDrawer
        anchor={"left"}
        open={props.open}
        onClose={props.onDrawerClose}
        onOpen={props.onDrawerOpen}
      >
        <SideBar {...props} />
      </SwipeableDrawer>
    </React.Fragment>
  );
};

export default withRouter(SidebarDrawer);
