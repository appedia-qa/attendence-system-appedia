import React, { useEffect } from "react";
import styled from "styled-components";
import { Row } from "react-flexbox-grid";
import { Typography, Divider } from "@material-ui/core";
import { ReactComponent as PhoneCall } from "../../../assets/icons/phone-call.svg";
import { ReactComponent as MapPin } from "../../../assets/icons/map-pin.svg";
import { ReactComponent as Mail } from "../../../assets/icons/mail.svg";
import { ReactComponent as Clock } from "../../../assets/icons/clock.svg";
import Modal from '@material-ui/core/Modal';
import Axios from "axios";
import { apiUrl } from "../../../constants/urls";
import { useState } from "react";
import Image from "../../../components/Image";
import { validateImageURL } from "../../../utils/image";

const Container = styled.div`
  ${({ theme, width }) => `
    position: absolute;
    width: ${width * 0.16 * 4.8}px;
    background:white;
    top: 30%;
    left: 10%;
    box-shadow: 0px 3px 40px #00000029;
    padding: 17px 15px 17px;
  `}
`;

const TitleWithIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
  svg {
    height: 15px;
    width: auto;
    background-color:white;
    fill: white;
    path, circle {
      background-color:white;
      fill: white;
    }
  }
  h5 {
    margin-left: 5px;
    font-weight: 500;
    font-size: 10px;
  }
  p {
    font-weight:300;
    font-size: 10px;
    margin-left: 5px;
  }

  .hover {
    max-width: 40px;
  }
  img {
    width: 25px;
    height: 25px;
    margin-left:5px;
  }
`;

const MallNameContainer = styled.div`
  ${({ theme }) => `
    height: 25px;
    border-radius: 21px;
    border: 1px solid ${theme.palette.brown.main};
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
  `}
`;

const StyledInfoRow = styled(Row)`
  align-items: center;
  margin: 0;
  justify-content: space-evenly;
  margin-bottom: 10px;
`;

const ShopsRow = styled(Row)`
  margin-top: 24px;
  justify-content: space-evenly;
`

const ShopCardContainer = styled.div`
  ${({ theme, width }) => `
    width: ${width * .18}px;
    height: ${(width * .18 * .74) }px;
    max-width: 252px;
    max-height: 187px;

    background-color: ${theme.palette.white[300]};
    margin-right: 5px;
    margin-left: 5px;
    margin-bottom: 10px;

    .visit-shop-container {
      width: 100%;
      height: ${(width * .18 * .54)}px;
      max-height: 136px;
      display:flex;
      justify-content:center;
      align-items:center;
      img {
        height: 80%;
        width: 80%;
        object-fit: contain;
      }
    }
    .visit-shop-button {
      cursor: pointer;
      height: ${(width * .18 * .20) }px;
      max-height: 50px;

      font-size: ${(width * .18 * .10) > 20 ? 20: (width * .18 * .10) }px;
      font-weight: 500;
      color: white;
      background-color: ${theme.palette.primary.main};
      display:flex;
      align-items: center;
      justify-content: center;
    }
  `}
`;
 
const EmptyShop = styled.h1`
  
`

const ShopCard = (props) => {
  return (
    <ShopCardContainer width={props.width} onClick={() => props.history.push(`shops/${props.item.id}`)}>
      <div className="visit-shop-container">
        <Image src={validateImageURL(props.item.image_url)} />
      </div>
      <div class="visit-shop-button">Visit Shop</div>
    </ShopCardContainer>
  )
}

const MallDetailCard = props => {

  return props.open ? (
    <Modal 
      open={props.open}
      onClose={props.handleDialogClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      style={{zIndex:"4"}}
    >
    <Container width={props.width}>
      <StyledInfoRow>
        <MallNameContainer>
          <Typography component="p">{props.item?.name || "No Name"}</Typography>
        </MallNameContainer>
        <TitleWithIcon>
          <PhoneCall />
          <Typography component="h5">Support</Typography>
          <Typography component="p">{props.item?.phone || 'No Phone'}</Typography>
        </TitleWithIcon>
        <TitleWithIcon>
          <Clock />
          <Typography component="h5">Opening Time</Typography>
          <Typography component="p">{props.item?.timing || 'Not specified'}</Typography>
        </TitleWithIcon>
        <TitleWithIcon>
          <Mail />
          <Typography component="h5">Email:</Typography>
          <Typography component="p">{props.item?.email || 'No Email'} </Typography>
        </TitleWithIcon>
        {/* <TitleWithIcon>
          <MapPin />
          <Typography component="p" className="hover">Hover to scan</Typography>
          <img src="https://www.qrcode-monkey.com/img/default-preview-qr.svg" />
        </TitleWithIcon> */}
      </StyledInfoRow>
      <Divider />
      <ShopsRow>
        {props.item && props.item.shops && props.item.shops.length > 0 ? 
          props.item.shops.map(shop => <ShopCard item={shop} history={props.history} width={props.width}/>) : <EmptyShop>No Shop registered</EmptyShop>
        }
      </ShopsRow>
    </Container>
    </Modal>
  ) : null;
};

export default MallDetailCard;
