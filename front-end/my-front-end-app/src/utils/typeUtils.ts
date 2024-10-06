export type ContentSeen = "posts" | "followers" | "following";
export type ChatCategory = "Public" | "Private" | "Hidden" | "Muted";
export type User = "user" | "moderator" | "owner";
export type Message = {
  chat_id: number;
  sender_id: number;
  content: string;
};
