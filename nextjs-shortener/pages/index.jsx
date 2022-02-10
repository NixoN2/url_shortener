import { useContext, useEffect } from "react";
import AuthContext from "../lib/context";
import { useRouter } from "next/router";

const Home = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const router = useRouter();
  useEffect(()=> {
    if (isLoggedIn) {
      return router.push("/dashboard");
    }
    return router.push("/login");
  }, [isLoggedIn]);
  return null;
}


export default Home;
