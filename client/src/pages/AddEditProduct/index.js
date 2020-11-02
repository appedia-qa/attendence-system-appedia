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
import { apiUrl, apiBaseUrl } from "../../constants/urls";
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
import LoaderComponent from "../../components/LoaderComponent";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useReactToPrint } from "react-to-print";
var QRCode = require("qrcode.react");

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
    height: auto !important;
  }
`;

const Board = (props) => {
  const [id, setId] = useState("");
  const [isAdd, setAdd] = useState(null);
  const componentRef = useRef();
  const classes = useStyles();
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorString, seterrorString] = useState(null);
  const productDescrtopAndnameObj = {
    productIdState: "",
    productUrl: "",
    uploadImages: [],
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
        addErrorItemInAlert({
          message: "Please enter product code",
        })
      );
    }
  };

  const delImagesOnError = (image) => {
    try {
      const tokken = getTokken();
      const url = apiUrl + "/users/imageDelete";
      let imagesToDel = image;
      imagesToDel = imagesToDel.split("/");
      const responceImg = axios.post(
        url,
        { image_name: imagesToDel[4] },
        { headers: { Authorization: tokken } }
      );
      if (responceImg.status == 200 || responceImg.status == 201) {
        dispatch(
          addErrorItemInAlert({
            message: "Image is deleted",
          })
        );
      }
    } catch (e) {
      dispatch(
        addErrorItemInAlert({
          message: "Please try again latter",
        })
      );
      setLoading(false);
    }
  };

  const delImagesError = (image) => {
    return Promise.all(image.map(delImagesOnError));
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
          let pData = data.product_image ? data.product_image : "";
          if (pData) {
            pData = await pData.map((item) => {
              return { data_url: item, uploaded: true };
            });
          }

          setProductDescrtopAndnameState({
            ...productDescrtopAndnameState,
            productIdState: data.product_code ? data.product_code : "",
            productUrl: data.product_url ? data.product_url : "",
            images: pData,
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
        }
      } catch (e) {
        dispatch(
          addErrorItemInAlert({
            message: "please try again latter",
          })
        );
      }
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

  const delImages = (index) => {
    if (
      productDescrtopAndnameState &&
      productDescrtopAndnameState.images &&
      productDescrtopAndnameState.images[index].uploaded
    ) {
      try {
        const tokken = getTokken();
        const url = apiUrl + "/users/imageDelete";
        let imagesToDel = productDescrtopAndnameState.images[index].data_url;
        imagesToDel = imagesToDel.split("/");
        const responceImg = axios.post(
          url,
          { image_name: imagesToDel[4] },
          { headers: { Authorization: tokken } }
        );
        if (responceImg.status == 200 || responceImg.status == 201) {
          dispatch(
            addErrorItemInAlert({
              message: "Image is deleted",
            })
          );
        }
      } catch (e) {
        dispatch(
          addErrorItemInAlert({
            message: "Please try again latter",
          })
        );
        setLoading(false);
      }
    }
  };

  const onChange = async (imageList, addUpdateIndex) => {
    imageList = imageList.map((obj) => {
      if (!(obj && obj.uploaded)) {
        return { ...obj, uploaded: false };
      } else {
        return { ...obj };
      }
    });
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
      productUrl: `${apiBaseUrl}/view/${event}`,
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
  const validations = (arabicValid, englishValid, frenchValid) => {
    if (!(arabicValid == 2 && englishValid == 2 && frenchValid == 2)) {
      if (arabicValid == 1) {
        dispatch(
          addErrorItemInAlert({
            message: "Fill both name and description for Arabic",
          })
        );
        seterrorString("Fill both name and description for Arabic");
        return false;
      }
      if (englishValid == 1) {
        dispatch(
          addErrorItemInAlert({
            message: "Fill both name and description for English",
          })
        );
        seterrorString("Fill both name and description for English");
        return false;
      }
      if (frenchValid == 1) {
        dispatch(
          addErrorItemInAlert({
            message: "Fill both name and description for French",
          })
        );
        seterrorString("Fill both name and description for French");
        return false;
      }
      if (arabicValid == 0 && englishValid == 0 && frenchValid == 0) {
        dispatch(
          addErrorItemInAlert({
            message: "Fill both name and description for atleat one language",
          })
        );
        seterrorString(
          "Fill both name and description for atleat one language"
        );
        return false;
      }
      return true;
    }
    return true;
  };

  const setImages = (images, response) => {
    let newImages = [];
    if (response && response.data && response.data.images) {
      response.data.images.map((d) => {
        newImages.push(`${apiBaseUrl}/uploads/${d}`);
      });
    }

    let newSavedImages = [];
    if (images && images.length > 0) {
      images.map((obj) => {
        if (obj.uploaded == true) {
          newSavedImages.push(obj.data_url);
        }
      });
    }
    return [...newSavedImages, ...newImages];
  };

  const chkNewImages = (images) => {
    let newImages = [];
    if (images && images.length > 0) {
      images.map((obj) => {
        if (obj.uploaded == false) {
          newImages.push(obj.data_url);
        }
      });
    }
    return newImages;
  };

  const imageUploadApi = async (imagesToUpload) => {
    const tokken = getTokken();
    const url = apiUrl + "/users/imageUpload";
    if (imagesToUpload.length > 0) {
      setLoading(true);
      try {
        const responceImg = await axios.post(
          url,
          { images: imagesToUpload },
          { headers: { Authorization: tokken } }
        );
        if (responceImg.status == 200 || responceImg.status == 201) {
          return responceImg;
        } else {
          dispatch(
            addErrorItemInAlert({
              message: "Please try again latter",
            })
          );
        }
      } catch (e) {
        dispatch(
          addErrorItemInAlert({
            message: "something went wrong image is not uploaded",
          })
        );
        setLoading(false);
      }
    }
    return [];
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
    if (validations(arabicValid, englishValid, frenchValid)) {
      if (!productDescrtopAndnameState.productIdState) {
        dispatch(
          addErrorItemInAlert({
            message: "Please add product code",
          })
        );
        seterrorString("Please add product code");
        return;
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
              description:
                french && french.description ? french.description : "",
            },
          },
          product_url: productDescrtopAndnameState.productUrl,
          product_image: "",
          product_category_id: "5f75b84ea456c4ef19049547",
        };
        seterrorString(null);

        const tokken = getTokken();
        const url = apiUrl + "/users/imageUpload";
        const imagesToUpload = await chkNewImages(
          productDescrtopAndnameState.images
        );

        const uploadImage = await imageUploadApi(imagesToUpload);
        obj.product_image = setImages(
          productDescrtopAndnameState.images,
          uploadImage
        );
        if (isAdd) {
          try {
            const url = apiUrl + "/products/add";
            const responce = await axios.post(url, obj, {
              headers: { Authorization: tokken },
            });
            if (responce.status == 200 || responce.status == 201) {
              setLoading(false);
              props.history.push("/");
            } else {
              setLoading(false);
              dispatch(
                addErrorItemInAlert({
                  message: "Please try again latter",
                })
              );
            }
          } catch (e) {
            dispatch(
              addErrorItemInAlert({
                message: "Please try with other product url or try again later",
              })
            );
            delImagesError(obj.product_image);
            setLoading(false);
          }
        } else {
          try {
            const url = apiUrl + "/products/update";
            const responce = await axios.put(url, obj, {
              headers: { Authorization: tokken },
            });
            if (responce.status == 200 || Response.staus == 201) {
              setLoading(false);
              props.history.push("/");
            } else {
              setLoading(false);
              dispatch(
                addErrorItemInAlert({
                  message: "Please try again latter",
                })
              );
            }
          } catch (e) {
            dispatch(
              addErrorItemInAlert({
                message:
                  "something went wrong product update is not successful",
              })
            );
            delImagesError(obj.product_image);
            setLoading(false);
          }
        }
      }
    }
  };
  function rtrim(str) {
    return str.toString().replace(/<[^>]+>/g, "");
  }
  const isProductDetailValid = (item) => {
    let count = 0;
    if (item.name && item.name.trim().length > 0) {
      count = count + 1;
    }
    if (rtrim(item.description) && rtrim(item.description.trim().length > 0)) {
      count = count + 1;
    }

    return count;
  };

  const tokken = getTokken();
  if (!tokken) {
    props.history.push("/login");
  }

  return (
    <I18n>
      {({ i18n }) => (
        <Container>
          <HeaderBottomMenu>
            <ActionHomeButtonContainer
              style={{
                minWidth: "230px",
                minHeight:
                  props.windowWidth > Breakpoints.SM_MAX ? "500px" : "100%",
                background: "#FFFFFF",
                padding: "20px",
              }}
              lg={2}
              md={12}
              sm={12}
            >
              <Typography
                component="p"
                variant="caption"
                style={{ textAlign: "center" }}
              >
                {i18n._(t`Please add square images for better result`)}
              </Typography>
              <Images
                onChange={onChange}
                images={productDescrtopAndnameState.images}
                delImages={delImages}
              />
            </ActionHomeButtonContainer>
            <ActionButtonContainer
              lg={7}
              md={12}
              sm={12}
              style={{
                maxWidth: "100vh",
                padding: "0px",
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
              {loading ? (
                <LoaderComponent height={"80px"} />
              ) : (
                <div style={{ marginTop: "10px" }}>
                  <Button
                    style={{
                      marginTop: "5px",
                      marginBottom: "15px",
                      color: "#FFFFFF",
                      border: "1px solid #6E9F21",
                      background: "#6E9F21",
                      marginRight: "20px",

                      width: "130px",
                    }}
                    onClick={saveItem}
                  >
                    {i18n._(t`Save`)}
                  </Button>
                  <Button
                    style={{
                      marginTop: "5px",
                      marginBottom: "15px",
                      border: "1px solid green",
                      color: "green",
                      width: "130px",
                    }}
                    onClick={() => {
                      props.history.push("/");
                    }}
                  >
                    {i18n._(t`Cancel`)}
                  </Button>
                </div>
              )}
            </ActionButtonContainer>
            <ActionButtonContainer
              lg={2}
              md={12}
              sm={12}
              style={{
                padding: "20px",
                minHeight: "500px",
                minWidth: "230px",
                background: "#FFFFFF",
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
              {productDescrtopAndnameState.productIdState ? (
                <div style={{ width: "100%" }}>
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
                      width: "100%",
                    }}
                    onClick={handlePrint}
                  >
                    {i18n._(t`Print Code`)}
                  </Button>
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
                </div>
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
