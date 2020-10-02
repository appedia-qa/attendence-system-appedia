import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import Search from "./search";
import ToDoList from "./toDoList";
import ToDoListHeader from "./todoHeader";
import { Row, Col, Grid } from "react-flexbox-grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Model from "../../components/ProductDialog";
import Pagination from "@material-ui/lab/Pagination";
import { apiUrl } from "../../constants/urls";
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
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
  
  
`}
`;
const toDoList = [
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
  {
    Product_id: "000 0003",
    Product_name: "testing product",
    Product_url: "Https//www.producturl..",
    code: "12345",
  },
];

const AdminDashbord = (props) => {
  const [open, setOpen] = useState("");
  const [SeletedId, setSeletedId] = useState("");
  const [productData, setProductData] = useState("");
  const [paginationCount, setPaginationCount] = useState(1);
  const url = `${apiUrl}/products`;

  const fetchproduct = async (page) => {
    if (!page) {
      page = 1;
    }
    const { data } = await axios.get(url);
    if (data) {
      console.log(data);
      setProductData(data);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  const handleProductPageChange = async (event, value) => {
    /// call here for pagination
    // fetchproduct(value);
  };

  const closeProductDialog = () => {
    setOpen(false);
  };
  const print = () => {
    setOpen(true);
  };
  const checkname = (lan) => {
    if (lan && lan.eng && lan.ar.name) {
      return lan.ar.name;
    } else if (lan && lan.fr && lan.ar.name) {
      return lan.ar.name;
    } else if (lan && lan.ar && lan.ar.name) {
      return lan.ar.name;
    }
  };

  const onCheckBoxClick = (id) => {
    setSeletedId(id);
  };
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
            <Typography component="p" variant="subtitle3">
              Edit Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
          >
            <Typography component="p" variant="subtitle3">
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
            <Typography component="p" variant="subtitle3">
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
        <div style={{ width: "100%", margin: "0px" }}>
          {productData &&
            productData.map((obj, i) => {
              return (
                <ToDoList
                  id={obj.product_category_id}
                  url={obj.product_url}
                  name={checkname(
                    obj.product_details ? obj.product_details : ""
                  )}
                  code={obj.product_code}
                  print={print}
                  onCheckBoxClick={onCheckBoxClick}
                />
              );
            })}
        </div>
      </Container>
      <div
        style={{ width: "90%", display: "flex", justifyContent: "flex-end" }}
      >
        <Pagination
          count={paginationCount}
          shape="rounded"
          style={{ marginTop: "40px", marginBottom: "40px" }}
          onChange={handleProductPageChange}
        />
      </div>

      <Model isDialogOpen={open} closeProductDialog={closeProductDialog} />
    </React.Fragment>
  );
};

export default withRouter(AdminDashbord);
