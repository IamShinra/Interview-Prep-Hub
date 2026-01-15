import React from 'react';

const FormInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  disabled,
  maxLength,
  minLength,
  className,
}) => {
  return (
    <div className='flex flex-col'>
      <label className='text-sm mb-3'>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        minLength={minLength}
        className={className}
      />
    </div>
  );
};

export default FormInput;

