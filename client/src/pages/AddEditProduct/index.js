import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import TextBox from "./textBox";
import PersonIcon from "@material-ui/icons/Person";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
import { Row, Col, Grid } from "react-flexbox-grid";
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
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import EditorToolbar, { modules, formats } from "./quillTollbar";

const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(0),
      width: "100%",
      padding: "0",
    },
  })
);

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
  input {
    line-break:anywhere;
    font: revert;
  }

.MuiSelect-selectMenu {
    padding:"0px";
}
  
  
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
    margin-top:20px;
    margin-bottom:20px;
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
        max-height: 300px;
        overflow: hidden;
      }
   
    }
  `}
`;
const ActionBottomButtonContainer = styled(Col)`
  ${({ theme }) => `
    justify-content: flex-end;
    align-items: center;
    border: 1px solid #F36D12;
    color:#F36D12;
    border-radius: 5px;
    margin:0px;
    .home {
        border: 1px solid #6E9F21;
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

const Container = styled(Grid)`
  ${({ theme }) => `
  width:90%;
  display:flex;
  flex-direction:column;
  align-items:center;
`}
`;

const Board = (props) => {
  const [id, setId] = useState("");
  const [productIdState, setProductId] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [images, setImages] = useState([]);
  const productDescrtopAndnameObj = {
    arabic: {
      nmae: "",
      description: "",
    },
    english: {
      nmae: "",
      description: "",
    },
    francias: {
      nmae: "",
      description: "",
    },
  };
  const [
    productDescrtopAndnameState,
    setProductDescrtopAndnameState,
  ] = useState(productDescrtopAndnameObj);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const setActive = (val) => {
    setId(val);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
const productId =(event) =>{
  setProductId(event);
  setProductUrl(`http://localhost:3000/product/view/${event}`)

}
  const handleChangeTextArabicBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      arabic: {
        description: event,
      },
    });
  };

  const handleChangeTextEnglishBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      english: {
        description: event,
      },
    });
  };

  const handleChangeFranciasTextBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      francias: {
        description: event,
      },
    });
  };

  const handleNameChange = (event) => {
    if (event.target.name === "arabic") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        arabic: {
          name: event.target.value,
        },
      });
    }
    if (event.target.name === "english") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        english: {
          name: event.target.value,
        },
      });
    }

    if (event.target.name === "francias") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        francias: {
          name: event.target.value,
        },
      });
    }
  };

  return (
    <I18n>
      <Container>
        <HeaderBottomMenu>
          <ActionHomeButtonContainer
            style={{
              width: "100%",
              minHeight: "500px",
              background: "#FFFFFF",
              padding: "15px",
            }}
            lg={2}
            md={2}
            sm={2}
          >
            <Images onChange={onChange} images={images} />
          </ActionHomeButtonContainer>
          <ActionButtonContainer
            lg={6}
            md={6}
            sm={6}
            style={{
              maxHeight: "500px",
              overflow: "auto",
              padding: "20px",
              paddingTop: "0px",
            }}
          >
            <TextBox
              id="1"
              show={true}
              setActive={setActive}
              mount={id == "1" ? true : false}
              name={"عربي"}
              EventName={"arabic"}
              handleChange={handleChangeTextArabicBox}
              handleNameChange={handleNameChange}
            />
            <div style={{ marginTop: "30px" }}>
              <TextBox
                id="2"
                show={true}
                setActive={setActive}
                mount={id == "2" ? true : false}
                name={"English"}
                EventName={"english"}
                handleNameChange={handleNameChange}
                handleChange={handleChangeTextEnglishBox}
              />
            </div>
            <div style={{ marginTop: "30px" }}>
              <TextBox
                id="3"
                show={true}
                setActive={setActive}
                mount={id == "3" ? true : false}
                name={"Francias"}
                EventName={"francias"}
                handleNameChange={handleNameChange}
                handleChange={handleChangeFranciasTextBox}
              />
            </div>
            <Button
              style={{
                marginTop: "5px",
                marginBottom: "15px",
                color: "#FFFFFF",
                border: "1px solid #6E9F21",
                background: "#6E9F21",
                marginRight: "20px",
              }}
            >
              Save
            </Button>
            <Button
              style={{
                marginTop: "5px",
                marginBottom: "15px",
                border: "1px solid red",
              }}
            >
              Cancel
            </Button>
          </ActionButtonContainer>

          <ActionButtonContainer
            lg={3}
            md={3}
            sm={3}
            style={{
              padding: "15px",
              minHeight: "500px",
              width: "100%",
              background: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="p" variant="caption">
              Product ID
            </Typography>
            <SearchButton>
              <Input
                style={{
                  width: "100%",
                  margin: "10px",
                }}
                value={productIdState}
                disableUnderline={true}
                placeholder="Enter  Product Name"
                onChange={(event) => productId(event.target.value)}
               
              />
            </SearchButton>
            <Typography
              style={{ marginTop: "40px" }}
              component="p"
              variant="caption"
            >
              Product Url
            </Typography>
            <SearchButton
              style={{
                height: "50px",
                lineBreak:"anywhere"
              }}
            >
              <Input
                style={{
                  width: "100%",
                  margin: "10px",
                  lineBreak:"anywhere"
                }}
                disableUnderline={true}
                value={productUrl}
                readOnly={true}
              />
            </SearchButton>
            <CopyToClipboard text={productUrl}>
              <Button style={{ marginTop: "5px", border: "1px solid #6E9F21" }}>
                Copy Url
              </Button>
            </CopyToClipboard>
            <Typography
              style={{ marginTop: "40px" }}
              component="p"
              variant="caption"
            >
              Product Code
            </Typography>
            <SearchButton>
              <FormControl className={classes.formControl}>
                {!age && (
                  <InputLabel shrink id="demo-simple-select-disabled-label">
                    Select Code Type
                  </InputLabel>
                )}
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={age}
                  onChange={handleChange}
                  disableUnderline={true}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </SearchButton>
            <Button style={{ marginTop: "5px", border: "1px solid #6E9F21" }}>
              Generate Code
            </Button>
          </ActionButtonContainer>
        </HeaderBottomMenu>
      </Container>
    </I18n>
  );
};

export default withRouter(Board);
