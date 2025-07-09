import React from 'react'

const Onetime = () => {
  return (
    <div>
        <div className="text-sm text-gray-600 mb-2 text-center leading-tight">
          네이버앱의 메뉴, 설정, 로그인 아이디 관리, 더보기, 일회용 로그인 번호에 보이는 번호를 입력해 주세요.
        </div>
        <button className="w-full border border-gray-400 py-2 rounded-md mb-2">번호를 입력하세요</button>
        <button className="w-full bg-green-600 text-white py-2 rounded-md">로그인</button>
    </div>
  )
}

export default Onetime