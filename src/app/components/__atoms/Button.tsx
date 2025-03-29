import Link, { LinkProps } from "next/link";

interface Props {
  button: string | (LinkProps & { label: string });
}

const Button = ({ button }: Props) => {
  return (
    <div className="w-[370px] h-[55px] bg-[#000000] text-slate-100 rounded-[14px] text-[500] flex items-center justify-center">
      {typeof button === "string" ? (
        <button>{button}</button>
      ) : (
        <Link {...button}>{button.label}</Link>
      )}
    </div>
  );
};

export default Button;
