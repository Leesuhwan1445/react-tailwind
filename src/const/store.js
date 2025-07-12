import { create } from "zustand";

export const userStore = create(set => ({
    user: null, // 유저 초기 설정
    initUser: (data) => set(() => ({user:data})), // 유저 초기화
    clearUser : () => set(() => ({user:null})), 
}));


export const todoStore = create((set) => ({
    todo : [], // 투두 초기설정
    initTodo : (data) => set(()=> ({todo:data})), // 투두 초기화
    clearTodo : () => set(() => ({user:null})), 
}));