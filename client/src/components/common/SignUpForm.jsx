import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import userApi from "../../api/modules/user.api";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import { setUser } from "../../redux/features/userSlice";

const SignUpForm = ({ switchAuthState }) => {
  const dispatch = useDispatch();

  const [isLoginRequest, setIsLoginRequest] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const signInForm = useFormik({
    initialValues: {
      displayName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      displayName: Yup.string()
        .min(8, "display name minimum 8 characters")
        .required("display name is required"),
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .min(8, "confirm password minimum 8 characters")
        .required("confirm password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginRequest(true);
      const { response, err } = await userApi.signup(values);
      setIsLoginRequest(false);

      if (response) {
        signInForm.resetForm();
        dispatch(setUser(response));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign in success");
      }

      if (err) setErrorMessage(err.message);
    },
  });

  return (
    <Box component="form" onSubmit={signInForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signInForm.values.displayName}
          onChange={signInForm.handleChange}
          color="success"
          error={
            signInForm.touched.displayName &&
            signInForm.errors.displayName !== undefined
          }
          helperText={
            signInForm.touched.displayName && signInForm.errors.displayName
          }
        />
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signInForm.values.username}
          onChange={signInForm.handleChange}
          color="success"
          error={
            signInForm.touched.username &&
            signInForm.errors.username !== undefined
          }
          helperText={signInForm.touched.username && signInForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signInForm.values.password}
          onChange={signInForm.handleChange}
          color="success"
          error={
            signInForm.touched.password &&
            signInForm.errors.password !== undefined
          }
          helperText={signInForm.touched.password && signInForm.errors.password}
        />
        <TextField
          type="password"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signInForm.values.confirmPassword}
          onChange={signInForm.handleChange}
          color="success"
          error={
            signInForm.touched.confirmPassword &&
            signInForm.errors.confirmPassword !== undefined
          }
          helperText={
            signInForm.touched.confirmPassword &&
            signInForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignUpForm;
