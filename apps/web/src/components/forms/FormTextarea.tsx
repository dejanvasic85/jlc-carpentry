import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: FieldError;
  helperText?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const textareaId = id || props.name;
    const hasError = !!error;

    return (
      <div>
        <label htmlFor={textareaId} className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-jlc-blue focus:border-jlc-blue transition-colors resize-vertical ${
            hasError ? 'border-red-300' : 'border-slate-300'
          } ${className}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined}
          {...props}
        />
        {hasError && (
          <p id={`${textareaId}-error`} className="mt-1 text-sm text-red-600">
            {error.message}
          </p>
        )}
        {helperText && !hasError && (
          <p id={`${textareaId}-helper`} className="mt-1 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
