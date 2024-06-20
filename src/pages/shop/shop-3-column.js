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
import "../components/cssFiles/StepOne.css";
import StepTwo from "../components/StepTwo.jsx";
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

  useEffect(() => {
    dispatch(fetchFeaturedProductsRequest({ limit: 4 }));
  }, []);

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
    return ["Select campaign settings", "Create an ad group", "Create an ad"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div className="stepone-overlay">
            <div className="stepone-container">
              <div className="stepone-header">
                <h2 className="stepone-title">
                  Select Carcass
                  <br /> (Material, Thickness & Grade)
                </h2>
                <span className="stepone-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                <button className="stepone-close-button" onClick={handleClose}>
                  ✖
                </button>
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
          <div className="stepone-overlay">
            <div className="stepone-container">
              <div className="stepone-header">
                <h2 className="stepone-title">
                  Select Carcass
                  <br /> (Material, Thickness & Grade)
                </h2>
                <span className="stepone-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                <button className="stepone-close-button" onClick={handleClose}>
                  ✖
                </button>
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
      case 2:
        return (
          <div className="stepone-overlay">
            <div className="stepone-container">
              <div className="stepone-header">
                <h2 className="stepone-title">
                  Select Carcass
                  <br /> (Material, Thickness & Grade)
                </h2>
                <span className="stepone-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                <button className="stepone-close-button" onClick={handleClose}>
                  ✖
                </button>
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
      case 3:
        return (
          <div className="stepone-overlay">
            <div className="stepone-container">
              <div className="stepone-header">
                <h2 className="stepone-title">
                  Select Carcass
                  <br /> (Material, Thickness & Grade)
                </h2>
                <span className="stepone-cost">
                  Real time Cost: <span id="real-time-cost">1,00,000</span>
                </span>
                <button className="stepone-close-button" onClick={handleClose}>
                  ✖
                </button>
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

        .stepone-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          /* background-color: rgba(5, 109, 255, 0.75);  */
          max-width: 90%;
          margin: auto;
          /* padding: 16px; */
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(255, 0, 0, 0.1);
        }

        .stepone-container {
          /* position: relative; */
          background-color: white;
          color: black;
          width: 100%;
          max-width: 100%;
          /* padding: 16px; */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .stepone-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }

        .stepone-title {
          font-size: 1.125rem; /* text-lg */
          font-weight: 600;
        }

        .stepone-cost {
          font-size: 0.875rem; /* text-sm */
        }

        .stepone-close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
        }

        .stepone-image-section {
          display: flex;
          flex-direction: column;
          gap: 16px; /* space-y-4 */
        }

        .stepone-product-image {
          width: 100%;
          height: 200px; /* Adjust height as needed */
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          text-align: center;
          padding: 16px;
        }

        .stepone-placeholder-text {
          text-align: center;
        }

        .stepone-thumbnails {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .stepone-thumbnails img {
          width: 50px;
          height: 50px;
          border: 1px solid #ccc;
        }

        .stepone-scroll-button {
          padding: 8px;
          cursor: pointer;
        }

        .stepone-step-info {
          margin-top: 16px;
        }

        .stepone-step {
          font-size: 0.875rem; /* text-sm */
        }

        .stepone-description {
          width: 100%;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 8px;
          margin-top: 8px;
          resize: none;
          height: 100px; /* Adjust height as needed */
        }

        .stepone-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 1px;
        }

        .stepone-nav-button {
          padding: 8px 16px;
          border-radius: 8px;
        }

        .stepone-back-button {
          background-color: #d1d5db; /* bg-zinc-300 */
          color: black;
        }

        .stepone-next-button {
          background-color: #3b82f6; /* bg-blue-500 */
          color: white;
        }

        /* Responsive Styles */

        @media (max-width: 768px) {
          .stepone-container {
            max-width: 95%;
          }
        }

        @media (max-width: 480px) {
          .stepone-container {
            max-width: 100%;
          }

          .stepone-title {
            font-size: 1rem; /* Adjust font size for smaller screens */
          }

          .stepone-nav-button {
            padding: 6px 12px; /* Adjust padding for smaller screens */
          }
        }

        /* StepTwo.css */

        .steptwo-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          /* background-color: rgba(5, 109, 255, 0.75);  */
          max-width: 90%;
          margin: auto;
          /* padding: 16px; */
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(255, 0, 0, 0.1);
        }

        .steptwo-container {
          position: relative;
          background-color: rgb(255, 255, 255);
          color: black;
          width: 100%;
          max-width: 100%;
          height: 100%;
          /* padding: 16px; */
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .steptwo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;
          padding-bottom: 8px;
          margin-bottom: 16px;
        }

        .steptwo-title {
          font-size: 1.125rem;
          font-weight: 600;
        }

        .steptwo-cost {
          font-size: 0.875rem;
        }

        .steptwo-close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: #333;
        }

        .steptwo-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .steptwo-item {
          width: 100%;
        }

        .steptwo-item-image {
          width: 100%;
          height: 200px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border: 1px solid #ccc;
          background-color: #f0f0f0;
          text-align: center;
          padding: 16px;
          position: relative;
        }

        .steptwo-placeholder-text {
          text-align: center;
        }

        .steptwo-thumbnails {
          display: flex;
          align-items: center;
          gap: 8px;
          position: absolute;
          bottom: 8px;
        }

        .steptwo-scroll-button {
          width: 50px;
          height: 50px;
          background-color: transparent;
          border: 1px solid #ccc;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }

        .steptwo-step-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .steptwo-step {
          font-size: 0.875rem;
        }

        .steptwo-description {
          width: 100%;
        }

        .steptwo-description-textarea {
          width: 100%;
          border: 1px solid #ccc;
          padding: 8px;
          border-radius: 8px;
        }

        .steptwo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 16px;
        }

        .steptwo-navigation {
          display: flex;
          gap: 8px;
        }

        .steptwo-nav-button {
          padding: 8px 16px;
          border-radius: 8px;
        }

        .steptwo-back-button {
          background-color: #d1d5db;
          color: black;
        }

        .steptwo-next-button {
          background-color: #3b82f6;
          color: white;
        }

        /* Responsive Styles */
        @media (max-width: 768px) {
          .steptwo-container {
            max-width: 95%;
          }
        }

        @media (max-width: 480px) {
          .steptwo-container {
            max-width: 100%;
          }

          .steptwo-title {
            font-size: 1rem;
          }

          .steptwo-nav-button {
            padding: 6px 12px;
          }
        }
      `}</style>
    </LayoutOne>
  );
}

export default React.memo(ShopGrid3Column);
