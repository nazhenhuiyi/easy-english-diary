import { LoginContent } from "@/components/login-content";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Login() {
  return <LoginContent />;
}
