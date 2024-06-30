import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// コメント投稿
export const postComment = (rateId, commentBody) => {
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

  const params = { rateId, commentBody };
  return  client.post("comments", params, { headers });
}

// コメント更新
export const updateComment = (id, commentBody) => {
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

  const params = { commentBody };
  return  client.put(`comments/${id}`, params, { headers });
}

// コメント削除
export const deleteComment = (id) => {
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
  return  client.delete(`comments/${id}`, { headers });
}