import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { setInicialice, startLogin } from "../../store/auth/thunks";

import Swal from "sweetalert2";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../components/iconify";
import { useDispatch, useSelector } from "react-redux";

// ----------------------------------------------------------------------

const LoginForm = () => {
  const { authErrorMessage, authStatus, status } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log(authStatus);
    console.log(status);
    if (authStatus == "error") {
      console.log(authErrorMessage);
      if (!authErrorMessage) {
        return;
      }
      showToast("warning", "Alerta!", authErrorMessage);
      dispatch(setInicialice());
      return;
    }
    if (status == "authenticated") {
      showToast("success", "OK!", "authErrorMessage");
      localStorage.setItem("lastPatch", "/");
      return navigate("/", { replace: true });
    }
  }, [authErrorMessage, authStatus, status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: event.target.username.value,
      password: event.target.password.value,
    };
    dispatch(startLogin(data));
    // setTimeout(() => {
    //   navigate("/dashboard/app");
    // }, 1000);
  };

  const showToast = (type, title, message) =>
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonText: "Ok",
    });

  const handleClick = () => {
    console.log();
    showToast("warning", "Alerta!", "authErrorMessage");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="username" id="username" label="Email" />

          <TextField
            name="password"
            id="password"
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <Iconify
                      icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 2 }}
        >
          {/* <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          //   onClick={handleClick}
        >
          Ingresar
        </LoadingButton>
      </form>
    </>
  );
};

export default LoginForm;
