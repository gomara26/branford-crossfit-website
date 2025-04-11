import { useState, useCallback } from "react";

type ValidationRule<T> = (value: T) => string | null;

interface FormField<T> {
  value: T;
  error: string | null;
  touched: boolean;
}

export interface UseFormResult<T extends Record<string, any>> {
  values: T;
  errors: Record<keyof T, string | null>;
  touched: Record<keyof T, boolean>;
  handleChange: (field: keyof T, value: any) => void;
  handleBlur: (field: keyof T) => void;
  setFieldValue: (field: keyof T, value: any) => void;
  setFieldError: (field: keyof T, error: string | null) => void;
  resetForm: () => void;
  isValid: boolean;
  isDirty: boolean;
}

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationRules?: Partial<Record<keyof T, ValidationRule<any>>>
): UseFormResult<T> {
  const [fields, setFields] = useState<Record<keyof T, FormField<any>>>(() => {
    const initial: Record<string, FormField<any>> = {};
    for (const [key, value] of Object.entries(initialValues)) {
      initial[key] = {
        value,
        error: null,
        touched: false,
      };
    }
    return initial as Record<keyof T, FormField<any>>;
  });

  const validate = useCallback((name: keyof T, value: any): string | null => {
    if (!validationRules || !validationRules[name]) return null;
    return validationRules[name]!(value);
  }, [validationRules]);

  const handleChange = useCallback((name: keyof T, value: any) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        value,
        error: validate(name, value),
        touched: true,
      },
    }));
  }, [validate]);

  const handleBlur = useCallback((name: keyof T) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        touched: true,
        error: validate(name, prev[name].value),
      },
    }));
  }, [validate]);

  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        error: validate(name, value),
      },
    }));
  }, [validate]);

  const setFieldError = useCallback((name: keyof T, error: string | null) => {
    setFields(prev => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
      },
    }));
  }, []);

  const resetForm = useCallback(() => {
    const initial: Record<string, FormField<any>> = {};
    for (const [key, value] of Object.entries(initialValues)) {
      initial[key] = {
        value,
        error: null,
        touched: false,
      };
    }
    setFields(initial as Record<keyof T, FormField<any>>);
  }, [initialValues]);

  const values = Object.keys(fields).reduce((acc, key) => {
    acc[key as keyof T] = fields[key as keyof T].value;
    return acc;
  }, {} as T);

  const errors = Object.keys(fields).reduce((acc, key) => {
    acc[key as keyof T] = fields[key as keyof T].error;
    return acc;
  }, {} as Record<keyof T, string | null>);

  const touched = Object.keys(fields).reduce((acc, key) => {
    acc[key as keyof T] = fields[key as keyof T].touched;
    return acc;
  }, {} as Record<keyof T, boolean>);

  const isValid = !Object.values(errors).some(error => error !== null);
  const isDirty = Object.values(touched).some(t => t);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    setFieldValue,
    setFieldError,
    resetForm,
    isValid,
    isDirty,
  };
} 