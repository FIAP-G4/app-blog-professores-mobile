type Comments = {
  id: number
  content: string
  created_at: string
  user: {
    id: number
    name: string
    email: string
  }
}

export default Comments
