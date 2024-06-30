import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// 新規登録
export const signUp = (params) => {
  return client.post("auth", params);
};

// ログイン
export const signIn = ({ email, password }) => {
  return client.post("auth/sign_in", { email, password });
};

// ログアウト
export const signOut = async (setIsLoggedIn, setCurrentUser) => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");
   
  if (!accessToken|| !clientToken || !uid) {
    return; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  const headers = {
    "access-token": accessToken,
    "client": clientToken,
    "uid": uid,
  };

  try {
    await client.delete("auth/sign_out", { headers });
    // クッキー削除
    document.cookie = '_access_token=; max-age=0;';
    document.cookie = '_client=; max-age=0;';
    document.cookie = '_uid=; max-age=0;';
    setIsLoggedIn(false);
    setCurrentUser(null);
  } catch (e) {
    console.log(e);
  }

}


// ユーザー情報を取得
export const getUser = async() => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken|| !clientToken || !uid) {
    return {isLogin: false}; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  // ヘッダーを設定
  const headers = {
    "access-token": accessToken,
    "client": clientToken,
    "uid": uid,
  };

  // ユーザー情報を取得
  const res = await client.get("/auth/sessions", { headers });
  return res.data;
};
