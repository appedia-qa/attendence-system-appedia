import React from "react";
import { Typography, Button, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import theme from "../../theme/Theme";
import { t } from "@lingui/macro";
import { I18n } from "@lingui/react"; 

export const RemoveButtonContainer = styled.div`
  ${({ theme, selected }) => `
    height: 50px;
    display: flex;
    align-items: center;
    justify-content:flex-end;
    button {
      height: 40px;
      width: 150px;
      border:1px solid #95989A;
      border-radius:25px;
      margin:0;
      p {
        padding: 0;
        margin: 0;
        font-size: 13px;
        color:#95989A;
      }

      svg {
        height: 20px;
        width: auto;
        path {
          fill: ${theme.palette.white.main};
        }
      }
    }
  `}
`;

export const RowContainer = styled(Row)`
  ${({ theme }) => `
     display:flex;
     justify-content:space-evenly;
  `}
`;

export const ColContainer = styled(Col)`
  ${({ theme }) => `
     display:flex;
     justify-content:space-around;
  `}
`;

export default function CustomizedTabs(props) {
  const handleClick = (value) => {
    props.handleTabChange(value);
  };

  return (
   <I18n>
    {({ i18n }) => (
      <div>
        <RowContainer>
          <ColContainer>
            <RemoveButtonContainer>
              <Button
                style={{
                  backgroundColor:
                    props.value == 1 && theme.palette.secondary.main,
                }}
                onClick={() => handleClick(1)}
              >
                <p>{i18n._(t`Indoor Plants`)}</p>
              </Button>
            </RemoveButtonContainer>
          </ColContainer>
          <ColContainer>
            <RemoveButtonContainer>
              <Button
                style={{
                  backgroundColor:
                    props.value == 2 && theme.palette.secondary.main,
                }}
                onClick={() => handleClick(2)}
              >
                <p>{i18n._(t`Outdoor Plants`)}</p>
              </Button>
            </RemoveButtonContainer>
          </ColContainer>
        </RowContainer>
        <RowContainer>
          <ColContainer>
            <RemoveButtonContainer>
              <Button
                style={{
                  backgroundColor:
                    props.value == 3 && theme.palette.secondary.main,
                }}
                onClick={() => handleClick(3)}
              >
                <p>{i18n._(t`Accessories`)}</p>
              </Button>
            </RemoveButtonContainer>
          </ColContainer>
          <ColContainer>
            <RemoveButtonContainer>
              <Button
                style={{
                  backgroundColor:
                    props.value == 4 && theme.palette.secondary.main,
                }}
                onClick={() => handleClick(4)}
              >
                <p>{i18n._(t`Gardening Needs`)}</p>
              </Button>
            </RemoveButtonContainer>
          </ColContainer>
        </RowContainer>
      </div>
      )}
    </I18n>
  );
}
