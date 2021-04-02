import { useState } from "react";

const SolutionInput = ({ solution = "", onSubmit }) => {
  const [input, setInput] = useState(solution);
  async function handleChange(e) {
    setInput(e.target.value);
  }
  return (
    <form
      onSubmit={onSubmit}
      className="mt-3 p-3 w-full flex mx-auto bg-black rounded-lg"
    >
      <input
        type="text"
        className="p-4 rounded-lg text-gray-300 bg-black flex-1"
        placeholder="answer"
        onChange={handleChange}
        value={input}
      />
      <button
        type="submit"
        className="bg-blue-400 text-white hover:bg-pink-600 transition-colors duration-500 cursor-pointer p-3 rounded-md text-sm font-medium icon"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            strokeWidth="1"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </form>
  );
};

export default SolutionInput;
