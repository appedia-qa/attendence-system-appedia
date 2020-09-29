import React from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import styled from "styled-components";

const StyledSelect = styled(Select)`
  min-height: 30px;
  width: 100%;
`;

const StyledForm = styled(FormControl)`
  width: 100%;
`;

const DropdownSimple = (props) => {
  return (
    <div>
      <StyledForm variant="outlined" margin="none">
        {props.list.length > 0 && (
          <StyledSelect
            placeholder={"select"}
            value={props.value}
            defaultValue={props.value}
            onChange={props.handleValueChange}
          >
            {props.list.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </StyledSelect>
        )}
      </StyledForm>
    </div>
  );
};

export default DropdownSimple;
