import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import { I18n } from "@lingui/react";
import { Row, Col, Grid } from "react-flexbox-grid";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import PrintRoundedIcon from "@material-ui/icons/PrintRounded";
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
  margin: 0px;
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
                <Typography component="p" variant="subtitle1">
                  0003 0003
                </Typography>
              </Col>
            </Row>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography component="p" variant="subtitle1">
              Name of Product Here
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <Typography component="p" variant="subtitle1">
              Https//www.producturl..
            </Typography>
          </ListColumn>
          <ListColumn lg={3}>
            <StyleButton
              style={{
                margin: "10px",
                border: "1px solid #08004015",
              }}
              onClick={() => {
                props.print(true);
              }}
            >
              <PrintRoundedIcon
                color="disabled"
                style={{ width: "16px", marginRight: "5px" }}
              />
              <Typography component="p" variant="subtitle1">
                Print Code
              </Typography>
            </StyleButton>
          </ListColumn>
        </ToDoList>
      </React.Fragment>
    </I18n>
  );
};

export default withRouter(List);
