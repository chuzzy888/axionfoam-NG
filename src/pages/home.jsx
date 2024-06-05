import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { mattressData } from "../components/mytemp/mattress";
import { Loader } from "../components/loader";
import { Eachproducthome } from "../components/eachproducthome";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer";
import axios from "axios";
import { EachBlog } from "./eachblog";
import { blogdata } from "../assets/blogdata";
import Accordion from "react-bootstrap/Accordion";

// import $ from "jquery";

export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [shouldRender, setShouldRender] = useState(false);
  const [cartqty, setCartQty] = useState(0);

  const [productData, setProductData] = useState([]);
  const getCartQuantity = () => {
    const qty = localStorage.getItem("cart");

    if (qty) {
      const parsed = JSON.parse(qty);
      setCartQty(parsed.length);
    }
  };
  useEffect(() => {
    getCartQuantity();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 3000);

    return () => clearTimeout(timer); // Clear the timeout on component unmount
  }, []);
  const getAllProducts = async () => {
    try {
      const response = await axios.get(
        "https://axionbackend.betsphere.com.ng/api/getproducts"
        // "http://localhost:3000/api/getproducts"
      );
      console.log(response?.data?.data);
      setProductData(response?.data?.data);
      setFilteredProducts(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2500,
    autoplaySpeed: 2500,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [user, setUser] = useState(null);

  const getUser = () => {
    const userInLocal = localStorage.getItem("user");
    if (userInLocal) {
      setUser(JSON.parse(userInLocal));
    }
  };

  useEffect(() => {
    getUser();
    getAllProducts();
  }, []);

  return (
    <div>
      <div className="page-wrapper">
        <header className="main-header header-style-three">
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container d-flex justify-content-between align-items-center flex-wrap">
                {/* Logo Box */}
                <div className="logo-box d-flex align-items-center">
                  <div className="nav-toggle-btn a-nav-toggle navSidebar-button">
                    {/* <span className="hamburger">
                      <span className="top-bun" />
                      <span className="meat" />
                      <span className="bottom-bun" />
                    </span> */}
                  </div>
                  {/* Logo */}
                  <div className="logo">
                    <a href="#">
                      <img
                        src="axionlogo.png"
                        alt=""
                        title
                        className="mylogo"
                      />
                    </a>
                  </div>
                </div>
                {/* Search Box */}
                {/* <div className="search-box">
                  <form
                    method="post"
                    action="https://html.themexriver.com/axion/contact.html"
                  >
                    <div className="form-group">
                      <select name="currency" className="custom-select-box">
                        <option>Search For Product</option>
                      </select>
                      <input
                        type="search"
                        name="search-field"
                        value={searchValue}
                        // defaultValue
                        onChange={(e) => {
                          setSearchValue(e.target.value);
                        }}
                        placeholder="Search Product"
                        required
                      />
                      <button type="submit">
                        <span className="icon fa fa-search" />
                      </button>
                    </div>
                  </form>
                </div> */}
                {/* Options Box */}
                <div className="options-box d-flex align-items-center">
                  {/* Search Box */}
                  {/* User Box */}
                  <div className="cart-box-two">
                    <a className="flaticon-shopping-bag" href="/cart" />
                    <span className="total-like">{cartqty}</span>
                  </div>
                  <span
                    className=""
                    style={{ marginLeft: "6px", cursor: "pointer" }}
                    onClick={() => {
                      navigate("/cart");
                    }}
                  >
                    Cart
                  </span>
                  {!user ? (
                    <a
                      href="/login"
                      className="user-box flaticon-user-3 ms-3 d-flex align-items-center"
                    >
                      <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                        Account
                      </span>
                    </a>
                  ) : (
                    <a
                      href="/profile"
                      className="user-box flaticon-user-3 ms-3 d-flex align-items-center"
                    >
                      <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                        Account
                      </span>
                    </a>
                  )}
                  {/* Like Box */}
                  {/* Cart Box */}
                </div>
              </div>
            </div>
          </div>
          {/* End Header Lower */}
          {/* Header Lower */}

          <div class="header-lower">
            <div class="auto-container">
              <div class="nav-outer d-flex justify-content-between align-items-center flex-wrap">
                {/* <!-- Select Categories --> */}
                <div class="select-categories">
                  <div class="category">
                    <span class="icon flaticon-menu-3"></span> Select categories{" "}
                    <span class="arrow flaticon-down-arrow"></span>
                  </div>
                  <ul class="categories-list">
                    <li class="active">
                      <a href="/shop?category=mattress">
                        <span class="icon">
                          <img
                            src="mattress.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Mattresses
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=toppers">
                        <span class="icon">
                          <img
                            src="toppers.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Toppers
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=pillows">
                        <span class="icon">
                          <img
                            src="pillows.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Pillows
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=bedbase">
                        <span class="icon">
                          <img
                            src="base.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Bedbase
                      </a>
                    </li>
                    <li class="active">
                      <a href="/shop?category=protectors">
                        <span class="icon">
                          <img
                            src="protectors.png"
                            alt=""
                            style={{ width: "30px" }}
                          />
                        </span>
                        Protectors
                      </a>
                    </li>
                  </ul>
                </div>
                {/* <!-- End Select Categories -->
					
					<!-- Main Menu --> */}
                <nav class="main-menu show navbar-expand-md">
                  <div class="navbar-header">
                    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarSupportedContent"
                      aria-controls="navbarSupportedContent"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                      <span class="icon-bar"></span>
                    </button>
                  </div>

                  <div
                    class="navbar-collapse collapse clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul class="navigation clearfix ">
                      <li class="dropdown mydrop">
                        <a href="#" className="tablink">
                          Explore
                        </a>
                        <ul>
                          <li>
                            <a href="/" className="dhead">
                              Home
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=all" className="dhead">
                              Shop
                            </a>
                          </li>
                          <li>
                            <a href="/compare" className="dhead">
                              Compare products
                            </a>
                          </li>
                          <li>
                            <a href="/contact" className="dhead">
                              Contact us
                            </a>
                          </li>
                          {!user ? (
                            <li>
                              <a href="/login" className="dhead">
                                Account
                              </a>
                            </li>
                          ) : (
                            <li>
                              <a href="/profile" className="dhead">
                                Account
                              </a>
                            </li>
                          )}
                          <li>
                            <a href="/search" className="dhead">
                              Search for Products
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown ">
                        <a href="/shop?category=mattress" className="tablink ">
                          Mattresses
                        </a>
                        <ul>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Premier Mattress
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                  style={{
                                    color: "red",
                                  }}
                                >
                                  Memory Foam
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Cooling Gel
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Graphite
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Latex
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Copper
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Green tea
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Hybrid Mattress
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Classic Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Cooling Gel
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Latex Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Premium (Gold) Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Copper Hybrid
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Platinum Hybrid
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mattress" className="dhead">
                              Axion Hotel Collection
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Comfort
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=mattress"
                                  className="subbtext"
                                >
                                  Elite
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown">
                        <a
                          href="/shop?category=toppers"
                          className="tablink dhead"
                        >
                          Toppers
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Memory Foam Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Down Alternative Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Latex Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Waterproof Topper
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=toppers" className="dhead">
                              Mattress pad
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown">
                        <a
                          href="/shop?category=bedbase"
                          className="tablink dhead"
                        >
                          Bedbase
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Adjustable base
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Platform base
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=bedbase" className="dhead">
                              Boxspring base
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li class="dropdown">
                        <a
                          href="/shop?category=cushion"
                          className="tablink dhead"
                        >
                          Cushion
                        </a>
                        <ul>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Lumbar support
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Knee pillow
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Leg support pillow
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Cervical cushion
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Neck support
                            </a>
                          </li>
                          <li>
                            <a href="/shop?category=cushion" className="dhead">
                              Baby pillow
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li class="dropdown ">
                        <a href="/shop?category=mattress" className="tablink ">
                          Accessories
                        </a>
                        <ul>
                          <li class="dropdown">
                            <a href="/shop?category=pillows" className="dhead">
                              Pillows
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Luxury Fiber Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Luxury Cotton Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Memory Foam Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Latex Foam Pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=pillows"
                                  className="subbtext"
                                >
                                  Geese Feather Pillow
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a
                              href="/shop?category=protectors"
                              className="dhead"
                            >
                              Protectors
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=protectors"
                                  className="subbtext"
                                >
                                  Mattress Protectors
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=protectors"
                                  className="subbtext"
                                >
                                  Pillow Protectors
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=travel" className="dhead">
                              Travel items
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Neck support pillow
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Driver seat support
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=travel"
                                  className="subbtext"
                                >
                                  Cervical head pillow
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a
                              href="/shop?category=compression"
                              className="dhead"
                            >
                              Compression/Braces
                            </a>
                            <ul>
                              <li>
                                <a
                                  href="/shop?category=compression"
                                  className="subbtext"
                                >
                                  Knee braces
                                </a>
                              </li>
                              <li>
                                <a
                                  href="/shop?category=compression"
                                  className="subbtext"
                                >
                                  Ankle socks
                                </a>
                              </li>
                            </ul>
                          </li>
                          <li class="dropdown">
                            <a href="/shop?category=mats" className="dhead">
                              Mats
                            </a>
                            <ul>
                              <li>
                                <a href="/shop?category=mats" className="dhead">
                                  Anti-fatigue mat
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
                {/* <!-- Main Menu End--> */}

                {/* <!-- Outer Box --> */}
                <div class="outer-box d-flex justify-content-between align-items-center me-4">
                  {/* <!-- Social Box --> */}
                  {/* <div class="language dropdown">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      // id="dropdownMenu"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span class="flag">
                        <img src="images/icons/usa-flag.png" alt="" />
                      </span>
                      English &nbsp;<span class="fa fa-angle-down"></span>
                    </button>
                     <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenu"
                    ></div> 
                  </div> */}
                  {/* <!-- Mobile Navigation Toggler --> */}
                  <div className=" d-flex align-items-center justify-content-between nomax">
                    {/* Search Box */}
                    {/* User Box */}
                    <div className="d-flex">
                      <div className="cart-box-two">
                        <a className="flaticon-shopping-bag" href="/cart" />
                        <span className="total-like">{cartqty}</span>
                      </div>
                      <span
                        onClick={() => {
                          navigate("/cart");
                        }}
                        className=""
                        style={{ marginLeft: "6px", cursor: "pointer" }}
                      >
                        Cart
                      </span>
                      {!user ? (
                        <a
                          href="/login"
                          className="user-box text-dark ms-3 d-flex align-items-center"
                        >
                          <span
                            className="fs-6 acct"
                            style={{ cursor: "pointer" }}
                          >
                            Account
                          </span>
                        </a>
                      ) : (
                        <a
                          href="/profile"
                          className="user-box text-dark ms-3 d-flex align-items-center"
                        >
                          <span
                            className="fs-6 acct"
                            style={{ cursor: "pointer" }}
                          >
                            Account
                          </span>
                        </a>
                      )}
                    </div>
                    <div class="mobile-nav-toggler">
                      <span class="icon flaticon-menu"></span>
                    </div>
                    {/* Like Box */}
                    {/* Cart Box */}
                  </div>
                </div>
                {/* <!-- End Outer Box --> */}
              </div>
            </div>
          </div>

          {/* Sticky Header  */}
          <div className="sticky-header ">
            <div className="px-4 ">
              <div className="d-flex justify-content-between align-items-center">
                {/* Logo */}
                <div className="logo">
                  <a href="/" title>
                    <img src="axionlogo.png" alt="" title className="mylogo" />
                  </a>
                </div>
                {/* Right Col */}
                <div className="right-box">
                  {/* Main Menu */}
                  <div className="d-flex">
                    <nav className="main-menu">
                      {/*Keep This Empty / Menu will come through Javascript*/}
                    </nav>
                    {/* Main Menu End*/}
                    <div className="d-flex">
                      <div className="d-flex align-items-center">
                        <div className="cart-box-two">
                          <a className="flaticon-shopping-bag" href="/cart" />
                          <span className="total-like">{cartqty}</span>
                        </div>
                        <span
                          className=""
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            fontWeight: "500",
                          }}
                          onClick={() => {
                            navigate("/cart");
                          }}
                        >
                          Cart
                        </span>
                        {!user ? (
                          <a
                            href="/login"
                            className="user-box text-dark ms-3 d-flex align-items-center"
                          >
                            <span
                              className="fs-6 acct pt-1"
                              style={{ cursor: "pointer", fontWeight: "500" }}
                            >
                              Account
                            </span>
                          </a>
                        ) : (
                          <a
                            href="/profile"
                            className="user-box text-dark ms-3 d-flex align-items-center"
                          >
                            <span
                              className="fs-6 acct pt-1"
                              style={{ cursor: "pointer", fontWeight: "500" }}
                            >
                              Account
                            </span>
                          </a>
                        )}
                      </div>
                      <div className="mobile-nav-toggler">
                        <span className="icon flaticon-menu" />
                      </div>
                    </div>
                  </div>
                  {/* Mobile Navigation Toggler */}
                </div>
              </div>
            </div>
          </div>
          {/* End Sticky Menu */}
          {/* Mobile Menu  */}
          <div className="mobile-menu">
            <div className="menu-backdrop" />
            <div className="close-btn">
              <span className="icon flaticon-multiply" />
            </div>
            <nav className="menu-box">
              <div className="nav-logo">
                <a href="/">
                  <img src="axionlogo.png" alt="" title />
                </a>
              </div>

              <div className="menu-outer">
                {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
              </div>
              {/* <div className="d-flex">
                <div className="cart-box-two">
                  <a className="flaticon-shopping-bag" href="/cart" />
                  <span className="total-like">{cartqty}</span>
                </div>
                <span
                  onClick={() => {
                    navigate("/cart");
                  }}
                  className=""
                  style={{ marginLeft: "6px", cursor: "pointer" }}
                >
                  Cart
                </span>
                <a
                  href="/login"
                  className="user-box text-dark ms-3 d-flex align-items-center"
                >
                  <span className="fs-6 acct" style={{ cursor: "pointer" }}>
                    Account
                  </span>
                </a>
              </div> */}
            </nav>
          </div>
          {/* End Mobile Menu */}
        </header>
        {/* End Main Header */}
        {/* Sidebar Cart Item */}
        <div className="xs-sidebar-group info-group">
          <div className="xs-overlay xs-bg-black" />
          <div className="xs-sidebar-widget">
            <div className="sidebar-widget-container">
              <div className="widget-heading">
                <a href="#" className="close-side-widget">
                  X
                </a>
              </div>
              <div className="sidebar-textwidget">
                {/* Sidebar Info Content */}
                <div className="sidebar-info-contents">
                  <div className="content-inner">
                    <div className="logo">
                      <a href="#">
                        <img src="images/logo.png" alt="" title />
                      </a>
                    </div>
                    <div className="content-box">
                      <h6>Services</h6>
                      {/* <ul className="sidebar-services-list">
                        <li>
                          <a href="#">Laptops &amp; Computers</a>
                        </li>
                        <li>
                          <a href="#">Cameras &amp; Photography</a>
                        </li>
                        <li>
                          <a href="#">Smart Phones &amp; Tablets</a>
                        </li>
                        <li>
                          <a href="#">Video Games &amp; Consoles</a>
                        </li>
                        <li>
                          <a href="#">TV &amp; Audio</a>
                        </li>
                        <li>
                          <a href="#">LED Table</a>
                        </li>
                      </ul> */}
                      <h6>Contact info</h6>
                      {/* List Style One */}
                      <ul className="list-style-one">
                        <li>
                          <span className="icon flaticon-maps-and-flags" />
                          <strong>Our office</strong>
                          A-1, Envanto Headquarters, <br /> Melbourne,
                          Australia.
                        </li>
                        <li>
                          <span className="icon flaticon-call-1" />
                          <strong>Phone</strong>
                          <a href="tel:+00-999-999-9999">+(00) 999 999 9999</a>
                          <br />
                          <a href="tel:+000-000-0000">000 000 0000</a>
                        </li>
                        <li>
                          <span className="icon flaticon-mail" />
                          <strong>Email</strong>
                          <a href="mailto:contact@axion.com">
                            contact@Axion.com
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* END sidebar widget item */}
        {/* Main Section Three */}
        <section className="main-slider-three">
          <div className="auto-container">
            <div className="inner-container">
              <div className="main-slider-carousel owl-carousel owl-theme">
                {/* Slide One */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Eco-friendly materials</div>
                        <h1>Built for your comfort.</h1>
                        <div className="text">
                          Also supports sleepers over 250lbs. <br />
                          Try it with our 100 nights risk free trial
                        </div>

                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide One */}
                {/* Slide Two */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Worldwide shipping</div>
                        <h1>Best Quality and Durable sleepers</h1>
                        <div className="text">
                          Handcrafted with the highest quality materials.
                        </div>
                        {/* <div className="price">
                          Starting From <span>$560.99</span>
                        </div> */}
                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide Two */}
                {/* Slide Three */}
                <div className="slide">
                  <div className="row clearfix">
                    {/* Content Column */}
                    <div className="content-column col-lg-5 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div
                          className="vector-icon"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-5.png)",
                          }}
                        />
                        <div className="title">Secure Payments</div>
                        <h1>Best Mattress At The Best Price</h1>
                        <div className="text">
                          10yrs Warranty (Registration required upon purchase)
                        </div>
                        {/* <div className="price">
                          Starting From <span>$560.99</span>
                        </div> */}
                        {/* Button Box */}
                        <div className="button-box">
                          <a href="/shop" className="theme-btn btn-style-one">
                            See Collection{" "}
                            <span className="icon flaticon-right-arrow" />
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* Image Column */}
                    <div className="image-column col-lg-7 col-md-12 col-sm-12">
                      <div className="inner-column">
                        <div className="circle-box" />
                        <div
                          className="vector-icon-two"
                          style={{
                            backgroundImage: "url(images/icons/pattern-1.png)",
                          }}
                        />
                        <div
                          className="vector-icon-three"
                          style={{
                            backgroundImage:
                              "url(images/main-slider/vector-6.png)",
                          }}
                        />
                        <div className="image">
                          <img src="images/main-slider/image-3.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End Slide Three */}
              </div>
            </div>
          </div>
        </section>
        {/* End Main Section Three */}
        {/* Featured Section */}
        <section className="featured-section">
          <div className="auto-container">
            <div className="inner-container">
              <div className="row clearfix">
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-fast" />
                      <strong>Free Shipping</strong>
                      <div className="text">Free shipping over $100</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-padlock" />
                      <strong>Payment Secure</strong>
                      <div className="text">Get 100% Payment Safe</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12 px-1">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-headphones-1" />
                      <strong>Support 24/7</strong>
                      <div className="text">We Offer 24/7 Support</div>
                    </div>
                  </div>
                </div>
                {/* Feature Block */}
                <div className="feature-block col-xl-3 col-lg-6 col-md-6 col-sm-12">
                  <div className="inner-box">
                    <div className="content">
                      <div className="icon flaticon-wallet" />
                      <strong>100% Money Back</strong>
                      <div className="text">30 days money back guarantee</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Featured Section */}

        <div className="py-5 my-5 categories">
          <div
            className="text-center fs-3  mb-5 text-italic"
            style={{
              fontStyle: "inherit",
              fontFamily: "cursive",
            }}
          >
            Shop by Category
          </div>

          <div class="container my-4">
            <div class="row " style={{ rowGap: "20px" }}>
              <div
                class="col-md-6 zoom-container "
                onClick={() => {
                  navigate("/shop?category=mattress");
                }}
              >
                <div
                  class="categorycard1 card "
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",
                    justifyContent: "end",
                    cursor: "pointer",
                  }}
                >
                  <div class="card-body">
                    <h5 class="card-title text-light pb-3 ps-4">Mattresses</h5>
                  </div>
                </div>
              </div>
              <div
                class="col-md-6 zoom-container "
                onClick={() => {
                  navigate("/shop?category=toppers");
                }}
              >
                <div
                  class="categorycard2 card"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "end",

                    cursor: "pointer",
                  }}
                >
                  <div class="card-body">
                    <h5 class="card-title text-dark pb-3 ps-4">Toppers</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="products-section-six" id="popular">
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>
                <span>Popular</span> Products For You !
              </h4>
              <button
                className="viewall"
                onClick={() => {
                  navigate("/shop?category=all");
                }}
              >
                View All
              </button>
            </div>
            <div className="row clearfix">
              {productData
                .filter((item) => {
                  return item.popular === "true" || item.popular === true;
                })
                .slice(0, 4)
                .map((item) => {
                  return <Eachproducthome item={item}></Eachproducthome>;
                })}
            </div>
            {/* Lower Box */}
            <div className="lower-box mt-5 pt-5">
              <div className="row clearfix">
                {/* Feature Block Three */}
                <div className="feature-block-three col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="inner-box d-flex justify-content-between align-items-center flex-wrap">
                    <div className="content">
                      <div
                        className="off"
                        style={{ textTransform: "capitalize" }}
                      >
                        Long-lasting Products
                      </div>
                      <h5>
                        <a href="/shop?category=all">
                          10yrs Warranty on our <br /> purchased products
                        </a>
                      </h5>
                      <a className="buy-now" href="/shop?category=all">
                        Shop Now
                      </a>
                    </div>
                    <div className="image">
                      <div className="off-box2 fs-6">
                        10yrs<i></i>{" "}
                        <span className="" style={{ fontSize: "8px" }}>
                          Warranty
                        </span>
                      </div>
                      <div className="circle-layer" />
                      <img
                        src="hybrid.png"
                        alt=""
                        style={{ width: "250px", marginLeft: "-10px" }}
                      />
                    </div>
                  </div>
                </div>
                {/* Feature Block Three */}
                <div className="feature-block-three col-xl-6 col-lg-6 col-md-12 col-sm-12">
                  <div className="inner-box d-flex flex-wrap flex-md-nowrap  justify-content-between align-items-center ">
                    <div className="content">
                      <div className="off">Worldwide Shipping</div>
                      <h5>
                        <a href="/shop?category=all">
                          Get Your Products Delivered <br /> Across The World
                        </a>
                      </h5>
                      <a className="buy-now" href="/shop?category=all">
                        Shop Now
                      </a>
                    </div>
                    <div className="image">
                      <div className="off-box">
                        7<i>%</i> <span>off</span>
                      </div>
                      <div className="circle-layer" />
                      <img
                        src="cooling.png"
                        alt=""
                        style={{ width: "300px", marginLeft: "-10px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="sec-title ms-3">
          <h4>
            <span>Some of</span> Our Products !
          </h4>
          {/* <button className="viewall">View All</button> */}
        </div>
        <div className="mx-3">
          <Slider {...settings}>
            <img src="displaypictures/rfoam2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam11.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam12.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam3.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam4.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper1.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam5.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam6.jpg" alt="" className="dp" />
            <img src="displaypictures/mtopper1.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam7.jpg" alt="" className="dp" />
            <img src="displaypictures/downtopper4.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam8.jpg" alt="" className="dp" />
            <img src="displaypictures/downtopper2.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam13.jpg" alt="" className="dp" />
            <img src="displaypictures/rfoam9.jpg" alt="" className="dp" />

            <img src="displaypictures/downtopper3.jpg" alt="" className="dp" />

            <img src="displaypictures/rfoam11.jpg" alt="" className="dp" />
          </Slider>
        </div>

        <section className="sale-section-two ">
          {/* <div
            className="collection"
            style={{ backgroundImage: "url(mattress.png)" }}
          /> */}
          <div className="auto-container">
            <div className="row clearfix justify-content-around">
              {/* Content Column */}
              <div className="content-column col-lg-7 col-md-12 col-sm-12 ps-5">
                <div className="inner-column">
                  <div className="title">100% best sleep solutions</div>
                  <h2>
                    IT'S JUST LIKE SLEEPING <br /> ON THE CLOUD
                  </h2>
                  <div className="text">
                    Our safe and high quality materials gives you a comfortable
                    and safe sleep
                  </div>
                  {/* Product Time Countdown */}

                  <a href="/shop?category=all" className="shop-now">
                    Shop Now
                  </a>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-5 col-md-12 col-sm-12 pe-5">
                <div className="inner-column">
                  <div className="circle-layer" />
                  <div
                    className="vector-icon-one"
                    style={{
                      backgroundImage: "url(images/icons/pattern-1.png)",
                    }}
                  />
                  <div
                    className="vector-icon-two"
                    style={{
                      backgroundImage: "url(images/icons/pattern-4.png)",
                    }}
                  />
                  <div className="image">
                    {/* Price Tag */}

                    <div
                      className="price-tag"
                      style={{ fontSize: "20px", lineHeight: "19px" }}
                    >
                      Shop now
                    </div>

                    <img src="images/resource/pillow.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="vw-100 mt-5 pt-4">
          <h3 className=" ms-3 mb-5 text-center  fs-4 w-full text-primary">
            Sleep <span className="text-danger ">reimagined</span>, your story
            begins with Axion
            <span className="text-danger ms-1">Foam</span>
          </h3>
        </div>
        <div className="d-flex justify-content-center mb-5">
          {/* <div class="video-container">
            <video
              width="640"
              height="360"
              controls
              muted
              autoPlay={"autoplay"}
              preLoad="auto"
              loop
            >
              <source src="axionvideo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> */}

          <div className="row mb-5 px-3" style={{ marginTop: "-40px" }}>
            <div className="col-md-6 mt-3">
              {" "}
              <video
                width="640"
                height="360"
                controls
                muted
                autoPlay={"autoplay"}
                preLoad="auto"
                loop
              >
                <source src="axionvid1.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="col-md-6 mt-3">
              {" "}
              <video
                width="640"
                height="360"
                controls
                muted
                autoPlay={"autoplay"}
                preLoad="auto"
                loop
              >
                <source src="axionvid2.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
        <section
          className="newsletter-section"
          style={{ backgroundImage: "url(images/background/pattern-6.png)" }}
        >
          <div id="newsletter" className="auto-container">
            <div className="row clearfix">
              {/* Form Column */}
              <div className="form-column col-lg-6 col-md-12 col-sm-12 px-[4px]  md:!pl-[20px]">
                <div className="inner-column">
                  <h2>Newsletter</h2>
                  <div className="text">
                    Enter your email here to get regular updates about our
                    products and services
                  </div>
                  {/* Subscribe Box Two */}
                  <div className="subscribe-box-two">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="form-group">
                        <input
                          type="email"
                          name="search-field"
                          placeholder="Enter your Email"
                          required
                        />
                        <button
                          onClick={() => {
                            setTimeout(() => {
                              alert("You have subscribed successfully");
                            }, 2000);
                          }}
                          type="submit"
                          className="theme-btn submit-btn"
                        >
                          subscribe
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* Image Column */}
              <div className="image-column col-lg-6 col-md-12 col-sm-12">
                <div className="inner-column">
                  <div className="image">
                    <img
                      src="mattressicon.png"
                      alt=""
                      className=""
                      style={{
                        width: "300px",
                        height: "300px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products-section-six" id="popular">
          <div className="auto-container">
            {/* Sec Title */}
            <div className="sec-title">
              <h4>
                <span>Our Blog</span>
              </h4>
              <button
                className="viewall"
                onClick={() => {
                  navigate("/blogpage");
                }}
              >
                View All
              </button>
            </div>
            <div className="row clearfix">
              {blogdata.slice(0, 4).map((item) => {
                return <EachBlog item={item}></EachBlog>;
              })}
            </div>
          </div>
        </section>

        <section
          className="products-section-six"
          id="faq"
          style={{
            marginTop: "-100px",
          }}
        >
          <div className="auto-container">
            <div className="sec-title">
              <h4>
                <span>Frequently Asked Questions</span>
              </h4>
            </div>
            <Accordion
              defaultActiveKey="0"
              style={{
                maxWidth: "1200px",
                margin: "auto",
              }}
            >
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  {" "}
                  Where can I get original Axion products?
                </Accordion.Header>
                <Accordion.Body>
                  You can get original Axion products from any of our accredited
                  distributors nationwide and our Sleep Galleries. You can also
                  purchase on our website, it's safe and fast!
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header> How much Sleep do I need?</Accordion.Header>
                <Accordion.Body>
                  Averagely, you need 7-8 hours of sleep every night, but it
                  differs for every person. Some people may need as much as 10
                  hours a night and others need much less.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  {" "}
                  Do I need a mattress protector or mattress pad for my Axion
                  mattress?
                </Accordion.Header>
                <Accordion.Body>
                  Mattress protectors are a great choice to protect your
                  mattress from life's little accidents. So we suggest you pick
                  one to keep your mattress fresh.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  {" "}
                  How do I become an Axion distributor?
                </Accordion.Header>
                <Accordion.Body>
                  You can become a Axion distributor by calling our customer
                  service centre (0811 380 5555) for enquiries. You can also
                  visit our head office in Lagos or Port Harcourt to get
                  information on how to become an accredited Axion distributor.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  {" "}
                  Does my Axion mattress come with a warranty?
                </Accordion.Header>
                <Accordion.Body>
                  Yes! Both our memory foam mattresses and hybrid models are
                  covered with a 10-year warranty. If there are any structural
                  or manufacturer defects with your mattress, please contact us.
                  We've got your back.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  {" "}
                  How long can I expect my mattress to last?
                </Accordion.Header>
                <Accordion.Body>
                  All our mattresses come with a 10-year warranty, and we
                  believe our mattress can last 10 years or more
                  with proper use.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </section>

        <Footer></Footer>
      </div>
      <Loader></Loader>
    </div>
  );
};
