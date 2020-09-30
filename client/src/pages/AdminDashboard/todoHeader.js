import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { I18n } from "@lingui/react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

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
  `}
`;

const List = (props) => {
  return (
    <I18n>
      <ToDoList>
        <ListColumn lg={3}>Product ID</ListColumn>
        <ListColumn lg={3}>Product Name</ListColumn>
        <ListColumn lg={3}>Product Name</ListColumn>
        <ListColumn lg={3}></ListColumn>
      </ToDoList>
    </I18n>
  );
};

export default withRouter(List);
