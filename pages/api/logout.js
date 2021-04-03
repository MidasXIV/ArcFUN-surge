import { magic } from "../../lib/magic";
import { getSession, removeSession } from "../../lib/auth-cookies";

export default async function logout(req, res) {
  const session = await getSession(req);
  await magic.users.logoutByIssuer(session.issuer);
  removeSession(res);
  res.writeHead(302, { Location: "/" });
  res.end();
}
