'use client';

import React, { Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginSchema, type LoginInput } from '@/validations/auth';
import AuthForm from '@/components/AuthForm/AuthForm';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (values: LoginInput) => {
    // Check email status first
    const emailCheck = await fetch('/api/auth/check-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: values.email }),
    });

    const emailCheckData = await emailCheck.json();

    if (!emailCheck.ok) {
      throw new Error(emailCheckData.error);
    }

    // Proceed with sign in if email check passes
    const result = await signIn('credentials', {
      username: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    router.push('/home');
    router.refresh();
  };

  const fields = [
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
      autoComplete: 'current-password',
    },
  ];

  return (
    <AuthForm
      title="Sign in to your account"
      subtitle="Welcome back"
      fields={fields}
      submitLabel="Sign in"
      loadingLabel="Signing in..."
      validationSchema={loginSchema}
      onSubmit={onSubmit}
      linkText="Don't have an account? Register"
      linkHref="/auth/register"
      defaultValues={{
        email: '',
        password: '',
      }}
      successMessage={
        searchParams.get('registered')
          ? 'Registration successful! Please sign in.'
          : undefined
      }
    />
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
