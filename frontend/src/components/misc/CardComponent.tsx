import { twMerge } from "tailwind-merge";
import {
	LandingPage_CardElementType,
	OptionalClassnameType,
} from "../../ts/Types";

const CardElement = ({
	child,
	children,
	className,
}: LandingPage_CardElementType & OptionalClassnameType) => {
	return (
		<div
			className={twMerge(
				"stagger text-black bg-gray-200 px-4 py-8 rounded h-full",
				className
			)}
		>
			{child}
			{children?.map((elem) => elem)}
		</div>
	);
};

export default CardElement;
