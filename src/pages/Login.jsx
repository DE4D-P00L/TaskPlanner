import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
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
        import.meta.env.VITE_SERVER_URL + "/api/v1/user/login",
        data
      );

      // TODO: Add toast notification

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
        className="flex flex-col max-w-sm">
        <input
          type="username"
          {...register("username", { required: "Username Required" })}
          placeholder="username"
        />
        {errors.username?.message && (
          <p className="error-message">{errors.username?.message}</p>
        )}
        <input
          type="password"
          {...register("password", {
            required: "Password Required",
            minLength: 6,
          })}
          placeholder="Password"
        />
        {errors.password?.message && (
          <p className="error-message">{errors.password.message}</p>
        )}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default Login;
