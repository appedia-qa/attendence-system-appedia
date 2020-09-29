import React from "react";
import { ReactComponent as HouseLogo } from "../../assets/icons/HousemallLogoHZ.svg";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import InstagramIcon from "@material-ui/icons/Instagram";
import Link from "@material-ui/core/Link";
import { Input } from "@material-ui/core";
import Breakpoints from "../../constants/Breakpoints";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { ReactComponent as ShopSVG } from "../../assets/icons/shop.svg";
import { withRouter } from "react-router";
import { Button, Badge, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Typography } from "@material-ui/core";
import { ReactComponent as AppleSVG } from "../../assets/icons/apple.svg";
import { ReactComponent as PlayIcon } from "../../assets/icons/Get-it-on-Google-play.svg";
import { ReactComponent as FBSVG } from "../../assets/icons/facebook.svg";
import { ReactComponent as FooterIcon } from "../../assets/images/footerIcon.svg";
import { ReactComponent as InstaSVG } from "../../assets/icons/insta.svg";
import { ReactComponent as TwitterIcon } from "../../assets/icons/twitter.svg";
import { Row, Col } from "react-flexbox-grid";
import COMPANY_CONSTANTS from "../../constants/company";
import EmailSubscribe from "../EmailSubscribe";
import * as DesktopFooter from "./styles";
import { FooterMobileContainer } from "./styles.mobile";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import TelegramIcon from "@material-ui/icons/Telegram";
import { TextField } from "@material-ui/core";
import MobileFooter from "./mobile-footer";
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
  ${({ theme }) => `
    max-height: 42px;
    width: 100%;
    border-radius: 5px;
    display: flex;
  `}
`;

const Line = styled.div`
  margin-bottom: 41px;
  width: 100%;
  border-top: 1px solid #f5f8fc;
`;

const StyledTextField = styled(Input)`
  padding-left: 10px;
  border: 1px solid gray;
  margin-right: 5px;

  padding-right: 10px;
  background-color: white;
  input {
    width: 250px;
    text-color: black;
    color: black;
    font-size: 12px;
    border: none;
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

  return props.width > Breakpoints.SM_MAX ? (
    <I18n>
      {({ i18n }) => (
        <DesktopFooter.Container>
          <Row style={{ display: "flex", flexDirection: "row" }}>
            <Col md={2}>
              <DesktopFooter.SvgContainer>
                <FooterIcon />
              </DesktopFooter.SvgContainer>
            </Col>
            <Col md={6}>
              <Row>
                <Col xs={12} md={5}>
                  <DesktopFooter.BrandContainer>
                    <Typography className={classes.root} component="h1">
                      {i18n._(t`About US`)}
                    </Typography>
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                        </h1>
                        <Link
                          href=""
                          color="inherit"
                          onClick={() => {
                            props.history.push("/about-us");
                          }}
                        >
                          <h2>{i18n._(t`Who we are `)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography>
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />{" "}
                        </h1>
                        <Link
                          href=""
                          color="inherit"
                          onClick={() => {
                            props.history.push("/contact-us");
                          }}
                        >
                          <h2>{i18n._(t`Contact Us`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography>
                    {/* <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1> <ArrowForwardIosIcon style={{ fontSize: '12px' }} /> </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t`Careers`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography> */}
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                        </h1>
                        <Link
                          href=""
                          color="inherit"
                          onClick={() => {
                            props.history.push("/our-services");
                          }}
                        >
                          <h2>{i18n._(t`Our Services`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography>
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          <ArrowForwardIosIcon style={{ fontSize: "12px" }} />
                        </h1>
                        <Link
                          href=""
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

                <Col xs={12} md={5}>
                  <DesktopFooter.BrandContainer>
                    <Typography className={classes.root} component="h1">
                      {i18n._(t`Help & Support`)}
                    </Typography>
                    {/* <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1> <ArrowForwardIosIcon style={{ fontSize: '12px' }} /> </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t`Payment Methods`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography> */}
                    {/* <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1> <ArrowForwardIosIcon style={{ fontSize: '12px' }} /> </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t`Order Information`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography> */}
                    {/* <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1> <ArrowForwardIosIcon style={{ fontSize: '12px' }} /> </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t` Shipping & Delivery  `)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography> */}
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          {" "}
                          <ArrowForwardIosIcon
                            style={{ fontSize: "12px" }}
                          />{" "}
                        </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t`Return Policy`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography>
                    <Typography className={classes.root} component="h1">
                      <DesktopFooter.DivContainer>
                        <h1>
                          {" "}
                          <ArrowForwardIosIcon
                            style={{ fontSize: "12px" }}
                          />{" "}
                        </h1>
                        <Link href="#" color="inherit" onClick={preventDefault}>
                          <h2>{i18n._(t`After-Sales Service Policies`)}</h2>
                        </Link>
                      </DesktopFooter.DivContainer>
                    </Typography>
                  </DesktopFooter.BrandContainer>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <div>
                <DesktopFooter.BrandContainer>
                  <Typography className={classes.root} component="h1">
                    {i18n._(t`Connect With Us`)}
                  </Typography>
                  <InstagramIcon />
                </DesktopFooter.BrandContainer>
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "17px" }}>
            <Col md={2}></Col>
            <Col md={10}>
              <Row style={{ justifyContent: "space-between" }}>
                {/* <div>
                  <Container>
                    <StyledTextField
                      disableUnderline={true}
                      id="margin-dense"
                      placeholder={i18n._(t`Enter Your Email Address`)}
                      margin="none"
                    />
                    <SubscribeButton>
                      <h2>{i18n._(t`Subscribe`)}</h2>
                    </SubscribeButton>
                  </Container>
                </div> */}
              </Row>
            </Col>
          </Row>
          <Line style={{ marginTop: "41px" }} />
          <Row>
            <Col md={8}>
              <DesktopFooter.DivContainer>
                {" "}
                <h2>
                  {i18n._(
                    t`Copyright © 2020 GREEN TREE NURSERY All Rights Reserved.`
                  )}
                </h2>
              </DesktopFooter.DivContainer>
            </Col>
            <Col md={4}>
              <DesktopFooter.footer>
                <Row>
                  <Col md={4}>
                    <Link href="#" color="inherit" onClick={preventDefault}>
                      <h2>{i18n._(t`Privacy Policy`)}</h2>
                    </Link>
                  </Col>
                  <Col md={4}>
                    <Link href="#" color="inherit" onClick={preventDefault}>
                      <h2>{i18n._(t`Terms of Use`)}</h2>
                    </Link>
                  </Col>
                </Row>
              </DesktopFooter.footer>
            </Col>

            <Col></Col>
          </Row>
        </DesktopFooter.Container>
      )}
    </I18n>
  ) : (
    <MobileFooter />
  );
};

export default withRouter(Footer);
