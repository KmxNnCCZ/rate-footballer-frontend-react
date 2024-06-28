import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// 採点、評価を投稿
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


// 採点一覧を取得
export const getRateList = () => {
  return client.get("rates");
}