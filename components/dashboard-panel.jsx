import Link from "next/link";
import getAvatar from "../lib/avatar";
const DashboardPanel = ({ user, isConnected }) => (
  <div className="container mx-auto py-8 sm:px-4 flex flex-col md:grid md:gap-4 md:grid-cols-4">
    {/* <!-- Beginning of First Tile --> */}
    <div className="md:order-1 md:row-span-1 md:col-span-2">
      <div className="inline-grid max-w-xs sm:max-w-xs md:max-w-lg md:flex bg-black rounded-lg shadow-lg pb-6 md:pb-0">
        <div className="w-full md:w-1/3 md:p-4">
          <img
            src={getAvatar(user)}
            alt="profile"
            className="h-64 md:h-full object-cover object-center w-full rounded-lg"
          />
        </div>

        <div className="w-full md:w-2/3 p-4">
          <div className="inline-grid">
            <p className="work-sans font-semibold text-xl text-white">
              Dashboard
            </p>
            <p className="raleway text-sm my-4 text-white opacity-75">
              Currently logged in as {user.email}
              {isConnected ? (
                <div className="flex flex-row">
                  Connection to Server
                  <div className="p-2 rounded-md bg-black w-min">
                    <span className="block h-2 w-2 bg-green-400 rounded-full bottom-0 right-0" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-row">
                  Connection to Server
                  <div className="p-2 rounded-md bg-black w-min">
                    <span className="block h-2 w-2 bg-red-400 rounded-full bottom-0 right-0" />
                  </div>
                </div>
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center -mt-8 rounded-b-lg max-w-xs md:max-w-lg md:-mt-8 md:justify-end md:pr-8 py-1">
        <button
          type="button"
          className="text-white py-3 px-4 rounded-lg bg-blue-500"
        >
          <Link href="/level">
            <p className="work-sans font-semibold text-sm tracking-wide">
              Levels
            </p>
          </Link>
        </button>
        <button
          type="button"
          className="py-3 px-4 bg-blue-500 rounded-lg ml-3 text-white"
        >
          <p className="work-sans font-semibold text-sm tracking-wide">
            Last level
          </p>
        </button>
      </div>
    </div>
    {/* <!-- End of First Tile --> */}

    {/* <!-- Beginning of Second Tile --> */}
    <div className="container md:order-2 md:row-span-1 md:col-span-1">
      <div className="inline-grid w-full max-w-xs sm:max-w-xs md:max-w-lg md:flex bg-green-300 rounded-lg shadow-lg pb-6 md:pb-0 h-auto">
        <div className="w-full p-4">
          <div className="inline-grid">
            <p className="work-sans font-semibold text-xl text-black">Rank</p>
            <p className="raleway text-sm my-4 text-black opacity-75">
              Spy on your friends!
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center -mt-8 rounded-b-lg max-w-xs md:max-w-lg md:-mt-8 md:justify-end md:pr-8 py-1">
        <button
          type="button"
          className="text-white py-3 px-4 rounded-lg bg-black"
        >
          <Link href="/profile">
            <p className="work-sans font-semibold text-sm tracking-wide">
              Find out!
            </p>
          </Link>
        </button>
      </div>
    </div>

    {/* <!-- End of Second Tile --> */}
  </div>
);

export default DashboardPanel;
