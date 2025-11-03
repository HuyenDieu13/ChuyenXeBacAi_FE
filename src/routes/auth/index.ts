import { createRoute, Outlet } from "@tanstack/react-router";
import { authRoute } from "./layout";
import LoginPage from "@/pages/Auth/LoginPage";
import SignInPage from "@/pages/Auth/SignInPage";
import ForgotPasswordPage from "@/pages/Auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/Auth/ResetPasswordPage";
import VerifyOtpPage from "@/pages/Auth/VerifyOTPpage";

export const loginIndexRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "login",
    component: LoginPage,
})

export const signInIndexRoute = createRoute({
    getParentRoute: () => authRoute,
    path: "sign-in",
    component: SignInPage,
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
