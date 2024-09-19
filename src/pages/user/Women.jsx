import React, { useEffect, useState } from "react";
import WomenProductGrid from "../../components/user/WomenComponent";
import api from "../../config/axiosConfig";

const Women = () => {
	const [products, setProducts] = useState([]);
	const fetchProducts = async () => {
		try {
			const response = await api.get("/product/getProducts");

			const data = response?.data?.products;
			console.log("the data", data);

			const Womensdata = data.filter((x) => x.gender === "Women");
			setProducts(Womensdata);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<div>
			<WomenProductGrid data={products} />
		</div>
	);
};

export default Women;
