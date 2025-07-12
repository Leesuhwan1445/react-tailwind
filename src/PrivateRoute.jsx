import { useState } from "react";
import { useVerify } from "./hooks/useVerify";
import { supabase } from "./supabaseClient";

const PrivateRoute = ({ children }) => {
  const [verify, setVerify] = useState(false);
  

  const fetchTodo = async() => {
    const {data, error} = await supabase
    .from('todo')
    .select("*")
    .order("created_at", {ascending:false})
    
    if(error) {
      console.error("Todo 불러오기 실패",error)
    } else {
      console.log(data);
    }
  }

  useVerify({
    onSuccess: async() => {
      await fetchTodo()
      setVerify(true)

    },
    onFailure: () => setVerify(false),
  });

  if (!verify)
    return (
      <div className="m-auto w-screen h-screen flex items-center justify-center">
        <div className="animate-spin w-24 h-24 border-2 border-t-0 border-l-0 border-cyan-800 rounded-full"></div>
      </div>
    );
  return <div>{children}</div>;
};

export default PrivateRoute;
