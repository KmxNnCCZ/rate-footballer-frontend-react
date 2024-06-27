// 採点、評価を投稿する関数

import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）


export const postRate = (matchApiId, team, playerRates) => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");
   
  if (!accessToken|| !clientToken || !uid) {
    console.log("ログインしてください")
    return; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  const headers = {
    "access-token": accessToken,
    "client": clientToken,
    "uid": uid,
  };

  const params = { matchApiId, team, playerRates };
  return  client.post("rates", params, { headers });
}