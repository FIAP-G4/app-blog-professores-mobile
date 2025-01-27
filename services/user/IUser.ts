import Student from '@/services/student/IStudent'
import Teacher from '@/services/teachers/ITeacher'

type User = {
  id: number
  email: string
  name: string
  students: Student[]
  teachers: Teacher[]
}

export default User
