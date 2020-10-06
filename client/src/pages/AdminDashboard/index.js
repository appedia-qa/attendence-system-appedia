import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import ToDoList from "./toDoList";
import { bindActionCreators } from "redux";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import { I18n } from "@lingui/react";
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
import { t } from "@lingui/macro";
import { getTokken } from "../../redux/reducers/authentication.reducer";
import { getSearchParameters } from "../../utils/url";
import appendQuery from "append-query";
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

const AdminDashbord = (props) => {
  const [open, setOpen] = useState("");
  const [productData, setProductData] = useState("");
  const [isAllSelected, setAllSelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const fetchproduct = async (page) => {
    if (!page) {
      page = 1;
    }
    const params = getSearchParameters();
    if (!params.query) {
      params.query = "";
    }
    let url = `${apiUrl}/products/search?query=${params.query}&&page=${page}`;
    const response = await axios.get(url);
    const resp = response.data;
    if (resp && resp.products && resp.meta) {
      const newdata = resp.products.map((item) => {
        return { ...item, selected: false };
      });
      setProductData({
        products: newdata,
        meta: resp.meta,
      });
    }
  };

  useEffect(() => {
    const tokken = getTokken();
    if (!tokken) {
      props.history.push("/login");
    }
    setSearch(window.location.search);
    fetchproduct(currentPage);
  }, []);

  useEffect(() => {
    setSearch(window.location.search);
    fetchproduct(currentPage);
  }, [window.location.search]);

  const handleProductPageChange = async (event, value) => {
    setCurrentPage(value);
    fetchproduct(value);
  };

  const closeProductDialog = () => {
    setOpen(false);
  };
  const print = () => {
    setOpen(true);
  };
  const checkname = (lan) => {
    if (lan && lan.eng && lan.eng.name) {
      return lan.eng.name;
    } else if (lan && lan.fr && lan.fr.name) {
      return lan.fr.name;
    } else if (lan && lan.ar && lan.ar.name) {
      return lan.ar.name;
    }
  };

  const onCheckBoxClick = (e, id) => {
    const data =
      productData &&
      productData.products &&
      productData.products.map((p) =>
        p.id === id ? { ...p, selected: e.target.checked } : p
      );
    setProductData({
      ...productData,
      products: data,
    });
  };

  const getSelectedItemsProductCodes = () => {
    return (
      productData &&
      productData.products &&
      productData.products.map((x) => {
        if (x.selected) {
          return x.product_code;
        }
      })
    );
  };

  const onSelectAllAction = async (event) => {
    if (event.target.checked) {
      console.log(productData.products);

      const newProducts =
        productData &&
        productData.products &&
        productData.products.map((p) => {
          return { ...p, selected: true };
        });

      await setProductData({
        ...productData,
        products: newProducts,
      });
    } else {
      const newProducts =
        productData &&
        productData.products &&
        productData.products.map((p) => {
          return { ...p, selected: false };
        });

      await setProductData({
        ...productData,
        products: newProducts,
      });
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
      fetchproduct(currentPage);
    }
  };

  const handelEditClick = (code) => {
    if (code) {
      props.history.push(`/product/${code}`);
    }
  };

  return (
    <I18n>
      {({ i18n }) => (
        <div>
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
                  <Typography
                    component="p"
                    variant="subtitle3"
                    onClick={deleteItem}
                  >
                    {i18n._(t`Delete Item`)}
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
                    {i18n._(t` Add Item`)}
                  </Typography>
                </StyleButton>
              </Row>
              <Row style={{ width: "100%", marginTop: "20px" }}>
                <FormGroup row>
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label={i18n._(t`Select All`)}
                    value={isAllSelected}
                    onClick={onSelectAllAction}
                  />
                </FormGroup>
              </Row>
              <ToDoListHeader />
              <div style={{ width: "100%", margin: "0px" }}>
                {productData &&
                  productData.products &&
                  productData.products.map((obj) => {
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
              style={{
                width: "90%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Pagination
                limit={
                  productData && productData.meta && productData.meta.limit
                }
                page={productData && productData.meta && productData.meta.page}
                count={
                  productData && productData.meta && productData.meta.totalPages
                }
                shape="rounded"
                style={{ marginTop: "40px", marginBottom: "40px" }}
                onChange={handleProductPageChange}
              />
            </div>

            <Model
              isDialogOpen={open}
              closeProductDialog={closeProductDialog}
            />
          </React.Fragment>
        </div>
      )}
    </I18n>
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
