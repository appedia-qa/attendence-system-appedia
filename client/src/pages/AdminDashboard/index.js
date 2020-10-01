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
const AdminDashbord = (props) => {
  return (
    <React.Fragment>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
            marginTop: "20px",
            padding: "0px",
          }}
        >
          <StyleButton
            style={{
              margin: "10px",
            }}
            onClick={() => {
              props.history.push("/product");
            }}
          >
            <Typography component="p" variant="subtitle1">
              Edit Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
          >
            <Typography component="p"  variant="subtitle1">
              Delete Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
            onClick={() => {
              props.history.push("/product");
            }}
          >
            <Typography component="p" variant="subtitle1">
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
        <div style={{width:"100%", margin:'0px'}}>
        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
        <ToDoList />
        </div>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(AdminDashbord);
