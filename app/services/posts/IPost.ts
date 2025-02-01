import User from '@/app/services/user/IUser'
import Tags from '@/app/services/tags/ITag'
import Comments from '@/app/services/comments/IComments'

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
