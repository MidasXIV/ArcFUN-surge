export default function fetcher(selector) {
  return (url) => {
    return fetch(url)
      .then((r) => r.json())
      .then((data) => {
        return selector ? data[selector] : data ?? null;
      });
  };
}
