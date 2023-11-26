import axios from 'axios';

import { useDispatch } from 'react-redux';
import { setIsLogged, setUser } from '../redux/reducers/user/slice';

import { AuthService } from '../services';

import { AuthResponse } from '../models/response/AuthResponse';
import { IUser } from '../models/IUser';

export const useLogin = () => {
  const dispatch = useDispatch();

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch(setUser(response.data.user));
      dispatch(setIsLogged(true));
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  };

  return login;
};

export const useRegistration = () => {
  const dispatch = useDispatch();

  const registration = async (name: string, email: string, password: string) => {
    try {
      const response = await AuthService.registration(name, email, password);
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch(setUser(response.data.user));
      dispatch(setIsLogged(true));
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  };

  return registration;
};

export const useLogout = () => {
  const dispatch = useDispatch();

  const registration = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem('accessToken');
      dispatch(setUser({} as IUser));
      dispatch(setIsLogged(false));
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  };

  return registration;
};

export const useCheckAuth = () => {
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_SERVER_URL}/auth/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      dispatch(setUser(response.data.user));
      dispatch(setIsLogged(true));
    } catch (error: any) {
      console.error(error.response?.data?.message);
    }
  };

  return checkAuth;
};
