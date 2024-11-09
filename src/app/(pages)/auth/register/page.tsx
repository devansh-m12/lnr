'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { registerSchema, type RegisterInput } from '@/validations/auth';
import AuthForm from '@/components/AuthForm/AuthForm';
import { useToast } from '@/hooks/use-toast';
export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (values: RegisterInput) => {
    console.log(values);
    if (values.password !== values.confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please try again.',
      });
      return;
    }
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    router.push(`/auth/verify?email=${values.email}`);
  };

  const fields = [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
    },
    {
      name: 'email',
      label: 'Email address',
      type: 'email',
      placeholder: 'you@example.com',
      autoComplete: 'email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '••••••••',
      autoComplete: 'new-password',
    }
  ];

  return (
    <AuthForm
      title="Create your account"
      subtitle="Join our community today"
      fields={fields}
      submitLabel="Create account"
      loadingLabel="Creating account..."
      validationSchema={registerSchema}
      onSubmit={onSubmit}
      linkText="Already have an account? Sign in"
      linkHref="/auth/login"
      defaultValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }}
    />
  );
}
