'use client';
import AuthForm from '@/components/auth/AuthForm';
// import AuthForm from '@/app/components/AuthForm';
import React from 'react';

const SignupPage: React.FC = () => {
  return (  
    <div className='bg-gradient-to-br from-blue-50 to-purple-100 p-4'>
      <div className="w-[40%] mx-auto">
       <AuthForm isRegister={true} />
      </div>
    </div>
  )
};

export default SignupPage;
