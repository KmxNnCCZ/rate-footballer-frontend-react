// 試合関連のデータを取得する関数


import client from "./client";

// client.httpメソッド（path, params）

// 試合を取得する
export const getMatchList = (params) => {
  // console.log(params);
  return  client.get("matches", { params });
}

export const getMatch = (matchApiId) => {
  return client.get(`matches/${matchApiId}`);
}

export const getTeam = (matchApiId, team) => {
  return client.get(`matches/${matchApiId}?team=${team}`);
}