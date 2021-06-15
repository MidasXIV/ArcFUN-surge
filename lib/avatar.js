export default function getAvatar(user) {
  const size = 140;
  const variant = "marble";
  const avatar = `https://source.boringavatars.com/${variant}/${size}/${encodeURIComponent(user.email)}?colors=9E1E4C,FF1168,25020F,8F8F8F,ECECEC&square`;
  return avatar;
}