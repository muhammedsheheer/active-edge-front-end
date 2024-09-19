import React, { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import ReusableTable from "../../../components/admin/ReusableTableData";
import { RiDeleteBin7Fill } from "react-icons/ri";
import ConfirmationModal from "../../../components/admin/ConfirmationModal";
import CouponModal from "../../../components/admin/CoupenModal";
import { toast } from "react-toastify";
import Pagination from "../../../components/common/Pagination";

const Coupen = () => {
	const [getCoupens, setGEtCoupens] = useState([]);
	const [deleteCoupens, setDeleteCoupens] = useState(false);
	const [deleteCoupensId, setDeleteCoupensId] = useState(null);
	const [open, setOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(2);

	const fetchCoupen = async () => {
		try {
			const response = await api.get("/coupen/admin-get-coupens");
			setGEtCoupens(response?.data?.coupens);
		} catch (error) {
			console.log(error.message);
		}
	};

	const handleDeleteCoupen = (coupenId) => {
		setDeleteCoupensId(coupenId);
		setDeleteCoupens(true);
	};

	const handleConfirmDelete = async () => {
		try {
			await api.delete(`/coupen/delete-coupen/${deleteCoupensId}`);
			fetchCoupen();
			setDeleteCoupens(false);
			setDeleteCoupensId(null);
			toast.success("Coupon deleted successfully");
		} catch (error) {
			toast.error(error.message);
		}
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleSaveCoupen = async (formData) => {
		try {
			await api.post("/coupen/create-coupen", formData);
			toast.success("Coupon added successfully");
			setOpen(false);
			fetchCoupen();
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchCoupen();
	}, []);

	const columns = [
		{ label: "Serial No.", field: "serialNo" },
		{ label: "Code", field: "code" },
		{ label: "Discount Percentage", field: "discountPercentage" },
		{ label: "Expiry Date", field: "expiryDate" },
		{ label: "Minimum Purchase", field: "minimumPurchase" },
		{ label: "Maximum Discount Amount", field: "maxDiscountAmount" },
		{ label: "Action", field: "action" },
	];

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const currentCoupens = getCoupens.slice(indexOfFirstItem, indexOfLastItem);

	const coupenData = currentCoupens?.map((coupen, index) => ({
		serialNo: indexOfFirstItem + index + 1,
		code: coupen?.code,
		discountPercentage: `${coupen?.discountPercentage}%`,
		expiryDate: new Date(coupen?.expiryDate).toLocaleDateString(),
		minimumPurchase: `₹${coupen?.minimumPurchaseAmount}`,
		maxDiscountAmount: `₹${coupen?.maxDiscountAmount}`,
		action: (
			<div className="flex space-x-2">
				<RiDeleteBin7Fill
					className="text-red-500 cursor-pointer text-xl"
					onClick={() => handleDeleteCoupen(coupen._id)}
				/>
			</div>
		),
	}));

	return (
		<>
			<div className="flex justify-between items-center px-10 py-5 mb-4">
				<div>
					<h1 className="text-2xl font-bold">Coupens</h1>
					<nav className="text-gray-600 text-sm">dashboard / coupens</nav>
				</div>
				<div className="flex items-center">
					<button
						className="bg-black text-white p-2 rounded-md flex items-center"
						onClick={handleOpen}
					>
						<span className="mx-2">Add Coupen</span>
					</button>
				</div>
			</div>
			<ReusableTable columns={columns} data={coupenData} />
			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(getCoupens.length / itemsPerPage)}
				onPageChange={(page) => setCurrentPage(page)}
			/>
			<ConfirmationModal
				open={deleteCoupens}
				onClose={() => setDeleteCoupens(false)}
				message={"Are you sure you want to delete"}
				onConfirm={handleConfirmDelete}
			/>
			<CouponModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onSave={handleSaveCoupen}
			/>
		</>
	);
};

export default Coupen;
