import { atom } from "recoil";

export const message = atom({
  key:"message",
  default:[],
})

export const conv = atom({
  key:"conversation",
  default:null,
})
