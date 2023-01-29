import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartCountContext } from "../../contexts/CartCount";
import { useDispatch, useSelector } from "react-redux";

export default function CartLink() {
    const count = useSelector((state) => state.countSell);
    const showCount = () => {
        return count <= 9 ? count : `+${count}`;
    };
    return (
        <Link
            to="/cart"
            className="position-relative bi bi-cart3 fs-4 text-primary"
        >
            {!!count && (
                <span
                    style={{ top: "-5px", right: "-12px" }}
                    className="position-absolute bg-danger text-light border-danger bg-opacity-75 border rounded-1 fs-7 badge"
                >
                    {showCount()}
                </span>
            )}
        </Link>
    );
}
