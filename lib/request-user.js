import UserModel from "../models/user-model";
import { getSession } from "./auth-cookies";

const DEFAULT_PUBLIC_USER = Object.freeze({
  email: "guest@arcfun.local",
  name: "Guest",
  statistics: []
});

function normalizeUser(user, email) {
  return {
    ...DEFAULT_PUBLIC_USER,
    ...(email ? { email } : {}),
    ...(user || {}),
    statistics: user?.statistics ?? [],
    hasAccount: Boolean(user)
  };
}

export async function getRequestUser(req, projection = {}) {
  const session = await getSession(req).catch(() => null);
  const email = session?.email;

  if (!email) {
    return normalizeUser();
  }

  const userModel = new UserModel();
  const user = await userModel.getUser(
    { email },
    {
      _id: false,
      email: true,
      name: true,
      statistics: true,
      ...projection
    }
  );

  return normalizeUser(JSON.parse(user || "null"), email);
}

export function isGuestUser(user) {
  return !user?.hasAccount;
}

export { DEFAULT_PUBLIC_USER };