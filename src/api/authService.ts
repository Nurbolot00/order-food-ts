import { UserRoles } from '../common/types'
import { mainApi } from './instances'


type SignInResponse = {
  data:{
    token: string
    user:{
      role: UserRoles
      email: string
      name:string
    }
  }
}
export const signUpRequest = (data:{name: string; email:string; password: string}) => {
  return mainApi.post('/auth/register', data)
}

export const signInRequest = (data:{email:string; password: string}) => {
  return mainApi.post<SignInResponse>('/auth/login', data)
}
