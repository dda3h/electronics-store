import { $api } from '../axios'

import { AxiosResponse } from 'axios'
import { IUser } from '../models/IUser'

export const fetchUsers = (): Promise<AxiosResponse<IUser[]>> => {
  return $api.get<IUser[]>('/auth/users')
}
