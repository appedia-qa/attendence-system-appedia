import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Typography } from "@material-ui/core";
import { Row, Col } from "react-flexbox-grid";

const Container = styled(Row)`
  ${({ visible }) => `
/*    display: ${visible ? `flex` : `none`}; */
    flex: 1;
    background: white;
    position: absolute;
    top: 30px;
    right: 0;
    z-index:3;
    padding: 10px 20px;
    flex-wrap: nowrap;
  `}
`;

const MenuItemContainer = styled(Row)`
  ${({ theme }) => `
    margin: 0;
    display: flex;
    width: 200px;
    margin-bottom: 10px;

    .arrowContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 18px;

      svg { 
        height: 9px;
        width: auto;
      }
    }

    p {
      font-size: 12px;
      color: ${theme.palette.blue[600]};
      margin-left: 8px;
      max-width: 180px;
    }
  `}
`;

const MenuItem = (props) => {
  return (
    <MenuItemContainer>
      <div className="arrowContainer">
        <ArrowForwardIosIcon />
      </div>
      <Typography component="p">{props.title}</Typography>
    </MenuItemContainer>
  );
};

const ServiceDropdownMenu = (props) => {
  const node = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (node && node.current) {
      if (!node.current.contains(e.target)){
        props.handleServicesMenu(false);
      }
    }
  };
  return (
    <div
      ref={node}
    >
      <Container>
        <Col xs={6}>
          <MenuItem title="Our Fertilizers" />
          <MenuItem title="Our Fertilizers" />
          <MenuItem title="Our Fertilizers" />
          <MenuItem title="Our Fertilizers" />
        </Col>
        <Col xs={6}>
          <MenuItem title="Design and implementation of irragation system" />
          <MenuItem title="Our Fertilizers" />
          <MenuItem title="Our Fertilizers" />
        </Col>
      </Container>
    </div>
  );
};

export default ServiceDropdownMenu;
