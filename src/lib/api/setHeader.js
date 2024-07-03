import Cookies from "js-cookie";

export const setHeader = () => {
  const accessToken = Cookies.get("_access_token");
  const clientToken = Cookies.get("_client");
  const uid = Cookies.get("_uid");

  if (!accessToken|| !clientToken || !uid) {
    return null; // 必要なクッキーが揃っていない場合、何もせずに終了
  }

  // ヘッダーを設定
  return {
    "access-token": accessToken,
    "client": clientToken,
    "uid": uid,
  };
};