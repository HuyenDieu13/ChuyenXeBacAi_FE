import { createRoute } from "@tanstack/react-router";
import { authRoute } from "./layout";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import VerifyOtpPage from "@/pages/Auth/VerifyOTPpage";

export const loginIndexRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "login",
    component: LoginPage,
})

export const registerIndexRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "sign-in",
    component: RegisterPage,
})

export const forgotPasswordRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "forgot-password",
    component: ForgotPasswordPage,
})

export const resetPasswordRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "reset-password",
    component: ResetPasswordPage,
})

export const verifyOtpRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "verify-otp",
    component: VerifyOtpPage,
})
