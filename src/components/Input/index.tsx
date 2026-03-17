import React from 'react';

interface InputProps {
  type: 'text' | 'email' | 'password';
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
}

function Input(props: InputProps) {
  return (
    <input
      className='input__field'
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      name={props.name}
      required={props.required}
    />
  );
}

export default Input;
