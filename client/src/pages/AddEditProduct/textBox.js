import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import EditorToolbar, { modules, formats } from "./quillTollbar";
import PersonIcon from "@material-ui/icons/Person";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
import { Row, Col, Grid } from "react-flexbox-grid";
import { useState } from "react";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as Sign } from "../../assets/icons/sign.svg";
import SearchIcon from "@material-ui/icons/Search";
import Images from "./imageUpload";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  ENGLISH_LANGUAGE,
  ARABIC_LANGUAGE,
  CURRENT_LANGUAGE_KEY,
} from "../../constants";
import { emptyCartRequest } from "../../redux/actions/cart.action";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const SearchButton = styled.div`
  ${({ theme }) => `
  
  border-radius: 2px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin:0px;
  border: 1px solid #BAB8B8;
<<<<<<< HEAD
  input {
    line-break:anywhere;
    font: revert;
  }
=======
>>>>>>> 66f67345fd7ff65f432bc08ea868cf4a5e073c03
  
  
`}
`;

const StyleButton = styled(Button)`
  ${({ theme }) => `
  
  border-radius: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 9px 12px;
  margin:0px;
  
  
`}
`;
const HeaderBottomMenu = styled(Row)`
  ${({ theme }) => `
    dispaly:flex;
    margin-top:100px;
    justify-content:space-between;
    width: 100%;

    [class^="col-"], [class*=" col-"] {
      height: 100%;
    }
  `}
`;

const HeaderImg = styled.div`
  ${({ theme }) => `
  cursor:pointer;

    svg{
      width:15px;
      height:15px;
      path {
        stroke: white;
        fill: white;
      }
    }

  `}
`;

const ActionButtonContainer = styled(Col)`
  ${({ theme }) => `
    
    border-radius: 5px;
    margin:0px;
    background:#FFFFF;
    .ql-editor{
        min-height: 170px !important;
       
      }
   
    }
  `}
`;
const ActionBottomButtonContainer = styled(Col)`
  ${({ theme }) => `
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #BAB8B8;
    color:#F36D12;
    border-radius: 5px;
    margin:0px;
    .home {
        border: 1px solid #BAB8B8;
        color:#6E9F21;
        svg{
            path{
                stroke:#6E9F21;
                fill:#6E9F21;
            }
        }
    },
    svg{
        path{
            stroke:#F36D12;
            fill:#F36D12;
        }
    }
   
    }
  `}
`;

const ActionHomeButtonContainer = styled(Col)`
  ${({ theme }) => ` 
    }
  `}
`;

const TextBox = (props) => {
  return (
    <React.Fragment>
      <ActionButtonContainer
        style={{
          padding: "10px",
          width: "100%",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography component="p" variant="caption">
          Product Name({props.name})
        </Typography>
        <SearchButton>
          <Input
            style={{
              width: "100%",
              margin: "10px",
            }}
            name={props.EventName}
            disableUnderline={true}
            placeholder="Enter  Product Name"
            onChange={(event) => props.handleNameChange(event)}
            // onKeyUp={(event) => {
            //   handleSearch(props, searchText);
            // }}
          />
        </SearchButton>
      </ActionButtonContainer>
      <ActionButtonContainer
        style={{
          marginTop: "10px",
          width: "100%",
          padding: "10px",
          background: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          component="p"
          style={{
            marginTop: "30px",
          }}
          variant="caption"
        >
          Product Description({props.name})
        </Typography>
        {props.mount ? (
          <div className="text-editor">
            <EditorToolbar id={props.id} />
            <ReactQuill
              ref={props.ref}
              theme="snow"
              id={props.id}
              onChange={props.handleChange}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
              onFocus={() => props.setActive(props.id)}
            />
          </div>
        ) : (
          <div className="text-editor">
            <ReactQuill
              ref={props.ref}
              theme="snow"
              id={props.id}
              onChange={props.handleChange}
              placeholder={"Write something awesome..."}
              onFocus={() => props.setActive(props.id)}
            />
          </div>
        )}
      </ActionButtonContainer>
    </React.Fragment>
  );
};

export default withRouter(TextBox);
