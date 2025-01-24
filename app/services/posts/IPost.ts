type User = {
  id: number
  email: string
  name: string
  students: Student[]
  teachers: Teacher[]
}

type Student = {
  id: number
  email: string
  name: string
}

type Teacher = {
  id: number
  email: string
  name: string
}

type Tags = {
  id: number
  name: string
}

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

export type Post = {
  id: string
  title: string
  content: string
  path_img: string
  status: number
  created_at: string
  updated_at: string
  teacher_id: number
  teacher: object
  tags: Tags[]
  comments: Comments[]
  commentCount: number
  viewedCount: number
}
