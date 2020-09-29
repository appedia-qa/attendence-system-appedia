import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import MailOutlinedIcon from "@material-ui/icons/MailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: "25ch",
  },
}));

export const EmailField = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <OutlinedInput
        id="standard-adornment-email"
        style={{ width: "100%" }}
        inputStyle={{ width: "100%" }}
        type="email"
        error={props.emailToched}
        onChange={(event) => props.onChange(event)}
        startAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onMouseDown={handleMouseDownPassword}
            >
              <MailOutlinedIcon />
            </IconButton>
          </InputAdornment>
        }
      />
      <span style={{ marginTop: "10px", color: "red" }}>
        {props.emailToched ? "Please Enter Valid Email" : false}
      </span>
    </div>
  );
};

export const PasswordField = (props) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.root}>
      <OutlinedInput
        id="standard-adornment-password"
        style={{ width: "100%" }}
        inputStyle={{ width: "100%" }}
        error={props.passwordTouched}
        type={values.showPassword ? "text" : "password"}
        onChange={(event) => props.onChange(event)}
        startAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <LockOpenOutlinedIcon />
              ) : (
                <LockOutlinedIcon />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
      <span style={{ marginTop: "10px", color: "red" }}>
        {props.passwordTouched ? "Please Enter Valid password" : false}
      </span>
    </div>
  );
};
