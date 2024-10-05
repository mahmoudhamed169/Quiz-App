export default function TextInput({ children }) {
  return (
    <div>
      <label
        htmlFor="input-group-1"
        className="block mb-2 text-sm font-medium text-[#ffff] ms-6 font-bold text-lg"
      >
        Registered email address
      </label>
      <div className="relative mb-6   ">
        <div className="absolute inset-y-0 start-5 flex items-center  pointer-events-none ">
          {children}
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-[#0D1321] border-[3px]  focus:outline-[3px]  focus:outline-[#ffff] focus:boder-none border-[#fff] text-[#ffff] text-lg h-[50px] rounded-lg  block w-full ps-[3.5rem] p-7   "
          placeholder="Type your email"
        />
      </div>
    </div>
  );
}
