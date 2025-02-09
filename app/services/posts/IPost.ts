import Tags from '@/app/services/tags/ITag'
import { ICommentsFromGetPostById } from '@/app/services/comments/IComments'
import { User } from '../user/IUser'

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
  comments: ICommentsFromGetPostById[]
  commentCount: number
  viewedCount: number
}

export default Post
