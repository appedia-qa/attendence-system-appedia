import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import Search from "./search";
import ToDoList from "./toDoList";
import { bindActionCreators } from "redux";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import { compose } from "redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import ToDoListHeader from "./todoHeader";
import { Row, Col, Grid } from "react-flexbox-grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Model from "../../components/ProductDialog";
import Pagination from "@material-ui/lab/Pagination";
import { apiUrl } from "../../constants/urls";
import { getTokken } from "../../redux/reducers/authentication.reducer";
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
  const [productData, setProductData] = useState("");
  const [isAllSelected, setAllSelected] = useState(false);
  const [paginationCount, setPaginationCount] = useState(1);
  const url = `${apiUrl}/products`;
  const dispatch = useDispatch();

  const fetchproduct = async (page) => {
    if (!page) {
      page = 1;
    }
    const tokken = getTokken();
    const response = await axios.get(url);
    const { products } = response.data;
    if (products) {
      const newdata =
        products &&
        products.map((item) => {
          return { ...item, selected: false };
        });
      setProductData(newdata);
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
    setProductData(
      productData &&
        productData.map((p) =>
          p.id === id ? { ...p, selected: !p.selected } : p
        )
    );
  };

  const getSelectedItemsProductCodes = () => {
    return (
      productData &&
      productData.map((x) => {
        if (x.selected) {
          return x.product_code;
        }
      })
    );
  };

  const onSelectAllAction = async (event) => {
    if (event.target.checked) {
      await setProductData(
        productData &&
          productData.map((p) => {
            return { ...p, selected: true };
          })
      );
    } else {
      await setProductData(
        productData &&
          productData.map((p) => {
            return { ...p, selected: false };
          })
      );
    }

    setAllSelected(!isAllSelected);
  };

  const deleteItem = async () => {
    const product_codes = getSelectedItemsProductCodes();
    const tokken = getTokken();
    if (product_codes.length > 0) {
      // TODO: replace code with proper login auth code
      await axios.delete(`${apiUrl}/products/remove`, {
        data: { product_codes },
        headers: {
          Authorization: tokken,
        },
      });
      fetchproduct();
    }
  };

  // const handelEditClick = () => {
  //   const product_codes = getSelectedItemsProductCodes();
  //   console.log(product_codes)
  //   if (product_codes.length > 1) {
  //     console.log('i am in')
  //     dispatch(
  //       props.addErrorItemInAlert({
  //         message: "Please select one product to edit",
  //       })
  //     );
  //   }
  //   props.history.push();
  // };

  const handelEditClick = (code) => {
    if (code) {
      props.history.push(`/product/${code}`);
    }
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
          >
            <Typography component="p" variant="subtitle3" onClick={deleteItem}>
              Delete Item
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
            }}
            onClick={() => {
              props.history.push(`/product/add?add-product=${true}`);
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
              value={isAllSelected}
              onClick={onSelectAllAction}
            />
          </FormGroup>
        </Row>
        {console.log(productData)}
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
                  handelEditClick={handelEditClick}
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

const mapStateToProps = (state) => {
  const { updateError } = state.authentication;
  return {
    updateError,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      addSuccessItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(AdminDashbord);
