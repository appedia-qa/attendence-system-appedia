import React from 'react';
import styled from 'styled-components';
import CheckIcon from "@material-ui/icons/Check";

export const ColorBox = styled.div`
  ${({selected, theme}) => `
    padding: 3px;
    margin-right: 10px;
    border-radius: 6px;
    border: 1px solid ${selected ? theme.palette.primary.main: theme.palette.secondary.main}; 
    .box {
      height: 36px;
      width: 36px;
      border-radius: 6px;
    }
  }
  `}
`;

export const SelectedColor = styled.div`
  ${({theme}) => `
    position: absolute;
    margin-top: 5px;
    margin-left: 5px;

    svg {
      height: 25px;
      width: 25px;
      path {
        color: ${theme.palette.primary.main};
      }
    }
  `}
`

const ColorSelector = props => {
  return (
    <ColorBox onClick={() => props.onColorChange(props.color)} selected={props.selected}>
      <div color={props.color} selected={props.selected}>
        {props.selected ? (
          <SelectedColor>
            <CheckIcon />
          </SelectedColor>
        ) : null}
        <div className="box" 
          style={{ 
            backgroundColor: `${props.color}`
          }} 
        />
      </div>
    </ColorBox>
  );
};

export default ColorSelector;