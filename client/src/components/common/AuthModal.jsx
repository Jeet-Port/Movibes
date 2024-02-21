import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthModalOpen } from "../../redux/features/authModelSlice";
import Logo from "./Logo";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

const actionState = {
    signin: "signin",
    signup: "signup",
}

const AuthModal = () => {
    const { authModalOpen } = useSelector((state) => state.authModal);

    const dispatch = useDispatch();

    const [action,SetAction] = useState(actionState.signin)

    useEffect(() => {
        if (authModalOpen) SetAction(actionState.signin)
    }, [authModalOpen])

    const handleClose = () => dispatch(setAuthModalOpen(false))

    const switchAuthState = (state) => SetAction(state)

  return (
    <Modal open={authModalOpen} onClose={handleClose}>
        <Box sx={{
            position: "absolute",
            top: "50%",
            left:"50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            maxWidth: "600px",
            padding: 4,
            outline: "none"
        }}>
            <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper"}}>
                <Box sx={{ textAlign: "center", marginBottom: "2rem"}}>
                    <Logo />
                </Box>

                {action === actionState.signin && <SignInForm switchAuthState={() => switchAuthState(actionState.signup)} />}

                {action === actionState.signup && <SignUpForm switchAuthState={() => switchAuthState(actionState.signin)} />}
            </Box>
        </Box>
    </Modal>    
  )
}

export default AuthModal;