// ユーザー情報変更

import client from "./client";
import { setHeader } from "./setHeader";


// パスワード変更のためのメール送信
export const sendChangeRequest = (email) => {
  const params = { email}
  return client.post("/auth/password", params);
};

// パスワード変更権限を持っているか確認
export const hasPermission = async (token) => {
  try {
    const response = await client.get("/auth/password/edit", {
      params: { token } // クエリパラメータとしてトークンを渡す
    });
    return response.request.status
  } catch (e) {
    return e.response.status
  }
}

// パスワード更新
export const updatePassword = (token, password) => {
  return client.put("/auth/password", {token, password});
};


// ユーザー名、メールアドレス更新
export const updateUserInformation = (params) => {
  const headers = setHeader();
  if(!headers) return;
  return client.put("/auth", params, { headers })
}
