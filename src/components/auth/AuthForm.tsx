'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSigninMutation, useSignupMutation } from '@/apis/auth/queries';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import GoogleAuthSection from './GoogleAuthSection';

type FormData = {
  name?: string;
  email: string;
  password: string;
  role?: 'shop owner' | 'delivery man';
  avatar?: string;
};

const AuthForm = ({ isRegister }: { isRegister: boolean }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { mutate: signup, isPending: isSignupLoading } = useSignupMutation();
  const { mutate: signin, isPending: isSigninLoading } = useSigninMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    const action = isRegister ? signup : signin;
    console.log(data)
    action(data, {
      onSuccess: () => {
        alert(`${isRegister ? 'Registered' : 'Logged in'} successfully!`);
      },
      onError: () => {
        alert('Something went wrong!');
      },
    });
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Only image files allowed');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      const imageUrl = data.url;

      setAvatarUrl(imageUrl); // show preview
      setValue('avatar', imageUrl); // save in form
    } catch (err) {
      console.error(err);
      alert('Image upload failed!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4"
    >
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            {isRegister ? (
              <UserPlus className="text-blue-500" />
            ) : (
              <LogIn className="text-green-500" />
            )}
            {isRegister ? 'Create an Account' : 'Login to Your Account'}
          </CardTitle>
          <CardDescription>
            {isRegister ? 'Join the revolution 🚀' : 'Welcome back 👋'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {isRegister && (
              <>
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register('name', { required: true })} placeholder="John Doe" />
                  {errors.name && <p className="text-sm text-red-500">Name is required</p>}
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select
                    onValueChange={(val) => setValue('role', val as FormData['role'])}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shop owner">Shop Owner</SelectItem>
                      <SelectItem value="delivery man">Delivery Man</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-sm text-red-500">Role is required</p>}
                </div>

                <div>
                  <Label htmlFor="avatar">Avatar</Label>
                  <Input id="avatar" type="file" accept="image/*" onChange={handleAvatarChange} />
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt="avatar preview"
                      width={64}
                      height={64}
                      className="rounded-full mt-2 border"
                    />
                  )}
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email', { required: true })}
              />
              {errors.email && <p className="text-sm text-red-500">Email is required</p>}
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                {...register('password', { required: true })}
              />
              {errors.password && <p className="text-sm text-red-500">Password is required</p>}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isRegister ? isSignupLoading : isSigninLoading}
            >
              {isRegister ? 'Register' : 'Login'}
            </Button>
            <GoogleAuthSection />
            <p className="text-center text-sm mt-4 text-muted-foreground">
              {isRegister ? (
                <>
                  Already have an account?{' '}
                  <Link href="/signin" className="text-blue-600 cursor-pointer hover:underline font-medium">
                    Login
                  </Link>
                  
                </>
              ) : (
                <>
                  Don’t have an account?{' '}
                  <Link href="/signup" className="text-blue-600 cursor-pointer hover:underline font-medium">
                    Register
                  </Link>
                </>
              )}
            </p>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AuthForm;
