import Link, { LinkProps } from "next/link";

interface Props {
  button: string | (LinkProps & { label: string });
  type?: "button" | "submit" | "reset";
}

const Button = ({ button, type }: Props) => {
  // Check if button is a string or an object with Link props
  return (
    <div className="w-[370px] h-[55px] bg-[#000000] text-slate-100 rounded-[14px] text-[500]  flex items-center justify-center">
      {typeof button === "string" ? (
        <button
          type={type}
          className="w-full h-full flex items-center justify-center cursor-pointer"
        >
          {button}
        </button>
      ) : (
        <Link
          {...button}
          className="w-full h-full flex items-center justify-center"
        >
          {button.label}
        </Link>
      )}
    </div>
  );
};

export default Button;
