
import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/action";

const countryStates = {
  India: [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
    "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab",
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu and Kashmir", "Ladakh"
  ],

  USA: [
    "California", "Texas", "Florida", "New York",
    "Washington", "Arizona", "Colorado", "Georgia",
    "Illinois", "Nevada", "Ohio", "Pennsylvania"
  ],

  Canada: [
    "Ontario", "Quebec", "British Columbia", "Alberta",
    "Manitoba", "Saskatchewan", "Nova Scotia",
    "New Brunswick", "Newfoundland and Labrador"
  ],

  Australia: [
    "New South Wales", "Victoria", "Queensland",
    "Western Australia", "South Australia", "Tasmania",
    "Australian Capital Territory", "Northern Territory"
  ],

  UK: [
    "England", "Scotland", "Wales", "Northern Ireland"
  ],

  Germany: [
    "Bavaria", "Berlin", "Hamburg", "Hesse",
    "Saxony", "Brandenburg", "Bremen"
  ],

  France: [
    "Île-de-France", "Normandy", "Brittany",
    "Occitanie", "Grand Est", "Nouvelle-Aquitaine"
  ],

  Japan: [
    "Tokyo", "Osaka", "Kyoto", "Hokkaido",
    "Aichi", "Fukuoka", "Okinawa"
  ],

  UAE: [
    "Abu Dhabi", "Dubai", "Sharjah", "Ajman",
    "Fujairah", "Ras Al Khaimah", "Umm Al Quwain"
  ],

  Singapore: [
    "Central Region", "East Region",
    "North Region", "North-East Region", "West Region"
  ]
};

const Checkout = () => {
  const cart = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const [country, setCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");

  const [orderPlaced, setOrderPlaced] = useState(null);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const shipping = 30;
  const totalItems = cart.reduce(
    (total, item) => total + item.qty,
    0
  );

  const totalAmount = Math.round(subtotal + shipping);

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    setSelectedState("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const orderId =
      "SHOP-" + Date.now().toString().slice(-10);

    const order = {
      orderId,
      customer: {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        mobile: formData.get("mobile"),
        address: formData.get("address"),
        address2: formData.get("address2"),
        country,
        state: selectedState,
        city: formData.get("city"),
        zip: formData.get("zip")
      },
      products: cart,
      subtotal: Math.round(subtotal),
      shipping,
      total: totalAmount,
      paymentMethod: "Cash on Delivery",
      status: "Order Placed",
      orderDate: new Date().toISOString()
    };

    // Save order history in Local Storage
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    localStorage.setItem(
      "orders",
      JSON.stringify([...existingOrders, order])
    );

    // Clear cart after successful order
    dispatch(clearCart());

    // Display confirmation
    setOrderPlaced(order);
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row">
        <div className="col-md-12 py-5 bg-light text-center">
          <h4 className="p-3 display-5">No item in Cart</h4>
          <Link to="/" className="btn btn-outline-dark mx-4">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  const OrderSuccess = () => (
    <div className="container py-5">
      <div className="card shadow-sm text-center p-4 mx-auto"
        style={{ maxWidth: "650px" }}>

        <div className="mb-3">
          <i
            className="fa fa-check-circle text-success"
            style={{ fontSize: "75px" }}
          ></i>
        </div>

        <h2 className="text-success">
          Order Placed Successfully!
        </h2>

        <p className="lead mt-3">
          Thank you for shopping with Shopify.
        </p>

        <p>
          Your order has been received and is being processed.
          Your package will be delivered to your address soon.
        </p>

        <hr />

        <h5>Order Details</h5>

        <p>
          <strong>Order ID:</strong> {orderPlaced.orderId}
        </p>

        <p>
          <strong>Total Amount:</strong> $
          {orderPlaced.total}
        </p>

        <p>
          <strong>Payment:</strong> Cash on Delivery
        </p>

        <p>
          <strong>Order Status:</strong>{" "}
          <span className="badge bg-success">
            {orderPlaced.status}
          </span>
        </p>

        <p className="text-muted">
          A confirmation has been saved in your order history.
        </p>

        <Link to="/" className="btn btn-dark mt-3">
          Continue Shopping
        </Link>
      </div>
    </div>
  );

  const ShowCheckout = () => (
    <div className="container py-5">
      <div className="row my-4">

        {/* Order Summary */}
        <div className="col-md-5 col-lg-4 order-md-last">
          <div className="card mb-4">
            <div className="card-header py-3 bg-light">
              <h5 className="mb-0">Order Summary</h5>
            </div>

            <div className="card-body">
              <ul className="list-group list-group-flush">

                <li className="list-group-item d-flex justify-content-between">
                  Products ({totalItems})
                  <span>${Math.round(subtotal)}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  Shipping
                  <span>${shipping}</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  <strong>Total Amount</strong>
                  <strong>${totalAmount}</strong>
                </li>

              </ul>

              <hr />

              <h6>Products in your cart</h6>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between my-2"
                >
                  <small>
                    {item.title.substring(0, 25)}... x {item.qty}
                  </small>

                  <small>
                    ${Math.round(item.price * item.qty)}
                  </small>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Billing Address */}
        <div className="col-md-7 col-lg-8">
          <div className="card mb-4">

            <div className="card-header py-3">
              <h4 className="mb-0">Shipping Address</h4>
            </div>

            <div className="card-body">

              <form onSubmit={handleSubmit}>

                <div className="row g-3">

                  <div className="col-sm-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="form-control"
                      placeholder="First name"
                      required
                    />
                  </div>

                  <div className="col-sm-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="form-control"
                      placeholder="Last name"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      className="form-control"
                      placeholder="Enter mobile number"
                      pattern="[0-9+() -]{7,20}"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="House number, street name"
                      required
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label">
                      Address 2 (Optional)
                    </label>
                    <input
                      type="text"
                      name="address2"
                      className="form-control"
                      placeholder="Apartment or suite"
                    />
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label className="form-label">Country</label>

                    <select
                      className="form-select"
                      value={country}
                      onChange={handleCountryChange}
                      required
                    >
                      {Object.keys(countryStates).map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dynamic State */}
                  <div className="col-md-6">
                    <label className="form-label">
                      State / Province
                    </label>

                    <select
                      className="form-select"
                      value={selectedState}
                      onChange={(e) =>
                        setSelectedState(e.target.value)
                      }
                      required
                    >
                      <option value="">Choose State...</option>

                      {countryStates[country].map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      placeholder="Enter city"
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">
                      ZIP / PIN Code
                    </label>
                    <input
                      type="text"
                      name="zip"
                      className="form-control"
                      placeholder="Enter postal code"
                      required
                    />
                  </div>

                </div>

                <hr className="my-4" />

                <h4 className="mb-3">Payment Method</h4>

                <div className="alert alert-info">
                  <strong>Cash on Delivery (COD)</strong>
                  <p className="mb-0 mt-2">
                    Pay for your order when it arrives at your
                    delivery address.
                  </p>
                </div>

                <hr className="my-4" />

                <button
                  className="w-100 btn btn-dark btn-lg"
                  type="submit"
                >
                  Place Order - ${totalAmount}
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return (
    <>
      <Navbar />

      <div className="container my-3 py-3">
        <h1 className="text-center">Checkout</h1>
        <hr />

        {orderPlaced ? (
          <OrderSuccess />
        ) : cart.length > 0 ? (
          <ShowCheckout />
        ) : (
          <EmptyCart />
        )}

      </div>

      <Footer />
    </>
  );
};

export default Checkout;
