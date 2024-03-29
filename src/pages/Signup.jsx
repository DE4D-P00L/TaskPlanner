import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
  const darkmode = useSelector((state) => state.theme.darkMode);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [navigate, user]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/signup",
        data
      );
      toast.success("Welcome");
      localStorage.setItem("token", `Bearer ${response.data.token}`);
      dispatch(setUser(response.data.user));
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="w-full h-[calc(100vh-70px)] max-h-screen flex items-center justify-center p-2"
      data-theme={`${darkmode ? "dark" : "light"}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-6 sm:p-8 bg-neutral gap-y-3 rounded-lg w-full max-w-sm">
        <h3 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
          Sign up for a new account
        </h3>
        <div className="mt-4 space-y-2">
          <label>Your Username</label>
          <input
            type="username"
            className="bg-base-200 border border-gray-500 text-content sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            {...register("username", {
              required: "Username Required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            })}
            placeholder="JohnDoe"
          />
          {errors.username?.message && (
            <p className="text-red-500">{errors.username?.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label>Password</label>
          <input
            type="password"
            className="bg-base-200 border border-gray-500 text-content sm:text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
            {...register("password", {
              required: "Password Required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Password"
          />
          {errors.password?.message && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#2563eb] mt-4">
          Sign up
        </button>
        <span>
          Already have an account?{" "}
          <Link to="/login" className="text-[#2563eb]">
            {" "}
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
export default Signup;
