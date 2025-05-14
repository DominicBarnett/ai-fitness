import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: (credentials) => api.post('/auth/login', credentials),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const register = useMutation({
    mutationFn: (userData) => api.post('/auth/register', userData),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const logout = useMutation({
    mutationFn: () => {
      localStorage.removeItem('token');
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      queryClient.clear();
    },
  });

  return {
    login,
    register,
    logout,
  };
}; 