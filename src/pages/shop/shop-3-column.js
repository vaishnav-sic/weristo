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
 
  const handleCancel = () => {
    setModalVisible(false);
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
                      <div
                        className="product"
                        id="product"
                        onClick={() => showModal(product)}>
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                          <h3>{product.name}</h3>
                          <p>Price:{formatCurrency(product.price)}</p>
                          <p>Availability: {product.availability}</p>
                          <Rate disabled defaultValue={product.rating} />
                          <Button type="primary" style={{ marginTop: "10px" }}>
                            IMD
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
              Close
            </Button>,
            <Button key="submit" type="primary">
              Add to Cart
            </Button>,
          ]}
          width={1200}>
          <div className="modal-content">
            <div className="modal-main">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <h3>{selectedProduct.name}</h3>
                <p>
                  Price: {formatCurrency}
                  {selectedProduct.price}{" "}
                  {selectedProduct.discount && (
                    <span>
                      (Discount: {selectedProduct.discount}% off, New Price:{" "}
                      {formatCurrency}
                      {(
                        selectedProduct.price *
                        (1 - selectedProduct.discount / 100)
                      ).toFixed(2)}
                      )
                    </span>
                  )}
                </p>
                <p>Availability: {selectedProduct.availability}</p>
                <Rate disabled defaultValue={selectedProduct.rating} />
                <p>EMI options available</p>
                <div className="quantity-controls">
                  <Button
                    icon={<MinusOutlined />}
                    onClick={decrementQuantity}
                  />
                  <InputNumber min={1} value={quantity} readOnly />
                  <Button icon={<PlusOutlined />} onClick={incrementQuantity} />
                </div>
                <Button type="primary" style={{ marginTop: "10px" }}>
                  Add to Cart
                </Button>
                <h4>Description</h4>
                <p>{selectedProduct.description}</p>
                <h4>Key Features</h4>
                <ul>
                  {selectedProduct.keyFeatures.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <h4>Dimensions</h4>
                <p>{selectedProduct.dimensions}</p>
                <h4>Maintenance</h4>
                <p>{selectedProduct.maintenance}</p>
                <h4>Warranty Summary</h4>
                <p>{selectedProduct.warranty}</p>
                <h4>Return Policy</h4>
                <p>{selectedProduct.returnPolicy}</p>
              </div>
            </div>
            <div className="similar-products">
              <h4>Similar Products</h4>
              <Row gutter={16}>
                {dummyProducts
                  .filter((product) => product.id !== selectedProduct.id)
                  .map((product) => (
                    <Col
                      key={product.id}
                      xs={12}
                      sm={12}
                      md={8}
                      lg={8}
                      onClick={() => handleSimilarProductClick(product)}>
                      <div className="product">
                        <img src={product.image} alt={product.name} />
                        <div className="product-details">
                          <h3>{product.name}</h3>
                          <p>
                            Price: {formatCurrency}
                            {product.price}
                          </p>
                          <Rate disabled defaultValue={product.rating} />
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
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
      `}</style>
    </LayoutOne>
  );
}
 
export default React.memo(ShopGrid3Column);
 