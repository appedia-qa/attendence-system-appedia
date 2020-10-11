import React, { Component, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import { Row, Col, Grid } from "react-flexbox-grid";
import Carosal from "../../components/ProductCarousel";
import { apiUrl } from "../../constants/urls";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
import axios from "axios";

const Container = styled(Grid)`
  ${({ theme }) => `
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding: 25px;
  padding-top: 5px;
  background:#362222;
  height:100%;

  button {
    
    &:hover {
      background-color: white;
      color: white;
    }
  }
   
    white-space: pre-wrap;      /* CSS3 */   
    white-space: -moz-pre-wrap; /* Firefox */    
    white-space: -pre-wrap;     /* Opera <7 */   
    white-space: -o-pre-wrap;   /* Opera 7 */    
    word-wrap: break-word;      /* IE */
 

  [class^="col-"], [class*=" col-"] {
    height: 100%;
  }
`}
`;
const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  background-color:#FFFFFF;
  height 30px;
  width: 67px;
  display: flex;
  justify-content: center;
  border-radius:6px;
  align-items: center;
  margin:0px;
  p {
    font-size: 14px;
    font-weight: 600;
    color: #080040;
  }
`}
`;

const ProductDesciption = (props) => {
  const [selected, setSelected] = useState({
    english: false,
    arabic: false,
    francais: false,
  });
  const [showData, setShowData] = useState({
    name: "",
    dis: "",
  });
  const [productData, setProductData] = useState({
    showArabic: false,
    showEnglish: false,
    showFr: false,
    images: [],
    ar: {
      name: "",
      dis: "",
    },
    fr: {
      name: "",
      dis: "",
    },
    eng: {
      name: "",
      dis: "",
    },
  });
  const url = `${apiUrl}/products/find`;

  const fetchproduct = async (product_code) => {
    const { data, status } = await axios.post(url, { product_code });
    if (data && (status == 200 || status == 201)) {
      const arabicName =
        data.product_details &&
        data.product_details.ar &&
        data.product_details.ar.name
          ? data.product_details.ar.name
          : "";

      const arabicDiscription =
        data.product_details &&
        data.product_details.ar &&
        data.product_details.ar.description
          ? data.product_details.ar.description
          : "";

      const englishName =
        data.product_details &&
        data.product_details.eng &&
        data.product_details.eng.name
          ? data.product_details.eng.name
          : "";

      const englishDiscription =
        data.product_details &&
        data.product_details.eng &&
        data.product_details.eng.description
          ? data.product_details.eng.description
          : "";

      const frName =
        data.product_details &&
        data.product_details.fr &&
        data.product_details.fr.name
          ? data.product_details.fr.name
          : "";

      const frDiscription =
        data.product_details &&
        data.product_details.fr &&
        data.product_details.fr.description
          ? data.product_details.fr.description
          : "";
      const product_image = data.product_image ? data.product_image : "";

      setProductData({
        ...productData,
        images: product_image,
        showArabic: arabicName ? true : false,
        showEnglish: englishName ? true : false,
        showFr: frName ? true : false,
        ar: {
          ...productData.ar,
          name: arabicName,
          dis: arabicDiscription,
        },
        fr: {
          ...productData.fr,
          name: frName,
          dis: frDiscription,
        },
        eng: {
          ...productData.eng,
          name: englishName,
          dis: englishDiscription,
        },
      });
    }
  };

  useEffect(() => {
    fetchproduct(props.match.params.id);
  }, []);

  useEffect(() => {
    if (productData) {
      if (productData.showEnglish) {
        setSelected({
          ...selected,
          english: true,
        });
      } else if (productData.showFr) {
        setSelected({
          ...selected,
          francais: true,
        });
      } else if (productData.showArabic) {
        setSelected({
          ...selected,
          arabic: true,
        });
      }
    }
  }, [productData]);

  useEffect(() => {
    if (productData) {
      if (selected.english) {
        setShowData({
          ...showData,
          name: productData.eng.name,
          dis: productData.eng.dis,
        });
      } else if (selected.francais) {
        setShowData({
          ...showData,
          name: productData.fr.name,
          dis: productData.fr.dis,
        });
      } else if (selected.arabic) {
        setShowData({
          ...showData,
          name: productData.ar.name,
          dis: productData.ar.dis,
        });
      }
    }
  }, [selected, productData]);

  const setselectedAndPaulateData = (value) => {
    if (value === "english") {
      setSelected({ english: true, arabic: false, francais: false });
    }
    if (value === "arabic") {
      setSelected({ english: false, arabic: true, francais: false });
    }
    if (value === "francais") {
      setSelected({ english: false, arabic: false, francais: true });
    }
  };
  return (
    <React.Fragment>
      <Container>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "18px",
            padding: "0px",
          }}
        >
          {productData.showEnglish && (
            <StyleButton
              style={{
                margin: "5px",
                background: selected.english ? "#6E9F19" : "#E6E4E4",
              }}
              onClick={() => {
                setselectedAndPaulateData("english");
              }}
            >
              <Typography
                component="p"
                variant="subtitle1"
                style={{
                  color: selected.english ? "#FFFFFF" : "",
                }}
              >
                English
              </Typography>
            </StyleButton>
          )}
          {productData.showFr && (
            <StyleButton
              style={{
                margin: "5px",
                background: selected.francais ? "#6E9F19" : "#E6E4E4",
              }}
              onClick={() => {
                setselectedAndPaulateData("francais");
              }}
            >
              <Typography
                component="p"
                variant="subtitle1"
                style={{
                  color: selected.francais ? "#FFFFFF" : ""
                }}
              >
                Français
              </Typography>
            </StyleButton>
          )}
          {productData.showArabic && (
            <StyleButton
              style={{
                margin: "5px",
                background: selected.arabic ? "#6E9F19" : "#E6E4E4",
              }}
              onClick={() => {
                setselectedAndPaulateData("arabic");
              }}
            >
              <Typography
                component="p"
                variant="subtitle1"
                style={{
                  color: selected.arabic ? "#FFFFFF" : ""
                }}
              >
                عربي
              </Typography>
            </StyleButton>
          )}
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "33px",
            padding: "0px",
          }}
        >
          {productData.images && (
            <Col lg={4} sm={4} md={4}>
              <Carosal items={productData.images} />
            </Col>
          )}
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "0px",
            padding: "0px",
          }}
        >
          <Col
            style={{
              background: "rgba(189,152,152, 0.2)",
              marginBottom: "50px",
              borderRadius: "10px",
            }}
            lg={5}
            sm={5}
            md={5}
          >
            <div>
              <p
                style={{
                  color: "#6E9F21",
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "600",
                  marginBottom: "0px",
                  marginTop:"10px"
                }}
              >
                {showData && showData.name ? showData.name : "Not Available"}
              </p>
              <p
                style={{
                  color: "#FFFFFF",
                  maxWidth: "100%",
                  padding: "10px",
                  marginTop: "10px",
                  paddingTop: "0px",
                  fontSize:"12px"
                }}
                dangerouslySetInnerHTML={{
                  __html:
                    showData && showData.dis
                      ? showData.dis
                      : "<p>Not Available</p>",
                }}
              ></p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(ProductDesciption);
