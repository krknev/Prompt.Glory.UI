import { AppUser } from "./user"

export interface TwoMFASignInRequest {
    confirmCode: string
}

export interface RefreshSignInRequest {
    refreshToken: string
}

export interface SignInRequest {
    email: string,
    password: string,
    rememberMe: boolean
}

export interface SignInResponse { 
    idToken: string, 
    user:AppUser
}

export interface SignUpRequest {
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    agreeToTerms: boolean,
    subscribeNewsletter: boolean
}
