const Form = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit} className="my-5 px-2">
    <label htmlFor="email-input" className="mt-5">
      <span className="text-gray-600  text-md">Email</span>
      <input
        id="email-input"
        type="email"
        name="email"
        className="block w-full p-2 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent "
        required
      />
    </label>

    <div className="mt-5">
      <input
        type="submit"
        value="Sign up / Login with email"
        className="py-3 bg-blue-500 text-white w-full rounded-xl hover:bg-blue-600 cursor-pointer"
      />
    </div>

    {errorMessage && <p className="text-red-600  text-md">{errorMessage}</p>}
  </form>
);

export default Form;
