import './index.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  className: string;
}

const Button = (props: ButtonProps) => {
  const { onClick, text, className } = props;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
