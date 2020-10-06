import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Breakpoints from "../../constants/Breakpoints";
import { withRouter } from "react-router";
import TextBox from "./textBox";
import PersonIcon from "@material-ui/icons/Person";
import { CopyToClipboard } from "react-copy-to-clipboard";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import axios from "axios";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import { compose } from "redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { apiUrl } from "../../constants/urls";
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
import { getTokken } from "../../redux/reducers/authentication.reducer";
import { emptyCartRequest } from "../../redux/actions/cart.action";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";
var QRCode = require("qrcode.react");
const imageToBase64 = require("image-to-base64");

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

const QRCodeContainer = styled.div`
  margin-top: 24px;
  padding: 30px;
  border: 2px #707070 dashed;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  background-color: #f7f7f7;
  .qr-code {
    width: 80% !important;
    height: auto !important;
  }
`;

const Board = (props) => {
  const [id, setId] = useState("");
  const [isAdd, setAdd] = useState(null);
  const componentRef = useRef();
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [errorString, seterrorString] = useState(null);
  const productDescrtopAndnameObj = {
    productIdState: "",
    productUrl: "",
    images: [],
    arabic: {
      name: "",
      description: "",
    },
    english: {
      name: "",
      description: "",
    },
    francias: {
      name: "",
      description: "",
    },
  };
  const [
    productDescrtopAndnameState,
    setProductDescrtopAndnameState,
  ] = useState(productDescrtopAndnameObj);
  const dispatch = useDispatch();

  const print = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    if (productDescrtopAndnameState.productIdState) {
      print();
    } else {
      dispatch(
        props.addErrorItemInAlert({
          message: "Please enter product code",
        })
      );
    }
  };

  const papulateData = async (product_code) => {
    if (!product_code) {
      props.history.push("/");
    } else {
      const url = apiUrl + "/products/find";

      try {
        const { data, status } = await axios.post(url, { product_code });
        if (data && (status == 200 || status == 201)) {
          const arabicName =
            data.product_details &&
            data.product_details.ar &&
            data.product_details.ar.name
              ? data.product_details.ar.name
              : "";

          const arabicDiscription =
            data.product_details &&
            data.product_details.ar &&
            data.product_details.ar.description
              ? data.product_details.ar.description
              : "";

          const englishName =
            data.product_details &&
            data.product_details.eng &&
            data.product_details.eng.name
              ? data.product_details.eng.name
              : "";

          const englishDiscription =
            data.product_details &&
            data.product_details.eng &&
            data.product_details.eng.description
              ? data.product_details.eng.description
              : "";

          const frName =
            data.product_details &&
            data.product_details.fr &&
            data.product_details.fr.name
              ? data.product_details.fr.name
              : "";

          const frDiscription =
            data.product_details &&
            data.product_details.fr &&
            data.product_details.fr.description
              ? data.product_details.fr.description
              : "";
          const product_image = data.product_image ? data.product_image : "";
          console.log(data.product_code);
          setProductDescrtopAndnameState({
            ...productDescrtopAndnameState,
            productIdState: data.product_code ? data.product_code : "",
            productUrl: data.product_url ? data.product_url : "",
            images: [{ product_image, uploaded: true }],
            arabic: {
              ...productDescrtopAndnameState.arabic,
              name: arabicName,
              description: arabicDiscription,
            },
            english: {
              ...productDescrtopAndnameState.english,
              name: englishName,
              description: englishDiscription,
            },
            francias: {
              ...productDescrtopAndnameState.francias,
              name: frName,
              description: frDiscription,
            },
          });
        } else {
          dispatch(
            props.addErrorItemInAlert({
              message: "please try again latter",
            })
          );
        }
      } catch (e) {}

      //////change login whem images come in array

      // if (data) {
      //   data = data.map((item) => {
      //     return { ...item, selected: false };
      //   });
      //   setProductData(data);
      // }
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(props.location.search);
    const add = query.get("add-product");

    const tokken = getTokken();
    if (!tokken) {
      props.history.push("/login");
    }

    if (add) {
      setAdd(add);
    } else {
      setAdd(false);
      papulateData(props.match.params.id);
    }
  }, []);

  const onChange = (imageList, addUpdateIndex) => {
    imageList[addUpdateIndex] = {
      ...imageList[addUpdateIndex],
      updated: false,
    };
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      images: imageList,
    });
  };

  const setActive = (val) => {
    setId(val);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const productId = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      productIdState: event,
      productUrl: `http://localhost:3000/view/${event}`,
    });
  };

  const handleChangeTextArabicBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      arabic: {
        ...productDescrtopAndnameState.arabic,
        description: event,
      },
    });
  };

  const handleChangeTextEnglishBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      english: {
        ...productDescrtopAndnameState.english,
        description: event,
      },
    });
  };

  const handleChangeFranciasTextBox = (event) => {
    setProductDescrtopAndnameState({
      ...productDescrtopAndnameState,
      francias: {
        ...productDescrtopAndnameState.francias,
        description: event,
      },
    });
  };

  const handleNameChange = (event) => {
    if (event.target.name === "arabic") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        arabic: {
          ...productDescrtopAndnameState.arabic,
          name: event.target.value,
        },
      });
    }
    if (event.target.name === "english") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        english: {
          ...productDescrtopAndnameState.english,
          name: event.target.value,
        },
      });
    }

    if (event.target.name === "francias") {
      setProductDescrtopAndnameState({
        ...productDescrtopAndnameState,
        francias: {
          ...productDescrtopAndnameState.francias,
          name: event.target.value,
        },
      });
    }
  };

  const saveItem = async () => {
    const arabicValid = isProductDetailValid(
      productDescrtopAndnameState.arabic
    );
    const englishValid = isProductDetailValid(
      productDescrtopAndnameState.english
    );
    const frenchValid = isProductDetailValid(
      productDescrtopAndnameState.francias
    );
    const arbic = productDescrtopAndnameState.arabic;
    const english = productDescrtopAndnameState.english;
    const french = productDescrtopAndnameState.francias;

    if (!(arabicValid || englishValid || frenchValid)) {
      if (arabicValid) {
        dispatch(
          props.addErrorItemInAlert({
            message: "Please select one product to edit",
          })
        );
        // seterrorString("Fill both name and description for Arabic");
      } else if (englishValid) {
        dispatch(
          props.addErrorItemInAlert({
            message: "Fill both name and description for English",
          })
        );
        seterrorString("Fill both name and description for English");
      } else if (frenchValid) {
        dispatch(
          props.addErrorItemInAlert({
            message: "Fill both name and description for French",
          })
        );

        seterrorString("Fill both name and description for French");
      } else {
        dispatch(
          props.addErrorItemInAlert({
            message: "Fill both name and description for a language",
          })
        );
        seterrorString("Fill both name and description for a language");
      }
    }
    if (!productDescrtopAndnameState.productIdState) {
      dispatch(
        props.addErrorItemInAlert({
          message: "Please add product code",
        })
      );
      seterrorString("Please add product code");
    } else {
      const obj = {
        product_code: productDescrtopAndnameState.productIdState,
        product_details: {
          ar: {
            name: arbic && arbic.name ? arbic.name : "",
            description: arbic && arbic.description ? arbic.description : "",
          },
          eng: {
            name: english && english.name ? english.name : "",
            description:
              english && english.description ? english.description : "",
          },
          fr: {
            name: french && french.name ? french.name : "",
            description: french && french.description ? french.description : "",
          },
        },
        product_url: productDescrtopAndnameState.productUrl,
        product_image:
          "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
        product_category_id: "5f75b84ea456c4ef19049547",
      };
      seterrorString(null);

      // const tokken = getTokken();
      // const url = apiUrl + "/fileUpload";
      // const responceImg = await axios.post(url, {
      //   data: {
      //     file: images
      //   },
      //   headers: {
      //     Authorization: tokken,
      //   },
      // });
      const tokken = getTokken();
      if (isAdd) {
        try {
          const url = apiUrl + "/products/add";
          const responce = await axios.post(url, obj);
          if (responce.status == 200 || responce.status == 201) {
            props.history.push("/");
          } else {
            dispatch(
              props.addErrorItemInAlert({
                message: "Please add product code",
              })
            );
          }
        } catch (e) {}
      } else {
        try {
          const url = apiUrl + "/products/update";
          const responce = await axios.put(url, obj);
          if (responce.status == 200 || Response.staus == 201) {
            props.history.push("/");
          } else {
            dispatch(
              props.addErrorItemInAlert({
                message: "Please add product code",
              })
            );
          }
        } catch (e) {}
      }
    }
  };

  const isProductDetailValid = (item) => {
    if (
      item.name &&
      item.name.trim().length > 0 &&
      item.description &&
      item.description.trim().length > 0
    ) {
      return true;
    }

    return false;
  };

  return (
    <I18n>
      {({ i18n }) => (
        <Container>
          <HeaderBottomMenu>
            <ActionHomeButtonContainer
              style={{
                minWidth: "230px",
                minHeight: "500px",
                background: "#FFFFFF",
                padding: "15px",
              }}
              lg={2}
              md={2}
              sm={12}
            >
              <Images
                onChange={onChange}
                images={productDescrtopAndnameState.images}
              />
            </ActionHomeButtonContainer>
            <ActionButtonContainer
              lg={7}
              md={7}
              sm={12}
              style={{
                maxHeight: "500px",
                maxWidth: "606px",
                overflow: "auto",
                padding: "20px",
                paddingTop: "0px",
              }}
            >
              {errorString && <div>{errorString}</div>}
              <TextBox
                id="1"
                show={true}
                valueName={productDescrtopAndnameState.arabic.name}
                valueDescription={
                  productDescrtopAndnameState.arabic.description
                }
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
                  valueName={productDescrtopAndnameState.english.name}
                  valueDescription={
                    productDescrtopAndnameState.english.description
                  }
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
                  valueName={productDescrtopAndnameState.francias.name}
                  valueDescription={
                    productDescrtopAndnameState.francias.description
                  }
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
                onClick={saveItem}
              >
                {i18n._(t`Save`)}
              </Button>
              <Button
                style={{
                  marginTop: "5px",
                  marginBottom: "15px",
                  border: "1px solid red",
                }}
              >
                {i18n._(t`Cancel`)}
              </Button>
            </ActionButtonContainer>

            <ActionButtonContainer
              lg={2}
              md={2}
              sm={12}
              style={{
                padding: "15px",
                minHeight: "500px",
                minWidth: "230px",
                background: "#FFFFFF",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="p" variant="caption">
                {i18n._(t`Product Code`)}
              </Typography>
              <SearchButton>
                <Input
                  style={{
                    width: "100%",
                    margin: "10px",
                  }}
                  disabled={!isAdd}
                  value={productDescrtopAndnameState.productIdState}
                  disableUnderline={true}
                  placeholder="Enter  Product Code"
                  onChange={(event) => productId(event.target.value)}
                />
              </SearchButton>
              <Typography
                style={{ marginTop: "40px" }}
                component="p"
                variant="caption"
              >
                {i18n._(t`Product Url`)}
              </Typography>
              <SearchButton
                style={{
                  height: "50px",
                  lineBreak: "anywhere",
                }}
              >
                <Input
                  style={{
                    width: "100%",
                    margin: "10px",
                    lineBreak: "anywhere",
                  }}
                  disableUnderline={true}
                  value={productDescrtopAndnameState.productUrl}
                  readOnly={true}
                />
              </SearchButton>
              <CopyToClipboard text={productDescrtopAndnameState.productUrl}>
                <Button
                  style={{ marginTop: "5px", border: "1px solid #6E9F21" }}
                >
                  {i18n._(t`Copy Url`)}
                </Button>
              </CopyToClipboard>
              <Typography
                style={{ marginTop: "40px" }}
                component="p"
                variant="caption"
              >
                {i18n._(t`Product Code`)}
              </Typography>

              <Button
                style={{
                  marginTop: "5px",
                  border: "1px solid #6E9F21",
                  backgroundColor: "#6E9F21",
                }}
                onClick={handlePrint}
              >
                {i18n._(t`Print Code`)}
              </Button>
              {productDescrtopAndnameState.productIdState ? (
                <QRCodeContainer ref={componentRef}>
                  <QRCode
                    className="qr-code"
                    value={productDescrtopAndnameState.productUrl || ""}
                    bgColor="#080040"
                    fgColor="#fff"
                    level="L"
                    includeMargin={true}
                    color="red"
                    renderAs="svg"
                  />
                </QRCodeContainer>
              ) : null}
            </ActionButtonContainer>
          </HeaderBottomMenu>
        </Container>
      )}
    </I18n>
  );
};

const mapStateToProps = (state) => {
  const { updateError } = state.authentication;
  return {
    updateError,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addErrorItemInAlert,
      addSuccessItemInAlert,
    },
    dispatch
  );

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(Board);
