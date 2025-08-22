import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import HeroSection from "../HeroSection";
import styles from "../../css/CheckoutPage.module.css";

export default function CheckoutPage() {
  const { cart } = useCart();
  const shippingCost = 10;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + shippingCost;

  const [showShipping, setShowShipping] = useState(false);

  const [billing, setBilling] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInput = (e, setFunc) => {
    const { name, value } = e.target;
    setFunc((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
  };

  return (
    <>
      <HeroSection heading="CHECKOUT" page="Checkout" />
      <main className={styles.checkoutMain}>
        <div className={styles.addressForms}>
          <div className={`${styles.billingAddress} ${styles.addressForm}`}>
            <h2>Billing Address</h2>
            <form>
              {[
                ["First Name", "firstName"],
                ["Last Name", "lastName"],
                ["E-Mail", "email"],
                ["Mobile No", "phone"],
                ["Address Line 1", "address1"],
                ["Address Line 2", "address2"],
                ["City", "city"],
                ["State", "state"],
                ["Zip Code", "zip"],
              ].map(([label, name]) => (
                <div className={styles.formElement} key={name}>
                  <label htmlFor={name}>{label}</label>
                  <input
                    type="text"
                    id={name}
                    name={name}
                    placeholder={label}
                    value={billing[name]}
                    onChange={(e) => handleInput(e, setBilling)}
                  />
                </div>
              ))}

              <div className={styles.formElement}>
                <label htmlFor="country">Country</label>
                <select
                  name="country"
                  id="country"
                  value={billing.country}
                  onChange={(e) => handleInput(e, setBilling)}
                >
                  <option value="">Select Country</option>
                  <option value="United States">United States</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                </select>
              </div>
            </form>

            <div className={styles.addressFormCheckbox}>
              <input type="checkbox" id="createAcc" />
              <label htmlFor="createAcc">Create an account</label>
            </div>

            <div className={styles.addressFormCheckbox}>
              <input
                type="checkbox"
                id="shipAddress"
                checked={showShipping}
                onChange={() => setShowShipping(!showShipping)}
              />
              <label htmlFor="shipAddress">Ship to different address</label>
            </div>
          </div>

          {showShipping && (
            <div className={`${styles.shippingAddress} ${styles.addressForm}`}>
              <h2>Shipping Address</h2>
              <form>
                {[
                  ["First Name", "firstName"],
                  ["Last Name", "lastName"],
                  ["E-Mail", "email"],
                  ["Mobile No", "phone"],
                  ["Address Line 1", "address1"],
                  ["Address Line 2", "address2"],
                  ["City", "city"],
                  ["State", "state"],
                  ["Zip Code", "zip"],
                ].map(([label, name]) => (
                  <div className={styles.formElement} key={name}>
                    <label htmlFor={`shipping-${name}`}>{label}</label>
                    <input
                      type="text"
                      id={`shipping-${name}`}
                      name={name}
                      placeholder={label}
                      value={shipping[name]}
                      onChange={(e) => handleInput(e, setShipping)}
                    />
                  </div>
                ))}

                <div className={styles.formElement}>
                  <label htmlFor="shipping-country">Country</label>
                  <select
                    name="country"
                    id="shipping-country"
                    value={shipping.country}
                    onChange={(e) => handleInput(e, setShipping)}
                  >
                    <option value="">Select Country</option>
                    <option value="United States">United States</option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                  </select>
                </div>
              </form>
            </div>
          )}
        </div>

        <div className={styles.checkoutSlip}>
          <div className={styles.orderTotal}>
            <h2>Order Total</h2>
            <h3>Products</h3>
            <div id="order-items" className={styles.orderprice}>
              {cart.map((item, i) => (
                <div key={i} className={styles.orderItemRow}>
                  <div>
                    {item.name} ({item.size}, {item.color}) x{item.quantity}
                  </div>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className={styles.ot1}>
              <div>
                Subtotal <span>${subtotal}</span>
              </div>
              <div>
                Shipping <span>${shippingCost}</span>
              </div>
            </div>
            <div className={styles.ot2}>
              <div>
                Total <span>${total}</span>
              </div>
            </div>
          </div>

          <div className={styles.paymentOptions}>
            <h2>Payment</h2>
            <form>
              <div>
                <input type="radio" id="paypal" name="payment" />
                <label htmlFor="paypal">Paypal</label>
              </div>
              <div>
                <input type="radio" id="directCheck" name="payment" />
                <label htmlFor="directCheck">Direct Check</label>
              </div>
              <div>
                <input type="radio" id="bankTransfer" name="payment" />
                <label htmlFor="bankTransfer">Bank Transfer</label>
              </div>
            </form>
            <div>
              <button className="pink-background" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
