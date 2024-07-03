import client from "./client";
import { setHeader } from "./setHeader";

// client.httpメソッド（path, params）

// コメント投稿
export const postComment = (rateId, commentBody) => {
  const headers = setHeader();
  if(!headers) return;

  const params = { rateId, commentBody };
  return  client.post("comments", params, { headers });
}

// コメント更新
export const updateComment = (id, commentBody) => {
  const headers = setHeader();
  if(!headers) return;

  const params = { commentBody };
  return  client.put(`comments/${id}`, params, { headers });
}

// コメント削除
export const deleteComment = (id) => {
  const headers = setHeader();
  if(!headers) return;
  
  return  client.delete(`comments/${id}`, { headers });
}