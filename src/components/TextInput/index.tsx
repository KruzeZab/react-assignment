import './index.scss';

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const TextInput = (props: TextInputProps) => {
  const { value, onChange, placeholder } = props;

  return (
    <input
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
      className="form-control"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default TextInput;
