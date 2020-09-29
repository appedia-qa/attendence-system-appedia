import React from "react";
import styled from "styled-components";
import { ReactComponent as Brush } from "../../assets/icons/brush.svg";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";

const Container = styled.div`
  ${({ theme, selected }) => `
    height: 180px;
    width: 300px;
    cursor: pointer;
    background:${selected == true ? "#CBD5DB" : "#CBD5DB"};
    border: 1px solid #FFFFFF;
    display:flex;
    margin:5px;
    align-items: center;
    justify-content:center;
    flex-direction: column;

    .paragaph
    {
      color:black;
      margin-top: 10px;
      padding-left: 40px;
      padding-right: 40px;
      font-size:12px;
      text-align: center;
      color:black;
      font-weight:300;
    }
    .text{
      color:#4AB43A !important;
      margin-top: 10px;
      font-size:15px;
      text-align: center;
      color:black;
      font-weight:600;

    }
   
    
    svg {
      margin-top: 10px;
      width: 60px;
      height: 60px;
      @media only screen and (max-width: 600px){
        height: 40px;
        width: 40px;
      }
      // g .a{
      //   fill: ${selected == true ? "#4AB43A" : "#CBD5DB"};
      //   stroke: white;
      // }
    }
    svg path{
      fill: gray;
      stroke: gray;
    }
  
  `}
`;

const CategoryItem = (props) => {
  const translate = (handel, val) => {
    if (
      val === "Designing private home gardens, providing indoor trees for homes"
    ) {
      return handel._(
        t`Designing private home gardens, providing indoor trees for homes`
      );
    } else if (
      val ===
      "Working on its gardens, designing, constructing, and performing the necessary periodic maintenance for it"
    ) {
      return handel._(
        t`Working on its gardens, designing, constructing, and performing the necessary periodic maintenance for it`
      );
    } else if (
      val === "Caring for crops and implementing designs for public streets"
    ) {
      return handel._(
        t`Caring for crops and implementing designs for public streets`
      );
    } else if (
      val ===
      "Working on its gardens, designing, constructing, and performing maintains periodic plantations for the embassies"
    ) {
      return handel._(
        t`Working on its gardens, designing, constructing, and performing maintains periodic plantations for the embassies`
      );
    } else if (
      val ===
      "we work in beautifying many ministries and companies, by designing and implementing agricultural areas"
    ) {
      return handel._(
        t`we work in beautifying many ministries and companies, by designing and implementing agricultural areas`
      );
    } else if (val === "Sell Agricultural Pots & Tools") {
      return handel._(t`Sell Agricultural Pots & Tools`);
    } else if (val === "Design and implementation of irrigation networks.") {
      return handel._(t`Design and implementation of irrigation networks.`);
    }
  };

  const translateText = (handel, val) => {
    if (val === "Individuals") {
      return handel._(t`Individuals`);
    } else if (val === "Residential compounds") {
      return handel._(t`Residential compounds`);
    } else if (val === "Ministries and companies") {
      return handel._(t`Ministries and companies`);
    } else if (val === "Public Places") {
      return handel._(t`Public Places`);
    } else if (val === "Embassies") {
      return handel._(t`Embassies`);
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
          <div className="text" selected={props.selected}>
            {translateText(i18n, props.item.text)}
          </div>
          <div className="paragaph" selected={props.selected}>
            {translate(i18n, props.item.p)}
          </div>
        </Container>
      )}
    </I18n>
  );
};

export default CategoryItem;
