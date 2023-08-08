import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout/Layout";
import axios from "axios";
import { Modal, Select } from "antd";
import { Checkbox, Radio } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Prices } from "../Components/Prices";
import { useCart } from "../Context/Cart";
import "../Styles/Homepage.css"
import img1 from "../images/1.png"
import img2 from "../images/2.jpg"
import img3 from "../images/3.jpg"

import slide2 from "../images/bg.jpeg"
// import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

const HomePages = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `https://mvj.onrender.com/api/v1/category/categories`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Somethin went wrong in getting category");
    }
  };

  const getProductCount = async () => {
    try {
      const { data } = await axios.get(
        "https://mvj.onrender.com/api/v1/product/getTotal"
      );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mvj.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://mvj.onrender.com/api/v1/product/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategories();
    getProductCount();
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://mvj.onrender.com/api/v1/product/product-filters",
        { checked, radio }
      );
      setProducts(data?.product);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout title={"MVJ - Home page"}>
      {/* style={{margin:20}} */}
      {/* <img
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
        src="./Images/banner.JPG"
        style={{ height: "40vw" }}
      /> */}
      <div className="container-fluid row ">
        <div className="">
          {/* <div class="slider_area slider_black owl-carousel">
            <div class="single_slider" data-bgimg="images/slider/1.png">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-12">
                    <div class="slider_content">
                      <p>exclusive offer -20% off this week</p>
                      <h1>Necklace</h1>
                      <span>22 Carat gold necklace for wedding</span>
                      <p class="slider_price">starting at <span>Rs. 75,999</span></p>
                      <a href="#" class="button">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="single_slider" data-bgimg="images/slider/2.jpg">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-12">
                    <div class="slider_content">
                      <p>exclusive offer -40% off this week</p>
                      <h1>Earings and Pendant</h1>
                      <span>Complete bridal set with white pearls</span>
                      <p class="slider_price">starting at <span>Rs. 89,499</span></p>
                      <a href="#" class="button">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="single_slider" data-bgimg="images/slider/3.jpg">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-12">
                    <div class="slider_content">
                      <p>exclusive offer -10% off this week</p>
                      <h1>Wedding Rings</h1>
                      <span>Ashirwaad Special wedding rings for couples.</span>
                      <p class="slider_price">starting at <span>Rs. 14,999</span></p>
                      <a href="#" class="button">Shop Now</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div> */}
          <Carousel data-bs-theme="light">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h5> MVJ Jewellery</h5>
                <p>MVJ JEWELS SPECIALISES IN BOTH MODERN AND ETHNIC DESIGNS TO CATER TO YOUR VARYING NEEDS & MOODS.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h5>Widest range of gold jewellery</h5>
                <p>With a wide array of jewellery ranging from everyday wear to exclusive one-of-a-kind bridal sets, discover the world of precious and semi-precious jewels, available only at MVJ jewels.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={img3}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h5>For perfect gift items</h5>
                <p>
                  visit Mvj jewellery
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <button
          style={{margin:40, fontSize:20}}
            className="btn btn-dark"
            onClick={() => {
              setVisible(true);
            }}
          >
            Product Filter
          </button>
          <Modal
            onCancel={() => setVisible(false)}
            onOk={() => {
              setVisible(false);
            }}
            visible={visible}
          >
            <h5 className="text-center">Filter By Category</h5>
            <div className="d-flex flex-column mb-3">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <div className="d-flex flex-column">
              <h5 className="text-center">Filter By Price</h5>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex mt-3 flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </button>
            </div>
          </Modal>
          {/* </div> */}
          {/* <div className="col-md-9"> */}
          {/* <div> */}

          <h1 className="text-center"> All Products</h1>
          <div className="d-flex container-fluid flex-wrap">
            {products.map((p) => (
              <div className="card m-2" style={{ width: "17rem" }}>
                <img
                  src={`https://mvj.onrender.com/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  height={"200px"}
                  alt={p.name}
                />
                <div className="border border-dark" />
                <div className="card-body">
                  <div className="card-name-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h6 className="card-text text-decoration-underline">
                      {p.weight ? `${p.weight} gm.` : ""}
                    </h6>
                    <h5 className="card-title card-price">
                      {p.price
                        .toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })
                        .replace(/(\.00)$/, "")}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <button
                    class="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Detail
                  </button>
                  <button
                    class="btn btn-secondary ms-4"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Iem Added to cart");
                    }}
                  >
                    Add to 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
      <iframe src="https://www.goldpriceindia.com/wmshare-wlifop-001.php" style={{ width: "100%", height: "100%", border: "none", margin: 0, padding: 0, overflow: "hidden", zIndex: 999999 }}></iframe>

    </Layout>
  );
};

export default HomePages;
