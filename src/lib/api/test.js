import client from "./client";

// client.httpメソッド（path, params）


// テストデータを取得する
export const getTestData = (path) => {
  const params = { path };
  return  client.get("test", { params });
}