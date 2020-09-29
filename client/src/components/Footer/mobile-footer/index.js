import React from "react";
import styled from "styled-components";
import * as DesktopFooter from "./styles";
import Link from "@material-ui/core/Link";
import { withRouter } from "react-router";
import { Row, Col } from "react-flexbox-grid";
import { Typography } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InstagramIcon from "@material-ui/icons/Instagram";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { ReactComponent as FooterIcon } from "../../../assets/images/footerIcon.svg";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));
const Container = styled.div`
  justify-content: center;
  display: flex;
  ${({ theme }) => `
    max-height: 42px;
    width: 100%;
    border-radius: 5px;
    display: flex;
  `}
`;

const Line = styled.div`
  margin-top: 41px;
  margin-bottom: 41px;
  width: 100%;
  border-top: 1px solid #f5f8fc;
`;

const StyledTextField = styled(TextField)`
  padding-left: 10px;
  border: 1px solid gray;
  margin-right: 5px;
  padding-right: 10px;
  input {
    width: 250px;
    color: white;
    font-size: 12px;
    background-color: transparent;
  }
`;

const SubscribeButton = styled.div`
  h2 {
    padding: 5px;
    margin: 0px;
    color: black;
    font-size: 12px;
    font-weight: 800;
  }
  ${({ theme }) => `
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${theme.palette.secondary.main};
    svg {
      height: 16px;
      width: auto;
      path {
        fill: ${theme.palette.primary.main};
      }
    }
  `}
`;
const Footer = (props) => {
  const classes = useStyles();
  const preventDefault = (event) => event.preventDefault();

  return (
    <I18n>
      {({ i18n }) => (
        <DesktopFooter.Container>
          <Row style={{ display: "flex", flexDirection: "row" }}>
            <DesktopFooter.MarginContainer>
              <Col xs={12}>
                <DesktopFooter.SvgContainer>
                  <FooterIcon />
                </DesktopFooter.SvgContainer>
              </Col>
              <Line />
              <Col xs={12}>
                <Row>
                  <Col xs={12}>
                    <DesktopFooter.BrandContainer>
                      <Typography className={classes.root}>
                        {i18n._(t`About US`)}
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={() => {
                              props.history.push("/about-us");
                            }}
                          >
                            <h2> {i18n._(t`Who we are`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={() => {
                              props.history.push("/contact-us");
                            }}
                          >
                            <h2> {i18n._(t`Contact Us`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      {/* <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Careers`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography> */}
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={() => {
                              props.history.push("/our-services");
                            }}
                          >
                            <h2> {i18n._(t`Our Services`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={() => {
                              props.history.push("/about-us");
                            }}
                          >
                            <h2>{i18n._(t`Our Audience`)}</h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                    </DesktopFooter.BrandContainer>
                  </Col>
                  {/* <Col xs={12}>
                    <DesktopFooter.BrandContainer>
                      <Typography className={classes.root}>
                        {i18n._(t`Buying Guides`)}
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2>{i18n._(t`Outdoor Plants`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Indoor Plants`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Seeds`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Tools & Equipment`)}</h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Soil & Fertilizers`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                    </DesktopFooter.BrandContainer>
                  </Col> */}
                  <Col xs={12}>
                    <DesktopFooter.BrandContainer>
                      <Typography className={classes.root}>
                        {i18n._(t`Help & Support`)}
                      </Typography>
                      {/* <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Payment Methods`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography> */}
                      {/* <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Order Information`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography> */}
                      {/* <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            {" "}
                            <ArrowForwardIosIcon
                              style={{ fontSize: "12px" }}
                            />{" "}
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Shipping & Delivery`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography> */}
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`Return Policy`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                      <Typography className={classes.root}>
                        <DesktopFooter.DivContainer>
                          <h1>
                            <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                          </h1>
                          <Link
                            href="#"
                            color="inherit"
                            onClick={preventDefault}
                          >
                            <h2> {i18n._(t`After-Sales Service Policies`)} </h2>
                          </Link>
                        </DesktopFooter.DivContainer>
                      </Typography>
                    </DesktopFooter.BrandContainer>
                  </Col>
                </Row>
              </Col>
            </DesktopFooter.MarginContainer>
            <Line style={{ marginTop: "41px" }} />
            {/* <DesktopFooter.ColEdit xs={12}>
              <Typography className={classes.root}>
                {i18n._(t`Subscription Offer`)}
              </Typography>
              <Typography className={classes.root}>
                <DesktopFooter.DivContainer>
                  <h2>
                    {i18n._(
                      t`Subscribe now to the Green Tree Nursery Online Store to receive a 5% off coupon, updates about campaigns, and news about popular products If you already have an account with us, please submit the same email address that you registered your account with Green Tree`
                    )}
                  </h2>
                </DesktopFooter.DivContainer>
              </Typography>
            </DesktopFooter.ColEdit> */}
          </Row>

          <Row style={{ marginTop: "20px" }}>
            <Col xs={12}>
              <DesktopFooter.ColEdit>
                <Typography className={classes.root}>
                  {i18n._(t`Connect With Us`)}
                </Typography>
                <InstagramIcon style={{ fontSize: "40px" }} />
              </DesktopFooter.ColEdit>
            </Col>
          </Row>
          {/* <Row>
            <Col xs={12}>
              <DesktopFooter.ColEdit>
                <Container>
                  <StyledTextField
                    id="margin-dense"
                    placeholder={i18n._(t`Enter Your Email Address`)}
                    margin="none"
                  />
                  <SubscribeButton>
                    <h2>{i18n._(t`Subscribe`)}</h2>
                  </SubscribeButton>
                </Container>
              </DesktopFooter.ColEdit>
            </Col>
          </Row> */}
          <DesktopFooter.InfoRow>
            <DesktopFooter.ColEdit xs={6}>
              <h2>
                {i18n._(
                  t`Copyright © 2020 GREEN TREE NURSERY All Rights Reserved.`
                )}
              </h2>
            </DesktopFooter.ColEdit>
          </DesktopFooter.InfoRow>
          <Row>
            <Col xs={12}>
              <DesktopFooter.ColEdit>
                <Link
                  underline={"always"}
                  href="#"
                  color="inherit"
                  onClick={preventDefault}
                >
                  <h2>{i18n._(t`Privacy Policy`)}</h2>
                </Link>
              </DesktopFooter.ColEdit>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <DesktopFooter.ColEdit>
                <Link
                  underline={"always"}
                  href="#"
                  color="inherit"
                  onClick={preventDefault}
                >
                  <h2>{i18n._(t`Terms of Use`)}</h2>
                </Link>
              </DesktopFooter.ColEdit>
            </Col>
          </Row>
        </DesktopFooter.Container>
      )}
    </I18n>
  );
};

export default withRouter(Footer);
