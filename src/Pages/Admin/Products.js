import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    const { data } = await axios.get(
      "https://mvj.onrender.com/api/v1/product/get-product"
    );
    setProducts(data.products);
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Product List</h1>
            <div className="d-flex flex-wrap">
              {products.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashbord/admin/product/${p.slug}`}
                  className="product-link"
                >
                  <div className="card m-2" style={{ width: "18rem" }}>
                    <img
                      src={`https://mvj.onrender.com/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      height={"200px"}
                      alt={p.name}
                    />
                    <div className="border border-dark" />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <h6 className="card-text text-decoration-underline">
                        {p.weight ? `${p.weight} gm.` : ""}
                      </h6>
                      <p className="card-text">{p.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
