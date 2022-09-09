import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/apiRequest";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    registerUser(newUser, dispatch, navigate);
  };

  return (
    <div className="mt-32">
      <div className="m-auto max-w-xl">
        <div className="text-20 font-semibold uppercase">Register</div>
        <form className="flex flex-col gap-6 mt-2" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="User name"
            className="bg-gray-100 text-gray-500 py-5 px-4 outline-none border focus:bg-white focus:border focus:border-gray-200"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            required
            placeholder="Email"
            className="bg-gray-100 text-gray-500 py-5 px-4 outline-none border focus:bg-white focus:border focus:border-gray-200"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="bg-gray-100 text-gray-500 py-5 px-4 outline-none border focus:bg-white focus:border focus:border-gray-200"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="uppercase py-3 px-7 font-bold bg-black text-white border border-black hover:bg-white hover:text-black cursor-pointer w-[20%]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
