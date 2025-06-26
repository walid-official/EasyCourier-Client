// src/app/apis/hooks.ts
import { useMutation } from '@tanstack/react-query';
import { signin, signup } from './apis';

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await signup(data);
    },
  });
};

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await signin(data);
    },
  });
};

