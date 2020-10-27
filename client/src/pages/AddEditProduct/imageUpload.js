import React from "react";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react";
import {
  addErrorItemInAlert,
  addSuccessItemInAlert,
} from "../../redux/actions/alert.action";
import { compose } from "redux";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router";
import { bindActionCreators } from "redux";
import {
  Typography,
  IconButton,
  Input,
  Badge,
  Button,
} from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const StyleDiv = styled.div`
  ${({ theme }) => `
  background-color:#E6E4E4 !important;
  display: flex;
  min-height:150px;
  align-items: center;
  margin:0px;
  overflow:auto;
  
  
`}
`;

const ImgDiv = styled.div`
  ${({ theme }) => `
  padding:20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  img{
      min-width:90px;
  }
`}
`;

export function App(props) {
  const maxNumber = 10;
  const dispatch = useDispatch();

  const callErr = (e) => {
    if (e.maxNumber == true) {
      dispatch(
        addErrorItemInAlert({
          message: "You can upload 10 files at a time",
        })
      );
    }
  };

  return (
    <I18n>
      {({ i18n }) => (
        <div className="App">
          <ImageUploading
            multiple
            value={props.images}
            onChange={props.onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            maxFileSize={"4000000"}
            onError={(e) => callErr(e)}
            acceptType={["jpg", "gif", "png"]}
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div
                style={{
                  marginTop: "40px",
                }}
              >
                <StyleDiv {...dragProps}>
                  {imageList && imageList.length > 0 ? (
                    imageList.map((image, index) => (
                      <ImgDiv key={index}>
                        {!image.uploaded ? (
                          <img src={image["data_url"]} alt="" width="70%" />
                        ) : (
                          <img src={image["data_url"]} alt="" width="70%" />
                        )}
                        <div
                          style={{ marginTop: "5px" }}
                          className="image-item__btn-wrapper"
                        >
                          <UpdateIcon
                            color="secondary"
                            onClick={() => onImageUpdate(index)}
                          />
                          <CancelIcon
                            style={{ color: "red" }}
                            onClick={() => {
                              onImageRemove(index);
                              props.delImages(index);
                            }}
                          />
                        </div>
                      </ImgDiv>
                    ))
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                      }}
                    >
                      <PublishIcon color="action" fontSize="large" />
                    </div>
                  )}
                </StyleDiv>
                <div style={{ display: "grid" }}>
                  <button
                    style={
                      (isDragging ? { color: "red" } : undefined,
                      {
                        height: "40px",
                        marginTop: "20px",
                        alignItems: "center",
                        display: "grid",
                        color: "#080040",
                      })
                    }
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    {i18n._(t`Upload Photo`)}
                  </button>
                </div>
                &nbsp;
              </div>
            )}
          </ImageUploading>
        </div>
      )}
    </I18n>
  );
}

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
)(App);
