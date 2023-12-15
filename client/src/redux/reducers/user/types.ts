import { IUser } from '../../../models/IUser'

export interface UserState {
  user: IUser
  isLogged: boolean
}

export interface ILoginProps {
  email: string
  password: string
}

export interface IRegProps {
  name: string
  email: string
  password: string
}
