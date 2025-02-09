export type IComment = {
  user_id: number
  author: string
  date: string
  content: string
}

export type ICommentResponse = {
  post_id: string
  content: string
  user_id: number
  status: number
  updated_at: string
  id: string
  created_at: string
}
