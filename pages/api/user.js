import { getRequestUser } from "../../lib/request-user";

export default async function user(req, res) {
  const currentUser = await getRequestUser(req);
  res.status(200).json({ user: currentUser });
}
