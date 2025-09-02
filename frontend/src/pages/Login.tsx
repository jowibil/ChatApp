import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { LuUserRound, LuEye, LuEyeOff } from "react-icons/lu"
import SEO from "../components/ui/SEO"
import { useNavigate } from "react-router-dom"
import { useState } from "react"


const LoginSchema = z.object({
  username: z.string().min(1, { error: "Username is required" }),
  password: z.string().min(1, { error: "Password is required" }),
})

type LoginData = z.infer<typeof LoginSchema>

export function LoginPage() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  const navigate = useNavigate()
  const [showPassword, setshowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      const res = await axios.post<{ token: string, username: string }>("http://localhost:8080/api/login",
        data
      )

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("username", res.data.username);

      toast("Login Succesful!", {
        description: `Welcome back! ${res.data.username}`,
      })
      navigate("/dashboard")
      reset()
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>

      if (error.response?.status === 401) {
        setError("username", { message: "Invalid credentials" })
        setError("password", { message: "Invalid credentials" })
      } else {
        toast("Login Failed", {
          description: error.response?.data.message || error.message
        })
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center relative overflow-hidden p-1.5">
      <SEO title="Login | GoChat App" description="Login to GoChat App" />
      <div className="w-full absolute h-20 left-[-55rem] rotate-90 bg-black "></div>
      <div className="w-full absolute h-20 left-[-48rem] rotate-90 bg-black "></div>
      <div className="w-full absolute h-20 left-[-41rem] rotate-90 bg-black "></div>

      <div className="bg-white/25 backdrop-blur-xl border border-white/30 rounded-3xl p-10 w-full max-w-lg shadow-2xl relative z-10">
        <span className="flex">
          <LuUserRound size={30} />
          <h2 className="font-bold text-3xl ml-4 font-['Bebas_Neue'] tracking-wide">
            Login Account
          </h2>
        </span>
        <p className="ml-12 font-['Inter']">Login to Go Chat App</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
          <div>
            <label htmlFor="username" className="font-['Raleway']">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              {...register("username")}
              className="border rounded-md p-2 w-full"
              disabled={isSubmitting}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="font-['Raleway']">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="border rounded-md p-2 w-full"
              disabled={isSubmitting}
              required
            />
            <button type="button" onClick={() => setshowPassword(!showPassword)}
              className="absolute inset-y-0 top-6 right-3 flex items-center hover:text-gray-700">
              {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white p-2 rounded hover:bg-neutral-800 disabled:opacity-50 mb-4"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex flex-col gap-2">
          <p className="mx-auto font-['Inter']">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register here
            </a>
          </p>
          <p className="mx-auto font-['Inter'] text-[14px]">
            <a href="/resetpassword" className="hover:underline">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;


