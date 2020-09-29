import React from "react";
import * as StyledComponent from "./styles";

const NumericInput = props => {
  return (
    <StyledComponent.InputContainer>
      <StyledComponent.Button onClick={props.handleDecrease}>-</StyledComponent.Button>
      <input 
        label={props.label} 
        readOnly={true}
        defaultValue={props.defaultValue} 
        type="number" 
        onChange={props.handleChange}
        value={props.value} 
      />
      <StyledComponent.Button onClick={props.handleIncrease}>+</StyledComponent.Button>
    </StyledComponent.InputContainer>
  );
};

export default NumericInput;
