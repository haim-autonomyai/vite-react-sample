interface InputProps {
  type?: string;
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function Input(props: InputProps) {
  return (
    <div className="input__container w-full">
      {props.label && (
        <label className="input__label block text-sm font-medium text-gray-700 mb-2">
          {props.label}
        </label>
      )}
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        className="
          input__field
          w-full
          px-4
          py-2
          border
          border-gray-300
          rounded-lg
          text-gray-900
          placeholder-gray-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          focus:border-transparent
          transition-all
        "
      />
    </div>
  );
}

export default Input;
