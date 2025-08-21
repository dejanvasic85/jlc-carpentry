import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
  helperText?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;
    const hasError = !!error;

    return (
      <div>
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jlc-blue focus:border-jlc-blue transition-colors ${
            hasError ? 'border-red-300' : 'border-slate-300'
          } ${className}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {hasError && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-red-600">
            {error.message}
          </p>
        )}
        {helperText && !hasError && (
          <p id={`${inputId}-helper`} className="mt-1 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
