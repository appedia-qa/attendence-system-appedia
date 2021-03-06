import React, { Component, useState } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as ErrorIcon } from "../../assets/icons/error-404.svg";
import { Row, Col, Grid } from "react-flexbox-grid";
import Carosal from "../../components/ProductCarousel";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";

const Container = styled(Grid)`
  ${({ theme }) => `
  width:100%;
  display:flex;
  flex-direction:column;
  align-items:center;
 
  background:#362222;
  [class^="col-"], [class*=" col-"] {
    height: 100%;
  }
`}
`;
const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  background-color:#FFFFFF;
  height 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin:0px;
  
  
`}
`;

const ProductDesciption = (props) => {
  const [selected, setSelected] = useState({
    english: false,
    arabic: false,
    francais: false,
  });

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
            marginTop: "20px",
            padding: "0px",
          }}
        >
          <StyleButton
            style={{
              margin: "10px",
              background: selected.english ? "#6E9F19" : "",
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
          <StyleButton
            style={{
              margin: "10px",
              background: selected.francais ? "#6E9F19" : "",
            }}
            onClick={() => {
              setselectedAndPaulateData("francais");
            }}
          >
            <Typography
              component="p"
              variant="subtitle1"
              style={{
                color: selected.francais ? "#FFFFFF" : "",
              }}
            >
              Français
            </Typography>
          </StyleButton>
          <StyleButton
            style={{
              margin: "10px",
              background: selected.arabic ? "#6E9F19" : "",
            }}
            onClick={() => {
              setselectedAndPaulateData("arabic");
            }}
          >
            <Typography
              component="p"
              variant="subtitle1"
              style={{
                color: selected.arabic ? "#FFFFFF" : "",
              }}
            >
              عربي
            </Typography>
          </StyleButton>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            padding: "0px",
          }}
        >
          <Col lg={4} sm={4} md={4}>
            <Carosal
              items={[
                "",
                "https://convertingcolors.com/color-palette-image/view/FFED0000FFFF22ECFFFF90D5.png",
              ]}
            />
          </Col>
        </Row>
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginTop: "20px",
            padding: "0px",
          }}
        >
          <Col
            style={{
              background: "rgba(189,152,152, 0.2)",
              marginTop: "50px",
              marginBottom: "50px",
              borderRadius: "10px",
            }}
            lg={5}
            sm={5}
            md={5}
          >
            <div>
              <p style={{ color: "#FFFFFF" }}>Product Name</p>
              <p style={{ color: "#FFFFFF" }}>
                Zwei flinke Boxer jagen die quirlige Eva und ihren Mops durch
                Sylt. Franz jagt im komplett verwahrlosten Taxi quer durch
                Bayern. Zwölf Boxkämpfer jagen Viktor quer über den großenZwei
                flinke Boxer jagen die quirlige Eva und ihren Mops durch Sylt.
                Franz jagt im komplett verwahrlosten Taxi quer durch Bayern.
                Zwölf Boxkämpfer jagen Viktor quer über den großen
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default withRouter(ProductDesciption);
