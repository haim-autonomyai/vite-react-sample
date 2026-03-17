interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

function Input(props: InputProps) {
  return (
    <div className="input__wrapper">
      <input
        className="input__field"
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
      />
      {props.error && <p className="input__error">{props.error}</p>}
    </div>
  );
}

export default Input;
