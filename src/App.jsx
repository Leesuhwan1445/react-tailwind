import { useRef, useState } from 'react';
import './App.css'
import Onetime from './Onetime';
import Qr from './Qr';
import { supabase } from './supabaseClient';


function App() {

  const [tap, setTap] = useState(0);

  const pwRef = useRef(null);
  const idRef = useRef(null);
  const [ setlogined ] = useState(false);
  const [ setUserData ] = useState([]);

  const handleLogin = async() => {
    const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("user_id",idRef.current.value)
    .eq("user_pw",pwRef.current.value)


    if(error || data?.length === 0) {
      return alert("이메일 또는 비밀번호가 올바르지 않습니다.")
    }


    alert("로그인 되었습니다.")
    setlogined(true);
    setUserData();

  }

  const findPassword = async () => {
    const userId = prompt("아이디를 입력해주세요")
    const userName = prompt("닉네임을 입력해주세요")

    const {data, error} = await supabase
    .from ('user')
    .select('*')
    .eq('user_id',userId)
    .eq('user_name',userName);
    if(error || data?.length === 0) {
      return alert("아이디나 닉네임이 일치하지 않습니다.")
    }
    const password = data[0].user_pw
    const maskedPassword = 
    password.slice(0.2) + "*".repeat(password.length - 2)

    alert(`비밀번호는 ${maskedPassword} 입니다`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-[400px] border border-gray-200 flex flex-col p-4">
        <div className="text-green-600 text-3xl font-bold text-center mb-4">NAVER</div>

        <div className="flex flex-col border border-gray-200 p-4 mb-4">
          <div className="flex justify-center mb-5">
            <button 
            onClick={() => {setTap(0)}}
            className="flex-1 p-2 border border-gray-400 hover:bg-green-300 transition">ID/전화번호</button>
            <button 
            onClick={() =>{ setTap(1)}}
            className="flex-1 p-2 border border-gray-400 hover:bg-green-300 transition">일회용번호</button>
            <button 
            onClick={() => {setTap(2)}}
            className="flex-1 p-2 border border-gray-400 hover:bg-green-300 transition">QR코드</button>
          </div>

          {
            tap === 0 ? (
              <div>
                <div className="flex flex-col mb-3">
              <input 
                ref = {idRef} type="text" placeholder="아이디 또는 전화번호" className="h-10 px-3 border border-gray-400 outline-none"/>
              <input
                ref = {pwRef}
                type="password" placeholder="비밀번호" className="h-10 px-3 border border-gray-400 outline-none"/>
                </div>
            <div className="flex justify-between items-center text-sm text-gray-700 mb-3">
              <div className="flex items-center gap-1">
                <input id="유지" type="checkbox" className="accent-green-600" />
                <label htmlFor="유지">로그인 상태 유지</label>
              </div>
              <div className="flex items-center gap-1">
                <label htmlFor="유지2">ip보안</label>
                <input id="유지2" type="checkbox" className="accent-green-600" />
              </div>
            </div>
            <div className="mb-3">
              <button 
              onClick = {handleLogin}
              className="w-full bg-gray-600 text-white py-2 rounded">로그인</button>
              <div className="text-center text-xs text-gray-500 mt-2">------------지문 , 얼굴 인증을 설정했다면------------</div>
              <button className="w-full border-2 border-green-600 text-green-600 py-2 rounded-md">패스키 로그인</button>
            </div>
              </div>
            ) : ( tap === 1 ? (<div><Onetime></Onetime></div> ) : (<Qr></Qr>))}


        </div>

        <div className="flex justify-center gap-2 mb-4 text-sm">
          <button className="text-gray-600">회원가입</button>
          <button className="text-gray-600">아이디 찾기</button>
          <button onClick={findPassword} className="text-gray-600">비밀번호 찾기</button>
        </div>

      </div>
    </div>
    

  );

}


export default App;
