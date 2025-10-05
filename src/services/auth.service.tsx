import { signIn, signOut } from "next-auth/react"; 
import { ApiUrls } from "./url";
import { SignInRequest, SignUpRequest } from "@/types/auth";
import { ApiResponse } from "@/types/ApiResponse";
import { api } from "./axios";

class AuthService {
  async signIn(request: SignInRequest) {
    const result = await signIn("credentials", {
      redirect: false,
      email: request.email,
      password: request.password,
      rememberMe: request.rememberMe
    });

    if (!result || result.error) {
      throw new Error(result?.error || "Invalid login credentials");
    }

    return result;
  }

  async signUp(request: SignUpRequest): Promise<ApiResponse<boolean>> {
    const { data } = await api.post<ApiResponse<boolean>>(ApiUrls.signUp, request);
    return data;
  }

  async logout() {
    await signOut({ callbackUrl: "/" });
  }
}

export const authService = new AuthService();
