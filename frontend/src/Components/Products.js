import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../actions/productActions";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { CLEAR_ERRORS } from "../constants/productConstants";
import { toast } from "react-toastify";


const Products = () => {
  const { loading, products, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(CLEAR_ERRORS());
    }
  }, [error]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto flex">
          {products?.map((product) => (
            <div
              className="flex-1 border-2 border-slate-500 mx-2 mt-2 shadow-lg"
              key={product.id}
            >
              <div className="card p-3 rounded flex flex-col justify-center items-center">
                <img
                  className="card-img-top h-28 w-28 mx-auto"
                  src={product.image}
                  alt={product.name}
                />
                <div className="card-body flex flex-col justify-center items-center">
                  <h5 className="card-title">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  </h5>
                  <div className="mt-auto mb-3 text-center">
                    <p className="card-text text-gray-500">
                      {product.description}
                    </p>
                    <p className="text-green-400 font-bold my-2">
                      Price: ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default Products;
