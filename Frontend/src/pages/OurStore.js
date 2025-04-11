import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlilce";
import { Link } from "react-router-dom";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state?.product?.product || []); // Added fallback to empty array
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  // Filter state
  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setminPrice] = useState(null);
  const [maxPrice, setmaxPrice] = useState(null);
  const [sort, setSort] = useState(null);
  const [location, setLocation] = useState("All Locations"); // Added location state

  const [isLocationCollapsed, setIsLocationCollapsed] = useState(true); // State for collapse behavior
  const [loading, setLoading] = useState(true); // State for loading

  const dispatch = useDispatch();

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newtags = [];

    for (let index = 0; index < productState?.length; index++) {
      const element = productState[index];
      newBrands.push(element.brand);
      category.push(element.category);
      newtags.push(element.tags);
    }
    setBrands(newBrands);
    setCategories(category);
    setTags(newtags);
  }, [productState]);

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice, location]); // Added location to dependency array

  const getProducts = () => {
    dispatch(
      getAllProducts({ sort, tag, brand, category, minPrice, maxPrice, location }) // Added location filter
    ).finally(() => setLoading(false)); // Set loading to false once the products are fetched
  };

  const toggleLocationList = () => {
    setIsLocationCollapsed(!isLocationCollapsed);
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading state while fetching data
  }

  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Location</h3>
              <div>
                <ul className="ps-0">
                  <a
                    className="ps-0"
                    href="/product"
                    style={{ color: "var(--color-777777)" }}
                  >
                    All Locations
                  </a>

                  {/* Location Collapse Toggle Button */}
                  <button
                    className="btn btn-link ps-0"
                    onClick={toggleLocationList}
                    style={{ fontSize: "16px", color: "#007bff" }}
                  >
                    {isLocationCollapsed ? "▼" : "▲"}
                  </button>

                  {/* List of locations */}
                  {isLocationCollapsed ? null : (
                    <div>
                      <li onClick={() => setLocation("New Delhi")}>New Delhi</li>
                      <li onClick={() => setLocation("Mumbai")}>Mumbai</li>
                      <li onClick={() => setLocation("Bangalore")}>Bangalore</li>
                      <li onClick={() => setLocation("Chennai")}>Chennai</li>
                      <li onClick={() => setLocation("Kolkata")}>Kolkata</li>
                      <li onClick={() => setLocation("Hyderabad")}>Hyderabad</li>
                      <li onClick={() => setLocation("Pune")}>Pune</li>
                      <li onClick={() => setLocation("Jaipur")}>Jaipur</li>
                      <li onClick={() => setLocation("Ahmedabad")}>Ahmedabad</li>
                      <li onClick={() => setLocation("Gurgaon")}>Gurgaon</li>
                      <li onClick={() => setLocation("Noida")}>Noida</li>
                      <li onClick={() => setLocation("Chandigarh")}>Chandigarh</li>
                      <li onClick={() => setLocation("Lucknow")}>Lucknow</li>
                      <li onClick={() => setLocation("Indore")}>Indore</li>
                      <li onClick={() => setLocation("Bhopal")}>Bhopal</li>
                      <li onClick={() => setLocation("Kochi")}>Kochi</li>
                      <li onClick={() => setLocation("Surat")}>Surat</li>
                      <li onClick={() => setLocation("Patna")}>Patna</li>
                      <li onClick={() => setLocation("Visakhapatnam")}>Visakhapatnam</li>
                      <li onClick={() => setLocation("Coimbatore")}>Coimbatore</li>
                    </div>
                  )}
                </ul>
              </div>
            </div>

            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      onChange={(e) => setminPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      onChange={(e) => setmaxPrice(e.target.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
              </div>

              {/* Share Room With No. */}
              <div className="mt-4 mb-3">
                <h3 className="sub-title">Share Room With No.</h3>
                <div>
                  <div className="d-flex gap-10">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("Solo")}
                    >
                      Solo
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("1")}
                    >
                      1
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("2")}
                    >
                      2
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("3")}
                    >
                      3
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("4")}
                    >
                      4
                    </button>
                  </div>
                </div>
              </div>

              {/* AC/ Non - AC */}
              <div className="mt-4 mb-3">
                <h3 className="sub-title">AC/ Non - AC</h3>
                <div>
                  <div className="d-flex gap-10">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("Yes")}
                    >
                      Yes
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => setTag("No")}
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={"manual"}
                    className="form-control form-select"
                    onChange={(e) => setSort(e.target.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {productState?.length} Products
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => setGrid(3)}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(4)}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(6)}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => setGrid(12)}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-list">
              <div className="row">
                <ProductCard
                  data={productState?.length > 0 ? productState : []} // Ensures non-empty array
                  grid={grid}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
