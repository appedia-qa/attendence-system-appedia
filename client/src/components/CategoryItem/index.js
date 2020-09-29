import React from "react";
import styled from "styled-components";
import { ReactComponent as Brush } from "../../assets/icons/brush.svg";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const Container = styled.div`
  ${({ theme, selected }) => `
    height: 140px;
    width: 140px;
    cursor: pointer;
    background:${selected == true ? "#4AB43A" : "#707070"};
    border: 1px solid #FFFFFF;
    display:flex;
    align-items: center;
    justify-content:center;
    flex-direction: column;

    .paragaph
    {
      padding:5px;
      margin-top: 10px;
      font-size:12px;
      text-align: center;
      color:white;
      font-weight:300;
    }
    @media only screen and (max-width: 600px){
      height: 100px;
      width: 100px;
      margin-bottom:10px;
      .paragaph{
      font-size:10px;
      text-align: center;
      color:white;
      font-weight:400;
    }
    }
    
    svg {
      margin-top: 10px;
      width: 60px;
      height: 60px;
      @media only screen and (max-width: 600px){
        height: 40px;
        width: 40px;
      }
      g .a{
        fill: ${selected == true ?  "#4AB43A" : "#707070"};
        stroke: white;
      }
    }
    svg path{
      fill: ${selected == true ?  "#4AB43A" : "#707070"};
      stroke: white;
    }
  
  `}
`;

const CategoryItem = (props) => {

  const translate = (handel, val) => {
    if (val === "Fertilizer Trading") {
      return handel._(t`Fertilizer Trading`);
    } else if (val === "Design and implementation of gardens") {
      return handel._(t`Design and implementation of gardens`);
    } else if (val === "Flowers Arrangement") {
      return handel._(t`Flowers Arrangement`);
    } else if (val === "Sell Agricultural Pots & Tools") {
      return handel._(t`Sell Agricultural Pots & Tools`);
    } else if (val === "Periodic maintenance of public and private agricultural gardens.") {
      return handel._(t`Periodic maintenance of public and private agricultural gardens.`);
    } else if (val === "Sell Agricultural Pots & Tools") {
      return handel._(t`Sell Agricultural Pots & Tools`);
    } else if (val === "Design and implementation of irrigation networks.") {
      return handel._(t`Design and implementation of irrigation networks.`);
    }
  };

  return (
    <I18n>
      {({ i18n }) => (
          <Container
            selected={props.selected}
            onClick={() => props.handleCategoryChange(props.item)}
          >
            <props.item.active /> 
            <div className="paragaph" selected={props.selected}>
              {translate(i18n, props.item.p)}
            </div>
          </Container>
      )}
    </I18n>
  );
};

export default CategoryItem;
