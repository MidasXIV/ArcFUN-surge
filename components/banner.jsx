const Banner = () => (
  <div>
    <div
      className="text-center flex flex-col p-4 md:text-left md:flex-row md:items-center md:justify-between md:p-4 bg-purple-100"
      id="messageModal"
    >
      <div className="text-xl font-semibold">
        <div className="text-gray-900">
          Some intresting header.
          <b className="text-purple-500">Some secondary text</b>
        </div>
      </div>

      <div className="mt-3 md:mt-0 md:ml-2">
        <button
          type="button"
          className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-white bg-purple-500"
          onClick="window.open('https://google.com')"
        >
          <i className="fas fa-user" /> Some Button
        </button>
        <button
          type="button"
          className="inline-block rounded-md text-lg font-semibold py-2 px-4 text-black bg-gray-300"
          onClick="document.getElementById('messageModal').style.display = 'none'"
        >
          <i className="fas fa-times" />
        </button>
      </div>
    </div>
  </div>
);

export default Banner;
