import React from "react";
import { Row, Col } from "react-flexbox-grid";
import styled from "styled-components";
import { Typography, Button } from "@material-ui/core";

const BannerContainer = styled(Row)`
  ${({ theme }) => `
    height: auto;
    width: 100%;
    position: relative;
    background: #3b5998;
    padding: 5% 10%;
    margin: 0;
    .staticContent {
      width: 100%;
      margin: 0;
      ${theme.breakpoints.up("lg")} {
        flex-wrap: nowrap;
      }

      * {
        z-index: 2;
      }
    }
    .productDescriptionBoundry {
      max-width: 250px;
      align-self: center;
      margin: 0 auto;
    }
    .productDescription {
      padding: 10px;
      text-align: left;
      margin-right: 40px;
      ${theme.breakpoints.down("md")} {
        text-align: center;
        width: 100%;
        margin: 0;
      }
      p.MuiTypography-body1 {
        color: white;
        margin-top:10px;
      }
      h3 {
        font-size: 25px;
      }
    }
  `}
`;

const Banner = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  object-fit: cover;
  opacity: 0.4;
`;

const BuyActionRow = styled(Row)`
  ${({ theme }) => `
    margin: 0;
    margin-top: 20px;
    align-items: center;
    justify-content: space-between;
    ${theme.breakpoints.down("md")} {
      justify-content: space-around;
    }

    p.price {
      font-size: 22px;
      font-weight: 600;
      color: white;
    }

    button {
      border-radius: 0;
      box-shadow: none;
      background-color: ${theme.palette.secondary.main};
      display: flex;
      justify-content:center;
      ${theme.breakpoints.down("md")} {
        p {
          font-size: 10px !important;
        }
        padding: 6px;
      }
    }
  `}
`;

const ImageContainer = styled(Row)`
  ${({ theme }) => `

    justify-content:center;
    align-items:center;
    margin: 0;

    ${theme.breakpoints.down("md")} {
      width: 100%;
      margin-top: 30px;
    }
    img {
      background-color: white;
      height: 100%;
      width: 100%;
      border-radius: 43px;
    }

    .imgCol {
      align-items:center;
      justify-content:center;
      display:flex;
    }
  `}
`;

const ImageSmall = styled.img`
  ${({ theme }) => `
    max-height: 146px;
    max-width: 146px;
    min-width: 130px;
    min-height: 130px;

    ${theme.breakpoints.up("lg")} {
      max-height: 162px;
      max-width: 162px;
      min-width: 150px;
      min-height: 150px;
    }
  `}
`;

const ImageLarge = styled.img`
  ${({ theme }) => `
    max-height: 232px;
    max-width: 232px;
    min-width: 210px;
    min-height: 210px;
    margin: 20px 0;
    ${theme.breakpoints.up("lg")} {
      max-height: 260px;
      max-width: 260px;
      min-width: 230px;
      min-height: 230px;
      margin: 0 20px;
    }
`}
`;

const divContainer = styled.div`
  ${({ theme }) => `
   
`}
`;

const TopPicksComponent = (props) => {
  return (
    <div>
      <divContainer>
        <Typography component="h2" variant="h2" className="title">
          Top Pic Garden Tools
        </Typography>
      </divContainer>
      <div>
        <BannerContainer>
          <Banner
            src={require("../../../assets/images/Garden-Background.png")}
          />
          <Row className="staticContent">
            <Col xs={12} lg={4} className="productDescription">
              <div className="productDescriptionBoundry">
                <Typography component="h3" variant="h3">
                  Product Name
                </Typography>
                <Typography component="p" variant="body1">
                  write persuasive copy here or brief description of these
                  products ( bundle). Benefits of having them in your garden or
                  house
                </Typography>
                <BuyActionRow>
                  <Typography className="price" variant="body2">
                    QR 1000
                  </Typography>
                  <Button variant="contained">
                    <Typography component="p" variant="h4">
                      Buy now
                    </Typography>
                  </Button>
                </BuyActionRow>
              </div>
            </Col>
            <Col xs={12} lg={8}>
              <ImageContainer>
                <Col xs={12} lg={3} className="imgCol">
                  <ImageSmall />
                </Col>
                <Col xs={12} lg={6} className="imgCol">
                  <ImageLarge />
                </Col>
                <Col xs={12} lg={3} className="imgCol">
                  <ImageSmall />
                </Col>
              </ImageContainer>
            </Col>
          </Row>
        </BannerContainer>
      </div>
    </div>
  );
};

export default TopPicksComponent;
