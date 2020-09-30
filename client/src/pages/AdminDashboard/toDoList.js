import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { I18n } from "@lingui/react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
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
  border:1px solid #D8D8D8;
  border-top-color: none;
  background-color:#FFFFFF !important;
  
  `}
`;
const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  border-radius: 10px;
  background-color:#FFFFFF !important;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin:0px;
  
  
`}
`;
const ListColumn = styled(Col)`
  ${({ theme }) => `
  line-break: anywhere;
  `}
`;

const List = (props) => {
  return (
    <I18n>
      <React.Fragment>
        <ToDoList style={{ alignItems: "center" }}>
          <ListColumn lg={3}>
            <Row style={{ alignItems: "center" }}>
              <Col>
                <Checkbox defaultChecked color="primary" />
              </Col>
              <Col>
                <Typography component="p" variant="caption">
                  0003 0003
                </Typography>
              </Col>
            </Row>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography component="p" variant="caption">
              Name of Product Here
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography component="p" variant="caption">
              Https//www.producturl..
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <StyleButton
              style={{
                margin: "10px",
              }}
            >
              <Typography component="p" variant="caption">
                Edit Item
              </Typography>
            </StyleButton>
          </ListColumn>
        </ToDoList>
      </React.Fragment>
    </I18n>
  );
};

export default withRouter(List);
