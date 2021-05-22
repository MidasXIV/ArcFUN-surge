export default function fetcher(selector) {
  return (url) => {
    return fetch(url)
      .then((r) => {
        // If the status code is not in the range 200-299,
        if (!r.ok) {
          const error = new Error("An error occurred while fetching the data.");
          // Attach extra info to the error object.
          error.info = r.statusText; // await r.json() to get the text
          error.status = r.status;
          throw error;
        }

        return r.json();
      })
      .then((data) => {
        return selector ? data[selector] : data ?? null;
      });
  };
}
