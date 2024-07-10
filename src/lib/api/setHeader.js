import Cookies from "js-cookie";

export const setHeader = () => {
  const accessToken = Cookies.get("_access_token");
  const client = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken|| !client || !uid) {
    return null; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  // ヘッダーを設定
  return {
    "access-token": accessToken,
    "client": client,
    "uid": uid,
  };
};