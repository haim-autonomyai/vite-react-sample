interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}

function FormInput(props: FormInputProps) {
  return (
    <div className="form__field mb-4">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className={`
          w-full
          px-4
          py-2
          rounded-lg
          border
          focus:outline-none
          transition-colors
          ${props.error
            ? 'border-red-500 focus:ring-2 focus:ring-red-200'
            : 'border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-500'
          }
        `}
      />
      {props.error && (
        <p className="form__error mt-2 text-sm text-red-600">
          {props.error}
        </p>
      )}
    </div>
  );
}

export default FormInput;
