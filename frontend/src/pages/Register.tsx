import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { LuUserRound } from "react-icons/lu"
import SEO from "../components/ui/SEO"


const FormSchema = z.object({
  username: z.string().min(2, {
    error: "Username must be at least 2 characters.",
  }),
  password: z.string().min(6, {
    error: "Password must be at least 6 characters.",
  }),
})

type FormData = z.infer<typeof FormSchema>

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await axios.post<{ username: string }>(
        "http://localhost:8080/api/register",
        data
      )

      toast("Registration Successful!", {
        description: `Welcome to Go Chat App — ${res.data.username}`,
      })

      reset()
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>
      toast("Registration Failed!", {
        description:
          axiosError.response?.data.message || axiosError.message || "Something went wrong",
      })
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
            Register User
          </h2>
        </span>
        <p className="ml-12 font-['Inter']">Welcome to Go Chat App</p>

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

          <div>
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white p-2 rounded hover:bg-neutral-800 disabled:opacity-50 mb-4"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex">
          <p className="mx-auto font-['Inter']">
            Already have an account?{" "}
            <a href="/" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
