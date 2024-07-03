import client from "./client";
import { setHeader } from "./setHeader";

// client.httpメソッド（path, params）

// 新規登録
export const sendEmail = () => {
  const headers = setHeader();
  if(!headers) return;

  return client.post("send_email", {}, { headers });
};