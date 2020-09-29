import React, { Component, Fragment, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { ReactComponent as NoCards } from '../../assets/icons/no-cards.svg';
import { ReactComponent as MasterCard } from '../../assets/icons/master-card.svg';
import { ReactComponent as VisaCard } from '../../assets/icons/visa-card1.svg';
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControl from '@material-ui/core/FormControl';
import { t, Trans } from "@lingui/macro";
import { I18n } from "@lingui/react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardEditDialog from "../../components/EditUserCardDetail";
import { useSelector } from "react-redux";

const NoCardSection = styled.div`
${({ theme, width }) => `
  border: 1px solid #97979724;
  padding-top: 5px;
  padding-bottom: 30px;
  .logo-section {
    margin-left:37%;
    margin-top: 40px;
    h1 {
      margin-top: 14px;
      margin-left: 25px;
      margin-bottom: 24px;
      font-size: 18px;
      font-weight: 500;
      color: #191919
    }
  }
  .card-info {
    margin-left: 20px;
    h1 {
      font-size: 22px;
      font-weight: 400;
      color: #191919;
      margin-bottom: 0px;
    }
    h2 {
      font-size: 15px;
      font-weight: 300;
      color: #191919;
      margin-top: 8px;
    }
  }
`}
`;

const CardSection = styled.div`
${({ theme, width }) => `
  border: 1px solid #97979724;
  padding-top: 5px;
  padding-bottom: 30px;
  h1 {
    margin-top: 14px;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 24px;
    font-size: 18px;
    font-weight: 500;
    color: #191919
  }
  .card-number h3 {
    margin-right: -5px;
  }
`}
`;

const CardContainer = styled(Row)`
${({ theme, width }) => `
  height: auto;
  ${width < 576 ?
      `width: 100%;
     margin-left: 0;
     margin-right: 0;`
      :
      `width: 90%;
     margin-left: 5%;
     margin-right: 5%;`
    }
  margin-bottom: 20px;
  padding: 15px 10px;
  border: 1px solid #BABABA;
  h2 {
    font-size: 13px;
    font-weight: bold;
    color: #2B2B2B;
    margin-left: 10px;
  }
  h3 {
    font-size: 13px;
    font-weight: 500;
    color: #656565;
    margin-left: 5px;
    ${width < 360 ?
      `white-space: normal;` : `white-space: nowrap;`
    }
  }
  button {
    margin-top: 3px;
    border-radius: 35px;
    width: 80px;
    height: 35px;
    background: black;
    color: white;
    border: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  .card-type {
    display: flex;
  }
  .card-logo {
    margin-top: 5px;
    margin-left: 10px;
    .a {
      fill: #eb001b;
      stroke: none;
    }
    .b {
      fill: #ff5e00;
      opacity: 1;
    }
    .c {
      fill: #f79e1c;
    }

  }
  .col-lg-3 {
    margin-left: 0px;
    margin-right: 0px;
  }
  .MuiTypography-body1 {
    font-size: 14px;
  }
`}
`;


const MyCards = (props) => {

  let user = null;
  const authentication = useSelector((state) => state.authentication);
  user = authentication.user;
 
  
  const [updateCard, setUpdateCard] = useState(false);

  const handelCardEdit = () => {
    setUpdateCard(true);
  }

  const handleUserDialogClose = () => {
    setUpdateCard(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  

  let addedCards = true;
  if (addedCards) {
    return (
      <I18n>
      {({ i18n }) => (
        <div>
      <CardSection>
        <h1>{i18n._(t`My Cards`)} </h1>
        <RadioGroup
          col
          aria-label="position"
          name="position"
          defaultValue="top"
        // onChange={event => this.handleRadioChange(event)} 
        >
          <CardContainer width={props.width}>
            <Col xs={6} lg={3}>
              <div class="card-type">
                <MasterCard class="card-logo" />
                <h2>{i18n._(t`Mastercard`)} </h2>
              </div>
            </Col>
            <Col className="card-number"xs={6} lg={3}>
              <h3>Debit **** **** **** 1234</h3>
            </Col>
            <Col className="default-check" xs={6} lg={4} >
              <FormControlLabel
                style={{ marginLeft: "17px",marginRight: "8px" }}
                id="radio-house"
                value="house"
                control={<Radio />}
                label="Set as Default"
                labelPlacement="start"
              />
            </Col>
            <Col xs={6} lg={2}>
              <button onClick={handelCardEdit}>{i18n._(t`UPDATE`)}</button>
            </Col>
          </CardContainer>
        </RadioGroup>
        <CardEditDialog
          open={updateCard}
          handleUserDialogClose={handleUserDialogClose}
          userId={user ? user.id : null}
          user={user}
        />
      </CardSection>
      </div>
      )}
    </I18n>
    );
  }


  return (
    <NoCardSection>
      <div className="card-info">
        <h1>My Cards</h1>
        <h2>Note: New payment methods can only be added during checkout due to verification requirements</h2>
      </div>
      <div className="logo-section">
        <NoCards />
        <h1>No Saved Cards</h1>
      </div>
    </NoCardSection>
  );
}

export default MyCards; 