"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, ADMIN_SESSION_HOURS, sessionToken, verifyPassword } from "@/lib/admin-auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!verifyPassword(password)) {
    redirect("/admin?error=1");
  }

  const token = sessionToken();
  if (token) {
    cookies().set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * ADMIN_SESSION_HOURS,
    });
  }

  redirect("/admin");
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin");
}
