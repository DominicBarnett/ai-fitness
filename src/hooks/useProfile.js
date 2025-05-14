import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../utils/api';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile'),
    enabled: !!localStorage.getItem('token'),
  });

  const updateProfile = useMutation({
    mutationFn: (profileData) => api.put('/profile', profileData),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile'], data);
    },
  });

  return {
    profile,
    isLoading,
    error,
    updateProfile,
  };
}; 