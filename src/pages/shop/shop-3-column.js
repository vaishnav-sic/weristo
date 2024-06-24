// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Col, Row, Pagination, Breadcrumb } from "antd";
// import { useRouter } from "next/router";

// import {
//   fetchProductsRequest,
//   fetchFeaturedProductsRequest,
// } from "../../redux/actions/shopActions";
// import LayoutOne from "../../components/layout/LayoutOne";
// import Container from "../../components/other/Container";
// import ShopSidebar from "../../components/shop/ShopSidebar";
// import ProductGrid from "../../components/sections/product-thumb/ProductGrid";
// import ShopHeader from "../../components/shop/ShopHeader";

// function shopGrid3Column() {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { q } = router.query;
//   const [currentPage, setCurrentPage] = useState(1);
//   const shopState = useSelector((state) => state.shopReducer);
//   const { products } = shopState;
//   const shopFilterState = useSelector((state) => state.shopFilterReducer);
//   const { sort, show, view, category, color, size, tag } = shopFilterState;
//   useEffect(() => {
//     dispatch(fetchFeaturedProductsRequest({ limit: 4 }));
//   }, []);
//   useEffect(() => {
//     dispatch(
//       fetchProductsRequest({
//         limit: show,
//         category: null,
//         page: currentPage,
//         q,
//         sort,
//         view,
//         category,
//         color,
//         size,
//         tag,
//       })
//     );
//   }, [shopFilterState, currentPage, q]);
//   const onPaginationChange = (current) => {
//     setCurrentPage(current);
//   };
//   return (
//     <LayoutOne title="Shop grid fullwidth">
//       <Container>
//         <Breadcrumb separator=">">
//           <Breadcrumb.Item>
//             <i className="fas fa-home" />
//             Home
//           </Breadcrumb.Item>
//           <Breadcrumb.Item>Shop</Breadcrumb.Item>
//         </Breadcrumb>
//         <div className="shop">
//           <div className="shop-content">
//             <Row gutter={30}>
//               <Col xs={24} lg={6}>
//                 <ShopSidebar style={{ marginTop: 10 / 16 + "em" }} />
//               </Col>
//               <Col xs={24} lg={18}>
//                 <ShopHeader title="Shop grid fullwidth" />
//                 <ProductGrid
//                   data={products}
//                   hideHeader
//                   productCol={
//                     view === "list"
//                       ? { xs: 24, sm: 12, md: 24 }
//                       : { xs: 12, sm: 12, md: 8, lg: 8 }
//                   }
//                   productType={view}
//                 />
//                 {products.count > 0 && (
//                   <Pagination
//                     onChange={onPaginationChange}
//                     defaultCurrent={currentPage}
//                     pageSize={show}
//                     total={products.count}
//                   />
//                 )}
//               </Col>
//             </Row>
//           </div>
//         </div>
//       </Container>
//     </LayoutOne>
//   );
// }

// export default React.memo(shopGrid3Column);
//////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../common/utils";
// import "../components/cssFiles/StepOne.css";
// import "../components/cssFiles/StepTwo.css";
// import "../components/cssFiles/StepThree.css";
// import "../components/cssFiles/StepFour.css";
// import Box from "@mui/material/Box";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
// import Typography from "@mui/material/Typography";

import {
  Col,
  Row,
  Pagination,
  Breadcrumb,
  Button,
  Rate,
  Modal,
  InputNumber,
} from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

import {
  fetchProductsRequest,
  fetchFeaturedProductsRequest,
} from "../../redux/actions/shopActions";
import LayoutOne from "../../components/layout/LayoutOne";
import Container from "../../components/other/Container";
import ShopSidebar from "../../components/shop/ShopSidebar";
import ShopHeader from "../../components/shop/ShopHeader";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Typography from "@material-ui/core/Typography";

const dummyProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 50,
    discount: 10,
    availability: "In Stock",
    rating: 4,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 1",
    keyFeatures: ["Feature 1", "Feature 2", "Feature 3"],
    dimensions: "10x10x10 cm",
    maintenance: "Maintenance info",
    warranty: "1 year",
    returnPolicy: "30 days return",
  },
  {
    id: 2,
    name: "Product 2",
    price: 30,
    discount: 5,
    availability: "Out of Stock",
    rating: 3,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 2",
    keyFeatures: ["Feature A", "Feature B", "Feature C"],
    dimensions: "12x12x12 cm",
    maintenance: "Maintenance info 2",
    warranty: "2 years",
    returnPolicy: "15 days return",
  },
  {
    id: 3,
    name: "Product 3",
    price: 20,
    discount: 15,
    availability: "In Stock",
    rating: 5,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 3",
    keyFeatures: ["Feature X", "Feature Y", "Feature Z"],
    dimensions: "8x8x8 cm",
    maintenance: "Maintenance info 3",
    warranty: "6 months",
    returnPolicy: "7 days return",
  },
  {
    id: 4,
    name: "Product 4",
    price: 70,
    discount: 20,
    availability: "Limited Availability",
    rating: 4,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 4",
    keyFeatures: ["Feature L", "Feature M", "Feature N"],
    dimensions: "15x15x15 cm",
    maintenance: "Maintenance info 4",
    warranty: "3 years",
    returnPolicy: "No return policy",
  },
  {
    id: 5,
    name: "Product 5",
    price: 100,
    discount: 25,
    availability: "In Stock",
    rating: 5,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 5",
    keyFeatures: ["Feature 5A", "Feature 5B", "Feature 5C"],
    dimensions: "20x20x20 cm",
    maintenance: "Maintenance info 5",
    warranty: "5 years",
    returnPolicy: "60 days return",
  },
  {
    id: 6,
    name: "Product 6",
    price: 40,
    discount: 10,
    availability: "Out of Stock",
    rating: 4,
    image: "https://via.placeholder.com/400",
    description: "Description of Product 6",
    keyFeatures: ["Feature 6A", "Feature 6B", "Feature 6C"],
    dimensions: "18x18x18 cm",
    maintenance: "Maintenance info 6",
    warranty: "1 year",
    returnPolicy: "30 days return",
  },
];

function ShopGrid3Column() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { q } = router.query;
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const shopState = useSelector((state) => state.shopReducer);
  const shopFilterState = useSelector((state) => state.shopFilterReducer);
  const { sort, show, view, category, color, size, tag } = shopFilterState;
  // const HtmlWebpackPlugin = require("html-webpack-plugin");
  // const webpack = require("webpack"); //to access built-in plugins

  // module.exports = {
  //   module: {
  //     rules: [{ test: /\.txt$/, use: "raw-loader" }],
  //   },
  //   plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  // };
  // useEffect(() => {
  //   dispatch(fetchFeaturedProductsRequest({ limit: 4 }));
  // }, []);

  useEffect(() => {
    dispatch(
      fetchProductsRequest({
        limit: show,
        category: null,
        page: currentPage,
        q,
        sort,
        view,
        category,
        color,
        size,
        tag,
      })
    );
  }, [shopFilterState, currentPage, q]);

  const onPaginationChange = (current) => {
    setCurrentPage(current);
  };

  const showModal = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const showModal1 = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setModalVisible(true);
  };

  const showModal2 = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSimilarProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }));

  function getSteps() {
    return ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="stepone-overlay">
            <div className="stepone-container">
              <div className="stepone-header">
                <h2 className="stepone-title">
                  Select Carcass (Material, Thickness & Grade)
                  {/* <br /> (Material, Thickness & Grade) */}
                </h2>
                <span className="stepone-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                {/* <button className="stepone-close-button" onClick={handleClose}>
                  ✖
                </button> */}
              </div>
              <div className="stepone-image-section">
                <div className="stepone-product-image">
                  <span className="stepone-placeholder-text">
                    Product Image 360D view
                    <br />
                    Select Product Carcass Option
                  </span>
                </div>
                <div className="stepone-thumbnails">
                  {[...Array(9)].map((_, index) => (
                    <img
                      key={index}
                      src="https://placehold.co/50x50"
                      alt="Thumb Image"
                    />
                  ))}
                  <button className="stepone-scroll-button">{">"}</button>
                </div>
              </div>
              <div className="stepone-step-info">
                <textarea
                  className="stepone-description"
                  placeholder="Product Description"
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="steptwo-overlay">
            <div className="steptwo-container">
              <div className="steptwo-header">
                <h2 className="steptwo-title">
                  Select Internal Laminate
                  <br /> (Material, Thickness & Grade)
                </h2>
                <span className="steptwo-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                {/* <button className="steptwo-close-button" onClick={handleClose}>
                  ✖
                </button> */}
              </div>
              <div className="steptwo-content">
                <div className="steptwo-item">
                  <div className="steptwo-item-image">
                    <span className="steptwo-placeholder-text">
                      Product Image 360D view
                      <br />
                      Select Product Internal Laminate Option
                    </span>
                  </div>
                  <div className="steptwo-thumbnails">
                    {[...Array(10)].map((_, index) => (
                      <img
                        key={index}
                        src="https://placehold.co/50x50"
                        alt="Thumb Image"
                      />
                    ))}
                    <button className="steptwo-scroll-button">{">"}</button>
                  </div>
                </div>
              </div>
              <div className="steptwo-footer">
                <div className="steptwo-step">Step 2 of 5</div>
                <div className="steptwo-navigation">
                  {/* <button className="steptwo-nav-button steptwo-back-button">
                    Back
                  </button>
                  <button className="steptwo-nav-button steptwo-next-button">
                    Next
                  </button> */}
                </div>
              </div>
              <div className="steptwo-description">
                <textarea
                  className="steptwo-description-textarea"
                  placeholder="Product Description"
                  readOnly
                ></textarea>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="widget-overlay">
            <div className="widget-container">
              <div className="widget-header">
                <h2 className="widget-title">
                  Select Accessories
                  <br />
                  (Material, Thickness & Grade)
                </h2>
                <span className="widget-cost">Real time Cost: 1,00,000</span>
                {/* <button className="widget-close-button" onClick={handleClose}>
                  ✖
                </button> */}
              </div>
              <div className="widget-content">
                <div className="widget-item">
                  <h3 className="widget-item-title">Drawer</h3>
                  <div className="widget-item-container">
                    <button className="widget-item-button">&lt;</button>
                    <div className="widget-item-image">Drawer Image</div>
                    <button className="widget-item-button">&gt;</button>
                  </div>
                </div>
                <div className="widget-item">
                  <h3 className="widget-item-title">Hanging Rod</h3>
                  <div className="widget-item-container">
                    <button className="widget-item-button">&lt;</button>
                    <div className="widget-item-image">Hanging Rod Image</div>
                    <button className="widget-item-button">&gt;</button>
                  </div>
                </div>
              </div>
              <div className="widget-footer">
                <span className="widget-step">Step 3 of 5</span>
              </div>
              <div className="widget-description">
                <label
                  htmlFor="product-description"
                  className="widget-description-label"
                >
                  Product Description:
                </label>
                <textarea
                  id="product-description"
                  className="widget-description-textarea"
                ></textarea>
              </div>
              {/* <div className="widget-navigation">
                <button className="widget-nav-button widget-back-button">
                  Back
                </button>
                <button className="widget-nav-button widget-next-button">
                  Next
                </button>
              </div> */}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="stepfour-overlay">
            <div className="stepfour-container">
              <div className="stepfour-header">
                <h2 className="stepfour-title">
                  Select Shutter Design
                  <br />
                  (Material, Thickness & Grade)
                </h2>
                <span className="stepfour-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                {/* <button className="stepfour-close-button" onClick={handleClose}>
                  ✖
                </button> */}
              </div>
              <div className="stepfour-content">
                <div className="stepfour-item-image">
                  <span className="stepfour-placeholder-text">
                    Door Options Images
                    <br />
                    {/* Select Product Carcass Option */}
                  </span>
                </div>
                <div className="stepfour-thumbnails">
                  {[...Array(10)].map((_, index) => (
                    <img
                      key={index}
                      src="https://placehold.co/50x50"
                      alt="Thumb Image"
                    />
                  ))}
                  <button className="stepfour-scroll-button">{">"}</button>
                </div>
              </div>
              <div className="stepfour-step-info">
                <div className="stepfour-step">Step 4 of 5</div>
                <textarea
                  className="stepfour-description"
                  placeholder="Product Description"
                  readOnly
                ></textarea>
              </div>
              <div className="stepfour-footer">
                <div className="stepfour-navigation">
                  {/* <button className="stepfour-nav-button stepfour-back-button">
                    Back
                  </button>
                  <button className="stepfour-nav-button stepfour-next-button">
                    Next
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="stepFive-overlay">
            <div className="stepFive-container">
              <div className="stepFive-header">
                <div>
                  <h2 className="stepFive-title">Review Your Product</h2>
                  <p className="stepFive-subtitle">
                    (Material, Thickness & Grade)
                  </p>
                </div>
                <p className="stepFive-cost">Final Cost: 1,00,000</p>
                {/* <button className="stepFive-closeButton" onClick={handleClose}>
                  ✖
                </button> */}
              </div>
              <div className="stepFive-imageSection">
                <p className="stepFive-imageTitle">Final 3D Look</p>
              </div>
              <div className="stepFive-buttons">
                <div className="stepFive-buttonGroup">
                  <button className="stepFive-button">
                    Closed Shutter View
                  </button>
                  <button className="stepFive-button">Internals</button>
                  <button className="stepFive-button">Drawer</button>
                  <button className="stepFive-button">Accessories</button>
                </div>
                <button className="stepFive-scrollButton">&gt;</button>
              </div>
              <div className="stepFive-stepInfo">
                <p className="stepFive-step">Step 5 of 5</p>
              </div>
              <div className="stepFive-footer">
                <div className="stepFive-descriptionSection">
                  <p className="stepFive-descriptionLabel">
                    Product Description:
                  </p>
                  <textarea className="stepFive-description" />
                </div>
                <button className="stepFive-placeOrderButton">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return "Unknown step";
    }
  }

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <LayoutOne title="Shop grid fullwidth">
      <Container>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <i className="fas fa-home" />
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item>Shop</Breadcrumb.Item>
        </Breadcrumb>
        <div className="shop">
          <div className="shop-content">
            <Row gutter={30}>
              <Col xs={24} lg={6}>
                <ShopSidebar style={{ marginTop: 10 / 16 + "em" }} />
              </Col>

              <Col xs={24} lg={18}>
                <ShopHeader title="Shop grid fullwidth" />
                <Row gutter={16}>
                  {dummyProducts.map((product) => (
                    <Col key={product.id} xs={12} sm={12} md={8} lg={8}>
                      <div className="product" id="product">
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                          <h3>{product.name}</h3>
                          <p>Price:{formatCurrency(product.price)}</p>
                          <p>Availability: {product.availability}</p>
                          <Rate disabled defaultValue={product.rating} />
                          <Button
                            type="primary"
                            onClick={() => showModal1(product)}
                            style={{ marginTop: "10px" }}
                          >
                            IMDE
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
                {dummyProducts.length > 0 && (
                  <Pagination
                    onChange={onPaginationChange}
                    defaultCurrent={currentPage}
                    pageSize={show}
                    total={dummyProducts.length}
                  />
                )}
              </Col>
            </Row>
          </div>
        </div>
      </Container>
      {selectedProduct && (
        <Modal
          visible={modalVisible}
          title={selectedProduct.name}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Closes
            </Button>,
            <Button key="submit" type="primary"></Button>,
          ]}
          width={1200}
        >
          <div className={classes.root}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant="caption">Optional</Typography>
                  );
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  <Typography className={classes.instructions}>
                    {getStepContent(activeStep)}
                  </Typography>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    {isStepOptional(activeStep) && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSkip}
                        className={classes.button}
                      >
                        Skip
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
      <style jsx>{`
      `}</style>

      <style jsx>{`
        .product {
          position: relative;
          overflow: hidden;
          border: 1px solid #f0f0f0;
          padding: 16px;
          text-align: center;
          margin-bottom: 16px;
          cursor: pointer;
          transition: transform 0.3s;
        }

        .product:hover {
          transform: scale(1.05);
        }

        .product img {
          max-width: 100%;
          height: auto;
          transition: transform 0.3s;
        }

        .product-details {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          opacity: 0.5;
          transition: opacity 0.3s;
        }

        .product:hover .product-details {
          opacity: 1;
        }

        .product-details h3,
        .product-details p,
        .product-details .ant-rate {
          margin: 10px 0;
        }

        .modal-content {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .modal-main {
          display: flex;
          width: 100%;
          margin-bottom: 16px;
        }

        .modal-details {
          flex: 2;
          padding-left: 16px;
        }

        .modal-image {
          flex: 1.5;
          text-align: center;
        }

        .modal-image img {
          max-width: 100%;
          transition: transform 0.3s;
        }

        .modal-image img:hover {
          transform: scale(1.2);
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          margin: 16px 0;
        }

        .quantity-controls .ant-btn {
          margin: 0 8px;
        }

        .similar-products {
          width: 100%;
          padding: 16px 0;
        }

        .similar-products h4 {
          margin-top: 16px;
        }

        /* StepOne.css */

        /* StepTwo.css */
      `}</style>
    </LayoutOne>
  );
}

export default React.memo(ShopGrid3Column);
