import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Row, Col, Grid } from "react-flexbox-grid";
import { ReactComponent as NoFavorites } from "../../assets/icons/no-favourites.svg";
import { apiUrl, wishlist } from "../../constants/urls";
import appendQuery from "append-query";
import { useState, useEffect } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import ProductItemCard from "../../components/ProductItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemIntoWishList } from "../../redux/actions/wishList.action";
import CartItem from "../../components/CartItem";
import WishlistItemMobile from "../../components/WishlistItemMobile";
import WishlistItem from "../../components/WishlistItem";
import Breakpoints from "../../constants/Breakpoints";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const NoFavoriteSection = styled.div`
  ${({ theme, width }) => `
border: 1px solid #97979724;
padding-top: 7%;
padding-bottom: 30px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
  h1 {
    margin-top: 26px;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #191919
  }
  .start-shopping {
    height: 49px;
    width: 162px;
    background-color: ${theme.palette.secondary.main};
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border: none;
    margin-left: 12px;
  }
`}
`;
const FavoriteSection = styled.div`
  ${({ theme, width }) => `
  h1 {
    font-size:20px;
    font-weight:300px;
    margin-top: 8px;
    margin-bottom: 15px;
  }
`}
`;
const FavoriteGrid = styled(Row)`
  ${({ theme, width }) => `
margin-top: 15px;
padding-left: 0;
padding-right: 0;
justify-content: space-between;
`}
`;

export const FeaturedGrid = styled(Row)`
  .rkzEt {
    margin-right: 0px;
  }
`;

const MyFavorites = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const { wishListItems } = useSelector((state) => state.wishList);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (wishListItems && wishListItems.length > 0) {
    return (
      <I18n>
        {({ i18n }) => (
          <FavoriteSection>
            <h1 class="total-favorites">
              {i18n._(t`My Favourites`)} ({wishListItems.length} Items)
            </h1>
            <Grid>
              <FeaturedGrid>
                {wishListItems.map((item) => (
                  <Col xs={6} md={6} lg={6} xl={4} className="justify-center">
                    <ProductItemCard product={item} language={props.language} />
                  </Col>
                ))}
              </FeaturedGrid>
            </Grid>
          </FavoriteSection>
        )}
      </I18n>
    );
  }

  return (
    <I18n>
      {({ i18n }) => (
        <NoFavoriteSection>
          <NoFavorites />
          <h1>{i18n._(t`Your Wishlist is Empty`)}</h1>
          <button
            className="start-shopping"
            onClick={() => props.history.push("/")}
          >
            {i18n._(t`start shopping`)}
          </button>
        </NoFavoriteSection>
      )}
    </I18n>
  );
};

export default withRouter(MyFavorites);
