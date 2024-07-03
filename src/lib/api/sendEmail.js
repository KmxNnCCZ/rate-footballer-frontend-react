import Cookies from "js-cookie";
import client from "./client";

// client.httpメソッド（path, params）

// 新規登録
export const sendEmail = () => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken || !clientToken || !uid) {
    return { isLogin: false }; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  // ヘッダーを設定
  const headers = {
    "access-token": accessToken,
    client: clientToken,
    uid: uid,
  };

  return client.post("send_email", {}, { headers });
};