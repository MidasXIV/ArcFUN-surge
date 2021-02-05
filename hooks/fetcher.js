export default function fetcher(url) {
  return fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });
}
