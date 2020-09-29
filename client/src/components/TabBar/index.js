import React from "react";
import {
  makeStyles,
  withStyles,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react"; 

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: theme.palette.secondary.main,
  },
}))(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));
export const RemoveButtonContainer = styled.div`
  ${({ theme }) => `
    margin-top: 52px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    button {
      height: 40px;
      width: 100px;
      background-color: ${theme.palette.primary.main};
      p {
        padding: 0;
        margin: 0;
        font-size: 13px;
        color: ${theme.palette.white.main};
      }

      svg {
        height: 20px;
        width: auto;
        path {
          fill: ${theme.palette.white.main};
        }
      }
    }
  `}
`;
export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChangeTab = (event, newValue) => {
    props.handleTabChange(newValue + 1);
    setValue(newValue);
  };

  return (
    <I18n>
     {({ i18n }) => (
      <div className={classes.root}>
        <div className={classes.demo1}> 
          <AntTabs
            value={value}
            onChange={handleChangeTab}
            aria-label="ant example"
          >
            <AntTab label={i18n._(t`Indoor Plants`)} />
            <AntTab label={i18n._(t`Outdoor Plants`)} />
            <AntTab label={i18n._(t`Accessories`)} />
            <AntTab label={i18n._(t`Gardening Needs`)} />
          </AntTabs>
          <Typography className={classes.padding} />
        </div>
      </div>
     )}
    </I18n>
  );
}
