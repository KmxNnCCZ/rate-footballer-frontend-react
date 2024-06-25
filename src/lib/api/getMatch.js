// 試合関連のデータを取得する関数


import client from "./client";

// client.httpメソッド（path, params）

// 試合を取得する
export const getMatchList = (params) => {
  // console.log(params);
  return  client.get("matches", { params });
}

export const getMatch = (matchId) => {
  return client.get(`matches/${matchId}`);
}