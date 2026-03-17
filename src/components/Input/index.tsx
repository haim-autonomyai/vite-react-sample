interface InputProps {
  label: string;
  type: 'email' | 'password' | 'text';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

function Input(props: InputProps) {
  return (
    <div className='login__form-group'>
      <label className='login__label' htmlFor={props.label}>
        {props.label}
      </label>
      <input
        id={props.label}
        className={`login__input ${props.error ? 'login__input--error' : ''}`}
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        disabled={props.disabled}
        aria-describedby={props.error ? `${props.label}-error` : undefined}
      />
      {props.error && (
        <p id={`${props.label}-error`} className='login__error'>
          {props.error}
        </p>
      )}
    </div>
  );
}

export default Input;
