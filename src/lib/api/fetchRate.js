import client from "./client";
import { setHeader } from "./setHeader";

// client.httpメソッド（path, params）

// 採点、評価を投稿
export const postRate = (matchApiId, team, playerRates) => {
  const headers = setHeader();
  if(!headers) return;

  const params = { matchApiId, team, playerRates };
  return  client.post("rates", params, { headers });
}


// 採点一覧を取得
export const getRateList = () => {
  return client.get("rates");
}


// rateIdの採点を取得
export const getRate = (rateId) => {
  return client.get(`rates/${rateId}`);
}


// rateの編集ページ
export const editRate = (rateId) => {
  return client.get(`rates/${rateId}/edit`);
}

// rate更新
export const putRate = (matchApiId, teamId, playerRates, rateId) => {
  const headers = setHeader();
  if(!headers) return;

  const params = { matchApiId, teamId, playerRates };
  return client.put(`rates/${rateId}`, params, {headers})
}

// rateの削除
export const deleteRate = (rateId) => {
  const headers = setHeader();
  if(!headers) return;

  return client.delete(`rates/${rateId}`, { headers })
}