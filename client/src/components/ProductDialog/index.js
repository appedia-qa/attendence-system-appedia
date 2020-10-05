import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Modal from "@material-ui/core/Modal";
import styled from "styled-components";
import { withRouter } from "react-router";
import { Typography, Button, IconButton, Input } from "@material-ui/core";
import ProductCarousel from "../../components/ProductCarousel";
import { Col, Row } from "react-flexbox-grid";
import { useDispatch, useSelector } from "react-redux";
import { addItemIntoCart } from "../../redux/actions/cart.action";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ReactComponent as MinimizeIcon } from "../../assets/icons/minimize-2.svg";
import LoaderComponent from "../LoaderComponent";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  decrementItemInCart,
  incrementItemInCart,
  deleteItemFromCart,
} from "../../redux/actions/cart.action";
import {
  addItemIntoWishList,
  deleteItemFromWishList,
} from "../../redux/actions/wishList.action";
import { closeProductDialog } from "../../redux/actions/productDialog.action";
import { useEffect } from "react";
import Image from "../Image";
var PrintTemplate = require("react-print");

const Container = styled.div`
  ${({ theme, width }) => `
    // position: absolute;
    outline: none;
    max-width: 300px;
    background:white;
    margin: 0 auto;
    box-shadow: 0px 3px 40px #00000029;
    padding: 20px 20px;
    margin-top: 100px;
    max-height: 70%;

    ${theme.breakpoints.down("sm")} {
      margin-top: 50px;
      padding: 20px 20px;
      h2 {
        text-align: center !important;
        margin-top: 20px;
        
      }
    }
    position: relative;
    border-radius: 20px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 0px;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
}
/* Optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: #FF0000;
}
   
  `}
`;

const CloseButton = styled.div`
  ${({ theme }) => `
    background-color: ${theme.palette.red.main};
    position: absolute;
    right: 0;
    top: 0;
    height: 46px;
    width: 52px;
    border-radius: 0 20px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      height: 20px;
      width: auto;
    }
  `}
`;

const Header = styled.div`
  ${({ theme }) => `
    margin: 10px 23px 20px;
    padding-bottom: 10px;
    border-bottom: 1px ${theme.palette.lightGray[300]} solid;
  `}
`;

const DetailContainer = styled.div`
  ${({ theme }) => `
    h2 {
      font-size: 29px;
      color: ${theme.palette.primaryTextColor.main}; 
      margin-bottom: 30px;
    }

    p {
      font-size: 16px;
      font-weight: 300;
      color: ${theme.palette.disabledText.main};
      margin-bottom: 40px;
    }

    .textBox {
      padding: 5% 2%;
      flex: 1;
    }
  `}
`;

const AdditionalInfoContainer = styled.div`
  ${({ theme }) => `

    h2 {
      font-size: 29px;
      color: ${theme.palette.primary[800]};
      text-align:right;
    }
    button:not(.MuiIconButton-root) {
      margin: 10px 0;
      border-radius: 0;
      font-size: 17px;
      ${theme.breakpoints.down("sm")} {
        font-size: 13px;
      }
      height: 47px;
      width: 100%;
    }

    .goToShopping {
      border: 2px solid ${theme.palette.blue[500]};
      border-radius: 0;
    }

    .addToCart {
      color: white;
      svg {
        margin-left: 15px;
      }
    }
  `}
`;

const ActionContainer = styled.div`
  margin-top: 50px;
`;

const TransparentButton = styled.div`
  ${({ theme }) => `
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
    
    button {
      padding: 0;
    }
    svg {
      height: 18px;
      width: auto;
      fill: ${theme.palette.secondary.main}
    }

    p {
      font-size: 12px;
      margin-left: 20px;
    }

    svg.unfilled path{
      fill: ${theme.palette.disabledText.main}
    }
  `}
`;

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  ${({ theme }) => `
  img{
    width: 100%;
  }
  input {
    line-break:anywhere;
    font: revert;
  }
 
  `}
`;

function areEqual(prevProps, nextProps) {
  console.log(prevProps, nextProps);
  if (prevProps.isDialogOpen == nextProps.isDialogOpen) {
    return true;
  }
  return false;
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}

const ProductDialog = (props, prop2) => {
  let product = {};
  const dispatch = useDispatch();
  const [render, noRender] = useState(false);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const componentRef = useRef();

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    print();
  };

  useEffect(() => {
    if (width || height) {
      noRender(true);
    }
  }, [[width, height]]);

  const handleEditWidth = (value) => {
    setWidth(value);
  };

  const handleEditHeight = (value) => {
    setHeight(value);
  };

  const closeDialouge = () => {
    props.closeProductDialog();
    noRender(false);
    setHeight("");
    setWidth("");
  };

  return props.isDialogOpen ? (
    <I18n>
      {({ i18n }) => (
        <Modal
          open={props.isDialogOpen}
          onClose={() => props.closeProductDialog()}
          style={{ overflow: "scroll", zIndex: "4", border: "none" }}
        >
          <Container>
            <DivContainer
              style={{ width: `${width}px`, height: `${height}px` }}
              ref={componentRef}
            >
              <Image
                id="page-main"
                src="https://www.qrcode-monkey.com/img/default-preview-qr.svg"
              />
            </DivContainer>

            {/* <DivContainer style={{ marginBottom: "10px" }}>
              <Input
                style={{
                  width: "100%",
                  marginLeft: "25px",
                  marginRight: "25px",
                  border: "1px solid #707070",
                  borderRadius: "5px",
                }}
                disableUnderline={true}
                placeholder="W (Width) mm"
                onChange={(event) => handleEditWidth(event.target.value)}
              />
              <Input
                style={{
                  width: "100%",
                  marginLeft: "25px",
                  marginRight: "25px",
                  border: "1px solid #707070",
                  borderRadius: "5px",
                }}
                disableUnderline={true}
                placeholder="H (Height) mm"
                onChange={(event) => handleEditHeight(event.target.value)}
              />
            </DivContainer> */}
            <DivContainer style={{ justifyContent: "space-around" }}>
              <Button
                style={{
                  background: "#6E9F21",
                  color: "#FFFFFF",
                  width: "100px",
                }}
                onClick={handlePrint}
              >
                {i18n._(t`Print`)}
              </Button>
              <Button
                onClick={() => closeDialouge()}
                style={{ border: "1px solid #707070", width: "100px" }}
              >
                {i18n._(t`Cancel`)}
              </Button>
            </DivContainer>
          </Container>
        </Modal>
      )}
    </I18n>
  ) : null;
};

export default React.memo(ProductDialog, areEqual);
