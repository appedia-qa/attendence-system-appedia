import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { I18n } from "@lingui/react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { t } from "@lingui/macro";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";

const ToDoList = styled(Row)`
  ${({ theme }) => `
  width:100%;
  background:#503320;
  border:1px solid #D8D8D8;
  color:white;
  margin-top:50px;
  
  `}
`;

const ListColumn = styled(Col)`
  ${({ theme }) => `
  padding:20px;
  color:#FFFFFF !important;
  `}
`;

const List = (props) => {
  return (
    <I18n>
      {({ i18n }) => (
        <ToDoList>
          <ListColumn lg={3}>
            <Typography
              style={{ color: "#FFFFFF" }}
              component="p"
              variant="subtitle1"
            >
              {i18n._(t` Product Code`)}
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography
              style={{ color: "#FFFFFF" }}
              component="p"
              variant="subtitle1"
            >
              {i18n._(t` Product Name`)}
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography
              style={{ color: "#FFFFFF" }}
              component="p"
              variant="subtitle1"
            >
              {i18n._(t` Product URL`)}
            </Typography>
          </ListColumn>
          <ListColumn lg={3}></ListColumn>
        </ToDoList>
      )}
    </I18n>
  );
};

export default withRouter(List);
