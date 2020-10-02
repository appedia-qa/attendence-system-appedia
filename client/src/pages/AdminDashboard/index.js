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
  height: 20px;
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
  const [productData, setProductData] = useState("");
  const [isAllSelected, setAllSelected] = useState(false);
  const url = `${apiUrl}/products`;
  const fetchproduct = async () => {
    // Calculate pagination items here
    let { data } = await axios.get(url);
    if (data) {
      data = data.map(item => {
        return { ...item, selected:false }
      })
      setProductData(data);
    }
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  const closeProductDialog = () => {
    setOpen(false);
  };
  const print = () => {
    setOpen(true);
  };
  const checkname = (lan) => {
    if (lan && lan.eng && lan.ar.name) {
      return lan.ar.name;
    }
    else if (lan && lan.fr && lan.ar.name) {
      return lan.ar.name;
    }
    else if (lan && lan.ar && lan.ar.name) {
      return lan.ar.name;
    }
  };

  const onCheckBoxClick = (id) => {
    setProductData(productData.map((p) => p.id === id ? { ...p, selected: !p.selected } : p));
  };

  const getSelectedItemsProductCodes = () =>  {
    return productData.map(x => {
      if (x.selected) {
        return x.product_code
      }
    })
  }

  const onSelectAllAction = () => {
    setProductData(productData.map((p) => {
      return { ...p, selected: !isAllSelected };
    }));
    setAllSelected(!isAllSelected);
  }

  const deleteItem = async () => {

    const product_codes = getSelectedItemsProductCodes()
    if (product_codes.length > 0) {
      // TODO: replace code with proper login auth code
      await axios.delete(`${apiUrl}/products/remove`, { 
        data: { product_codes },
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJpZCI6IjVmNzc2OTExYTJhNTc5ZDEyOTc0NWY5OCJ9LCJpYXQiOjE2MDE2NjE2Mzd9.d8F9Wcvvpsui3a5FU4vtU3dB5V0YzBf_MIpRWlZkslI"
        }
      });
      fetchproduct();
    }
  }
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
            <Typography component="p" variant="subtitle1" onClick={deleteItem}>
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
              value={isAllSelected}
              onClick={onSelectAllAction}
            />
          </FormGroup>
        </Row>
        <ToDoListHeader />
        <div style={{ width: "100%", margin: "0px" }}>
          {productData &&
            productData.map((obj) => {
              return (
                <ToDoList
                  id={obj.id}
                  url={obj.product_url}
                  selected={obj.selected}
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
      <Model isDialogOpen={open} closeProductDialog={closeProductDialog} />
    </React.Fragment>
  );
};

export default withRouter(AdminDashbord);
