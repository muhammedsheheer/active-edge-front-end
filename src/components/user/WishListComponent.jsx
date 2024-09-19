// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { MdDeleteSweep } from "react-icons/md";
// import { FaShoppingCart } from "react-icons/fa";
// import {
// 	getWishlist,
// 	handleWishlist,
// } from "../../../redux/slices/wishlistSlice";
// import { PiLineVerticalThin } from "react-icons/pi";
// import { useNavigate } from "react-router-dom";

// const WishListComponent = ({ userId }) => {
// 	const dispatch = useDispatch();
// 	const navigate = useNavigate();
// 	const wishlist = useSelector((state) => state.wishlist.products) || [];

// 	useEffect(() => {
// 		dispatch(getWishlist(userId));
// 	}, [dispatch, userId]);

// 	const handleWish = async (productId) => {
// 		await dispatch(handleWishlist({ userId, productId }));
// 		dispatch(getWishlist(userId));
// 	};

// 	const handleProductDetails = (productId) => {
// 		navigate(`/productDetials/${productId}`);
// 	};

// 	return (
// 		<div className="p-4">
// 			<h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
// 			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// 				{wishlist &&
// 					wishlist.map(
// 						(product) =>
// 							product._id && (
// 								<div
// 									key={product._id}
// 									className="relative bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
// 								>
// 									<div
// 										className="w-full h-40 flex items-center justify-center overflow-hidden mb-4"
// 										onClick={(e) => {
// 											e.stopPropagation();
// 											handleProductDetails(product._id);
// 										}}
// 									>
// 										<img
// 											className="w-full h-full object-contain"
// 											src={product.thumbnail}
// 											alt={product.productName}
// 										/>
// 									</div>
// 									<div className="text-center mb-2">
// 										<span className="text-sm font-semibold">
// 											{product.productName}
// 										</span>
// 									</div>
// 									<div className="flex items-center gap-2 mb-4">
// 										<span className="text-sm font-medium">
// 											₹{product.salePrice}
// 										</span>
// 										<PiLineVerticalThin className="text-gray-400" />
// 										<span className="text-yellow-400 text-xs font-medium">
// 											4.7
// 										</span>
// 										<svg
// 											className="w-4 h-4 text-yellow-400"
// 											fill="currentColor"
// 											viewBox="0 0 20 20"
// 										>
// 											<path d="M10 15l-5.878 3.09 1.122-6.545L.366 7.91l6.564-.954L10 .25l3.07 6.705 6.564.954-4.878 4.635L15.878 18z" />
// 										</svg>
// 									</div>
// 									<button
// 										onClick={(e) => {
// 											e.stopPropagation();
// 											handleWish(product._id);
// 										}}
// 										className="absolute top-4 right-4 text-red-500 hover:underline"
// 									>
// 										<MdDeleteSweep className="w-5 h-5" />
// 									</button>
// 								</div>
// 							)
// 					)}
// 			</div>
// 		</div>
// 	);
// };

// export default WishListComponent;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdDeleteSweep } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import {
	getWishlist,
	handleWishlist,
} from "../../../redux/slices/wishlistSlice";
import { PiLineVerticalThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const WishListComponent = ({ userId }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const wishlist = useSelector((state) => state.wishlist.products) || [];

	useEffect(() => {
		dispatch(getWishlist(userId));
	}, [dispatch, userId]);

	const handleShopNow = () => {
		navigate("/shop");
	};

	const handleWish = async (productId) => {
		await dispatch(handleWishlist({ userId, productId }));
		dispatch(getWishlist(userId));
	};

	const handleProductDetails = (productId) => {
		navigate(`/productDetials/${productId}`);
	};

	return (
		<div className="p-4">
			{wishlist.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					{wishlist.map(
						(product) =>
							product._id && (
								<div
									key={product._id}
									className="relative bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
								>
									<div
										className="w-full h-40 flex items-center justify-center overflow-hidden mb-4"
										onClick={(e) => {
											e.stopPropagation();
											handleProductDetails(product._id);
										}}
									>
										<img
											className="w-full h-full object-contain"
											src={product.thumbnail}
											alt={product.productName}
										/>
									</div>
									<div className="text-center mb-2">
										<span className="text-sm font-semibold">
											{product.productName}
										</span>
									</div>
									<div className="flex items-center gap-2 mb-4">
										<span className="text-sm font-medium">
											₹{product.salePrice}
										</span>
										<PiLineVerticalThin className="text-gray-400" />
										<span className="text-yellow-400 text-xs font-medium">
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
									<button
										onClick={(e) => {
											e.stopPropagation();
											handleWish(product._id);
										}}
										className="absolute top-4 right-4 text-red-500 hover:underline"
									>
										<MdDeleteSweep className="w-5 h-5" />
									</button>
								</div>
							)
					)}
				</div>
			) : (
				<div className="flex flex-col items-center justify-center  bg-white px-4">
					<h2 className="text-lg font-bold text-gray-800 mb-2">
						YOUR WISHLIST IS EMPTY
					</h2>
					<p className="text-gray-500 text-center mb-6">
						Add items that you like to your wishlist. Review them anytime and
						easily move them to the bag.
					</p>
					<img
						src="https://i.pinimg.com/originals/c9/b7/39/c9b739e50a61af0f9acc2a3f5875e984.jpg"
						alt="Empty Wishlist"
						className="w-96 h-56 mb-6"
					/>
					<button
						onClick={handleShopNow}
						className="border-2 border-black bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition duration-200"
					>
						CONTINUE SHOPPING
					</button>
				</div>
			)}
		</div>
	);
};

export default WishListComponent;
