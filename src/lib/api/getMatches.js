// import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// 試合を取得する
export const getMatch = (matchday) => {
  return  client.get("matches");
}