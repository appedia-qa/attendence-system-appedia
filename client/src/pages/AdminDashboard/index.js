import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import Search from "./search";
import ToDoList from "./toDoList";
import ToDoListHeader from "./todoHeader";
import { Row, Col, Grid } from "react-flexbox-grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";

const Container = styled(Grid)`
  ${({ theme }) => `
  width:80%;
  display:flex;
  flex-direction:column;
  align-items:center;
`}
`;
const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  background-color:#FFFFFF !important;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
  
  
`}
`;
const AdminDashbord = () => {
  return (
    <React.Fragment>
      <div
        style={{
          width: "100%",
          background: "#FFFFFF",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          minHeight:"90px"
        }}
      >
        <Container>
          <Search />
        </Container>
      </div>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "20px",
            padding:"0px"
          }}
        >
          <StyleButton
            style={{
              margin: "10px",
            }}
          >
            <Typography component="p" variant="caption">
              Edit Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
          >
            <Typography component="p" variant="caption">
              Delete Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
          >
            <Typography component="p" variant="caption">
              Add Item
            </Typography>
          </StyleButton>
        </Row>
        <Row style={{ width: "100%", marginTop: "20px" }}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Select All"
            />
          </FormGroup>
        </Row>
        <ToDoListHeader />

        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
      </Container>
    </React.Fragment>
  );
};

export default withRouter(AdminDashbord);
