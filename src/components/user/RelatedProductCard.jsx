import React from "react";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const RelatedProductCard = ({ product }) => {
	const navigate = useNavigate();

	const handleProductDetails = () => {
		window.scrollTo({ top: 0 });
		navigate(`/productDetials/${product._id}`);
	};

	return (
		<div
			className="bg-white rounded-lg p-4 flex flex-col justify-center items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 transform hover:scale-105"
			onClick={handleProductDetails}
		>
			<div className="w-full h-44 sm:h-52 flex items-center justify-center overflow-hidden mb-4">
				<img
					className="w-full h-full object-contain"
					src={product.thumbnail}
					alt={product.productName}
				/>
			</div>
			<div className="text-center mb-2">
				<span className="text-md sm:text-lg font-semibold">
					{product.productName}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm sm:text-md font-medium">
					₹{product.salePrice}
				</span>
				<PiLineVerticalThin className="text-gray-400" />
				<span className="text-yellow-400 text-xs sm:text-sm font-medium">
					4.7
				</span>
				<svg
					className="w-4 h-4 text-yellow-400"
					fill="currentColor"
					viewBox="0 0 20 20"
				>
					<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
				</svg>
			</div>
		</div>
	);
};

export default RelatedProductCard;
