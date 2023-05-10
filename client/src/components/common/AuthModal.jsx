import { Box, Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModalSlice";
import Logo from "./Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const authActionState = {
  signin: "signin",
  signup: "signup",
};

const AuthModal = () => {
  const dispatch = useDispatch();

  const { authModalOpen } = useSelector((state) => state.authModal);
  const [action, setAction] = useState(authActionState.signin);

  useEffect(() => {
    if (authModalOpen) {
      setAction(authActionState.signin);
    }
  }, [authModalOpen]);
  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (authAction) => setAction(authAction);

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <Logo />
          </Box>

          {/* SignInForm or SignUpForm, base on authActionState */}
          {action === authActionState.signin && (
            <SignInForm
              switchAuthState={() => switchAuthState(authActionState.signup)}
            />
          )}
          {action === authActionState.signup && (
            <SignUpForm
              switchAuthState={() => switchAuthState(authActionState.signin)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
