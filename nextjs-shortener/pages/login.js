import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../lib/context";
import { useRouter } from "next/router";
import { login } from "../lib/auth";
import Link from "next/link";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const onInputChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { isLoggedIn, setUser } = useContext(AuthContext);
  const router = useRouter();
  const signIn = async () => {
    const {email, password} = formData;
    if (!email) return setErrors({ email: "Email must not be empty" });
    if (!password) return setErrors({ password: "Password must not be empty" });
    setLoading(true);
    const reg = await login(email, password);
    setLoading(false);
    if (reg.jwt){
      setUser(reg.user);
      router.push("/");
    } else {
      setErrors({ server: reg?.error?.message || "Error from server" });
    }
  }
  useEffect(()=> {
    if (isLoggedIn){
      return router.push("/dashboard");
    }
  }, [isLoggedIn]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Url Shortener
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <form
            className="w-full max-w-lg mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full px-3 mb-6 md:mb-0">
                <input
                  onChange={onInputChange}
                  name="email"
                  placeholder="Enter email..."
                  className={`appearance-none block w-full text-gray-700 mb-6 border-2 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                  id="grid-email"
                  type="email"
                />
                {errors.email ? (
                  <p className="text-red-500 text-xs italic">{errors.email}</p>
                ) : ''}
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <input
                  onChange={onInputChange}
                  name="password"
                  placeholder="******************"
                  className={`appearance-none block w-full text-gray-700 mb-4 border-2 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.email ? "border-red-500" : "border-gray-200"}`}
                  id="grid-password"
                  type='password'
                />
                {errors.password ? (
                  <p className="text-red-500 text-xs italic">{errors.password}</p>
                ) : ''}
              </div>
            </div>
            {errors.server ? (
                  <p className="text-red-500 text-xs italic">{errors.server}</p>
                ) : ''}
                <button disabled={loading} className={`w-full mx-auto md:w-1/2 mt-3 mb-4 flex justify-center align-center hover:bg-gray-200 hover:text-gray-900 rounded-md px-2 py-3 uppercase ${loading ? "bg-gray-200  text-black cursor-not-allowed" : "bg-gray-900  text-white cursor-pointer"}`}>
                {loading ? (
                  <>
                    loading &nbsp;...
                  </>
                ) : 'LOG IN'}
                </button>
                <span className="text-blue-600 hover:text-gray-600 pt-2 md:p-6 underline"> <Link href="/register">Register</Link></span>
          </form>
        </div>
      </main>

    </div>
  )
}

export default Login;
