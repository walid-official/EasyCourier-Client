'use client';
import AuthForm from '@/components/auth/AuthForm';
// import AuthForm from '@/app/components/AuthForm';
import React from 'react';

const SignInPage: React.FC = () => {
  return (
    <div className='min-h-screen flex items-center bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      <div className="w-[40%] mx-auto">
        <AuthForm isRegister={false} />
      </div>
    </div>
  ) 
    
};

export default SignInPage;
