type IComments = {
  id: string
  content: string
  created_at: string
  user: {
    id: number
    name: string
    email: string
  }
}

export default IComments
