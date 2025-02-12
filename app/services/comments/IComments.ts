export type IComments = {
  id: string
  content: string
  created_at: string
  user: {
    id: number
    name: string
    email: string
  }
}

export type ICommentsFromGetPostById = {
  content: string
  created_at: string
  id?: string
  post_id: string
  status?: number
  updated_at?: string
  user: {
    name: string
  }
  user_id?: number
}
