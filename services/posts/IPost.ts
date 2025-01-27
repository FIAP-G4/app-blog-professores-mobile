import User from '@/services/user/IUser'
import Tags from '@/services/tags/ITags'
import Comments from '@/services/comments/IComments'

type Post = {
  id: string
  title: string
  content: string
  path_img: string
  status: number
  created_at: string
  updated_at: string
  teacher_id: number
  teacher?: {
    user?: {
      name?: string
    } & User
  }
  tags: Tags[]
  comments: Comments[]
  commentCount: number
  viewedCount: number
}

export default Post
