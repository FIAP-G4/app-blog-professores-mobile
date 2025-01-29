import Student from '@/app/services/student/IStudent'
import Teacher from '@/app/services/teachers/ITeacher'

type User = {
  id: number
  email: string
  name: string
  students: Student[]
  teachers: Teacher[]
}

export default User
