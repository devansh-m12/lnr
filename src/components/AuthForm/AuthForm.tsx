'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  autoComplete?: string;
}

interface AuthFormProps {
  title: string;
  subtitle: string;
  fields: FormField[];
  submitLabel: string;
  loadingLabel: string;
  validationSchema: z.ZodObject<any>;
  onSubmit: (values: any) => Promise<void>;
  linkText: string;
  linkHref: string;
  defaultValues: Record<string, string>;
  successMessage?: string;
}

export default function AuthForm({
  title,
  subtitle,
  fields,
  submitLabel,
  loadingLabel,
  validationSchema,
  onSubmit,
  linkText,
  linkHref,
  defaultValues,
  successMessage,
}: AuthFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await onSubmit(values);
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-gray-900 p-8 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
        <div>
          <h2 className="text-center text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">{subtitle}</p>
        </div>

        {successMessage && (
          <div className="rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-gray-300">
            {successMessage}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-8 space-y-6"
          >
            <div className="space-y-4">
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">{field.label}</FormLabel>
                      <FormControl>
                        <Input
                          {...formField}
                          type={field.type}
                          placeholder={field.placeholder}
                          autoComplete={field.autoComplete}
                          className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-100 placeholder-gray-500 focus:border-white focus:ring-2 focus:ring-white"
                        />
                      </FormControl>
                      <FormMessage className="text-sm text-gray-400" />
                    </FormItem>
                  )}
                />
              ))}
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-700 px-4 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                {loading ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  </span>
                ) : null}
                {loading ? loadingLabel : submitLabel}
              </button>
            </div>
          </form>
        </Form>

        <div className="text-center text-sm">
          <Link
            href={linkHref}
            className="font-medium text-gray-400 transition-colors duration-200 hover:text-gray-300"
          >
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
}