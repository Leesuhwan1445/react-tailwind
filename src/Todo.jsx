import { useNavigate } from "react-router-dom";
import { todoStore, userStore } from "./const/store"
import { supabase } from "./supabaseClient";
import TodoContent from "./TodoContent";

const Todo = () => {
  const {user, clearUser} = userStore();
  const {clearTodo} = todoStore();
  const {navigate} = useNavigate();

  const handleLogout = () => {
    supabase.auth.signOut();
    clearUser();
    clearTodo();
    navigate("/")
  }

  return (
 <>
<div className="bg-black w-screen flex justify-between items-center text-white px-4 py-2 border-b border-gray-500">
  <div>{user.email} 안녕하세요</div>
  <div>I DO I DO 리스트</div>
  <button onClick={handleLogout} className="border-2 border-white px-2 py-1">
    로그아웃
  </button>
</div>

      <main className="min-w-full min-h-full bg-blue-500">
        <TodoContent />
      </main>
      
      <footer className="absolute bottom-0 w-full bg-slate-950 h-[60px] text-white flex items-center justify-center">
        Leesuhwan's TodoList
      </footer>
</>
  )
}

export default Todo;