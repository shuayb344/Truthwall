
export interface User {
  id: string;
  email: string;
  alias: string;
  avatar?: string;
  empathyScore: number;
  role: "user" | "admin";
}
 
export type Category = "mental-health" | "relationships" | "work" | "family" | "identity";
export type ReactionType = "feel_this" | "not_alone" | "stay_strong" | "sending_strength";
 
export interface Post {
  _id: string;
  isBookmarked?: boolean;
  content: string;
  image?: string;
  category: Category;
  authorAlias: string;
  reactionCounts: Record<ReactionType, number>;
  commentCount: number;
  expiresAt: string;
  isPermanent: boolean;
  crisis: {
    flagged: boolean;
    severity: "low" | "medium" | "high" | null;
  };
  createdAt: string;
}

export interface Comment {
  _id: string;
  postId: string;
  authorAlias: string;
  content: string;
  createdAt: string;
}
 

export type NotificationType = "reaction" | "comment";
 
export interface Notification {
  _id: string;
  type: NotificationType;
  postId: string;
  message: string;
  read: boolean;
  createdAt: string;
}
 

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
 
export interface AuthResponse {
  token: string;
  user: User;
}
 
export interface FeedResponse {
  posts: Post[];
  pagination: Pagination;
}
 
export interface CommentsResponse {
  comments: Comment[];
  pagination: Pagination;
}
 
export interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}
