import client from "./client";
import Cookies from 'js-cookie';
import { setHeader } from "./setHeader";

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
  const headers = setHeader();
  if(!headers) return;

  try {
    const res = await client.delete("auth/sign_out", { headers });
    // クッキー削除
    Cookies.remove('_access_token');
    Cookies.remove('_client');
    Cookies.remove('_uid');
    setIsLoggedIn(false);
    setCurrentUser(null);
    return res;
  } catch (e) {
    console.log(e);
  }

}


// ユーザー情報を取得
export const getUser = async() => {
  const headers = setHeader();
  if(!headers) {
    return {success: false}
  };
  // ユーザー情報を取得
  try {
    const res = await client.get("/auth/validate_token", { headers });
    return res.data;
  } catch (error) {
    console.error('ユーザー情報の取得中にエラーが発生しました', error);
    return { isLogin: false };
  }
};
