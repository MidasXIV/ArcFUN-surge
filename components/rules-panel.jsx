const RulesPanel = () => (
  <div className="flex flex-col md:grid md:gap-4 2xl:gap-6 md:grid-cols-4 2xl:row-span-2 2xl:pb-8 ml-2 pt-4">
    {/* <!-- Beginning of Rule 1 --> */}
    <div className="bg-indigo-600 md:order-1 md:row-span-1 2xl:row-span-1 md:col-span-2 rounded-lg shadow-xl mb-5 md:mb-0">
      <div className="mt-6 relative">
        <p className="text-white text-xl 2xl:text-4xl font-bold px-7 md:px-9 2xl:pt-6 2xl:mx-2">
          Clues can be found anywhere in the webpage
        </p>
        <br />
        <p className="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl px-7 md:px-9 mb-3 2xl:pb-8 2xl:mx-2">
          This can be anything from Image Name, Source, Cookies etc.
        </p>
      </div>
    </div>
    {/* <!-- Ending of Rule 1 --> */}

    {/* <!-- Beginning of Rule 2 --> */}
    <div className="bg-gray-900 md:order-2 md:row-span-1 2xl:row-span-1 md:col-span-1 rounded-lg shadow-xl pb-4 mb-5 md:mb-0">
      <div className="mt-6 mx-1 md:mx-2">
        <p className="text-white text-lg md:text-xl 2xl:text-4xl font-semibold pt-1 px-6 2xl:px-8 md:pl-5 md:pr-8">
          Timely Hints
        </p>
        <br />
        <p className="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl pl-6 md:pl-5 pr-4 md:mt-2 2xl:mt-2 2xl:px-8">
          Hints for all levels will be unlocked as per schedule. A new hint will
          be unlocked every 2 hours after the level is unlocked.
        </p>
      </div>
    </div>
    {/* <!-- Ending of Rule 2 --> */}

    {/* <!-- Beginning of Rule 3 --> */}
    <div className="bg-yellow-500 md:order-3 md:row-span-2 2xl:row-span-1 md:col-span-1 rounded-lg shadow-xl mb-5 md:mb-0 2xl:mb-8">
      <div className="mt-4 ml-5 mr-11">
        <p className="text-white  text-xl 2xl:text-4xl font-bold px-2 md:px-3 mt-6 md:mt-5 2xl:mt-12 2xl:pb-6">
          Only one Winner
        </p>
        <br />
        <p className="text-white text-opacity-75 font-medium md:text-sm 2xl:text-3xl pl-2 md:pl-3 md:pr-4 mb-6 2xl:pt-2 mt-3">
          The user on top of the scoreboard at the end will be declared as the
          winner regardless of whether all the levels have been completed.
        </p>
      </div>
    </div>
    {/* <!-- Ending of Rule 3 --> */}

    {/* <!-- Beginning of Rule 4 --> */}
    <div className="bg-purple-800 md:order-4 md:row-span-2 2xl:row-span-1 col-span-2 rounded-lg shadow-xl mb-5 md:mb-0 2xl:mb-8 md:pb-14 2xl:pb-20">
      <div className="px-3 mt-3 mb-5 md:mb-0">
        <p className="text-white text-lg 2xl:text-4xl font-semibold px-4 mt-3 md:mt-6 2xl:mt-8">
          Answers have a format !
        </p>
        <br />
        <p className="text-white text-opacity-50 font-medium md:text-sm 2xl:text-3xl px-4 mt-1 md:-mt-3 2xl:mt-6">
          Answers are to be typed in lower case and excluding spaces and special
          characters.
          <br />
          If the answer is a name, it should be the full name including
          initials. For example, if your answer is &quot;A. Xyz&quot;, it should
          be entered as &quot;axyz&quot;
          <br />
          If your answer is a date, it should be entered in ddmmyyyy format. For
          example, if your answer is &quot;14th April, 1998&quot; you should
          enter &quot;14041998&quot;
        </p>
      </div>
    </div>
    {/* <!-- Ending of Rule 4 --> */}

    {/* <!-- Beginning of Rule 5 --> */}
    <div className="bg-red-500 md:order-2 md:row-span-4 md:col-span-1 rounded-lg shadow-xl mb-5 md:pb-4 2xl:h-screen">
      <div className="px-3 md:px-5 md:mt-4 mb-5 md:mb-0">
        <p className="text-white text-xl 2xl:text-4xl font-semibold px-4 md:px-0 mt-2 md:-mt-0">
          Something for everyone!
        </p>
        <br />
        <p className="text-white text-opacity-75 font-medium md:text-sm 2xl:text-3xl px-4 md:px-0 2xl:px-4 md:pr-3 mt-2 md:mt-1 2xl:mt-2 2xl:pb-64">
          New levels are unlocked every 6 hours
        </p>
      </div>
    </div>
    {/* <!-- Ending of Rule 5 --> */}
  </div>
);

export default RulesPanel;
