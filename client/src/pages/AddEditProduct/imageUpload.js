import React from "react";
import ImageUploading from "react-images-uploading";
import styled from "styled-components";
import PublishIcon from "@material-ui/icons/Publish";
import UpdateIcon from "@material-ui/icons/Update";
import CancelIcon from "@material-ui/icons/Cancel";

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
  justify-content: center;
  align-items: center;
  margin:0px;
  overflow:auto;
  
  
`}
`;

const ImgDiv = styled.div`
  ${({ theme }) => `
  padding:5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  img{
      min-width:90px;
  }
`}
`;

export default function App(props) {
  const maxNumber = 69;
  console.log(props.images);

  return (
    <div className="App">
      <ImageUploading
        multiple
        value={props.images}
        onChange={props.onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
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
                      <img src={image["product_image"]} alt="" width="70%" />
                    )}
                    <div className="image-item__btn-wrapper">
                      <UpdateIcon
                        color="secondary"
                        onClick={() => onImageUpdate(index)}
                      />
                      <CancelIcon
                        style={{ color: "red" }}
                        onClick={() => onImageRemove(index)}
                      />
                    </div>
                  </ImgDiv>
                ))
              ) : (
                <PublishIcon color="action" fontSize="large" />
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
                Upload Photo
              </button>
            </div>
            &nbsp;
            {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
