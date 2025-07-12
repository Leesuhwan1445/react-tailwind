// Todo.jsx영역 안에 컴포넌트를 TodoContent.jsx를 만듦 아래와 같이 여러 동작들과 이벤트를 
// 함수와 리액트문법 및 tailwind문법을 활용해서 만들었음 존나 어려움... 나 혼자서는 절대 불가능했고 구글검색과 chatGPT의 질문과 답변으로 이루어져서 만들었음
// 구조적인 부분들과 해당하는 코드의 동작원리와 의도를 메모하면서 진행 들어갔음 너무 어려움..
// 제일 중요한건 투두리스트를 만들때 사용되는 함수들이 keypoint 비동기와 동기,원리를 알아야 하고 기본적인 함수와 화살표 함수의 문법 
// 컴포넌트 라우팅, (useEffect useState fetch e.preventDefault()) 문법등 알아야 할것들이 너무나도 많고 스타일쪽으로 간다면 tailwindcss의 기본문법도 숙지해야 하며 tailwindcss를 사용
// 할 때에 사용되는 삼항연산자를 통해서 true/false 즉, 내가 원하는 상태변화를 화면에 구현 할 줄 알아야 한다 이 외에도 내가 놓친것들이 너무나도 많기때문에 한번에 숙지하기에는 너무 어려운 과제
// 꾸준히 혼자서 만들어보고 익숙해질때까지 하는것이 중요

import React, { useRef, useEffect } from "react";
import { todoStore, userStore } from "./const/store";
import { supabase } from "./supabaseClient";
import dayjs from "dayjs"; 


const TodoContent = () => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const { todo, initTodo } = todoStore();
  const { user } = userStore();

  // 투두 가져오기
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todo")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("불러오기 실패", error);
      return;
    }

    initTodo(data); // 전역 상태에 저장
  };

  // 투두 추가
  const handleSubmit = async (formdasu) => {
    formdasu.preventDefault(); // formdasu.preventDefault() << .preventDefault() 원래 페이지가 새로고침 되는 기본 행동을 막는 메서드이다 form태그의 기본동작은 "페이지 새로고침 + 서버전송인데, 나는 리액트 안에서 자바스크립트로 처리할거라 막기 위한 코드"
    const { error } = await supabase.from("todo").insert({ //DB에 새로운 todo 추가
      user_id: user.id, //user_id , title , content들은 다 supabase에서 설정된 내용들
      title: titleRef.current.value, 
      content: contentRef.current.value, 
      marked: false, // 새로 추가된 투두는 기본적으로 미완료 상태를 뜻하는 코드
    });

    if (error) {
      alert("추가 실패");
      return;
    }

    titleRef.current.value = ""; //타이틀 입력 초기화 (즉,제목입력칸이 초기화가 되게끔 하는 코드)
    contentRef.current.value = ""; //내용 입력 초기화 (즉,내용입력칸이 초기화가 되게끔 하는 코드)
    fetchTodos();
  };

  // 완료/취소 버튼 누르면 marked 토글
  const handleToggle = async (item) => {
    const { error } = await supabase
      .from("todo")
      .update({ marked: !item.marked })
      .eq("id", item.id);

    if (error) {
      alert("상태 변경 실패");
      return;
    }

    fetchTodos();
  };

  // 삭제 기능 (선택사항)
  const handleDelete = async (item) => {
    const { error } = await supabase.from("todo").delete().eq("id", item.id);
    if (error) {
      alert("삭제 실패");
      return;
    }
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      {/* 투두 목록 출력 */}
      {todo.map((item) => (
        <div key={item.id}className={`flex flex-col p-2 rounded-sm gap-1 ${item.marked ? "bg-green-100" : "bg-rose-100"}`}>
          <div className="flex items-center justify-between">
            <p className={`${item.marked ? "text-green-800" : "text-rose-800"} font-semibold`}>{item.title}</p>
            <div className="flex gap-2 text-sm items-center">
                <span className="text-gray-500">{dayjs(item.created_at).format("YYYY-MM-DD")}</span>
              <button onClick={() => handleToggle(item)}className="bg-green-500 text-white px-2 py-1 text-xs rounded">{item.marked ? "취소" : "완료"}</button>
              <button onClick={() => handleDelete(item)}className="bg-red-500 text-white px-2 py-1 text-xs rounded">삭제</button>
            </div>
          </div>
          <p className={item.marked ? "line-through text-gray-700" : ""}>{item.content}</p>
        </div>
      ))}

      {/* 투두 입력 폼 */}
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 p-2 absolute bottom-[70px] left-0 w-full bg-white"
      >
        <input
          required
          className="flex-1 p-1 rounded-sm border border-gray-300"
          placeholder="제목 입력..."
          ref={titleRef}
        />
        <input
          required
          className="flex-1 p-1 rounded-sm border border-gray-300"
          placeholder="내용 입력..."
          ref={contentRef}
        />
        <button
          type="submit"
          className="text-white cursor-pointer w-[80px] bg-blue-500 rounded-sm"
        >
          추가
        </button>
      </form>
    </div>
  );
};

export default TodoContent;
