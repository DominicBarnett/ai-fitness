import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const login = useMutation({
    mutationFn: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.setQueryData(['user'], data.user);
    },
  });

  const register = useMutation({
    mutationFn: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response;
    },
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