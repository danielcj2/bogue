import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from "../features/cart/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import tshirt from "../imgs/crewneck_shirt_red.png";

const ShoppingCart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      {items.map((item) => (
        <div className="cart__item" key={`cart__item-${item.apparel_id}`}>
          <div className="cart__item__wrapper">
            <div
              className="cart__item__picture"
              style={{
                backgroundImage: `url(${tshirt})`,
                backgroundPosition: "top",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
          <div className="cart__item__wrapper">
            <div className="cart__item__name">{item.apparel_name}</div>
            <div className="cart__item__cost">${item.cost}</div>
            <div className="cart__item__color cap">
              Colour: <span>{item.color}</span>
            </div>
            <div className="cart__item__size">
              Size: <span>{item.size}</span>
            </div>
            <div
              className="cart__item__remove"
              onClick={() => dispatch(removeItemFromCart(item.apparel_id))}
            >
              Remove
            </div>
          </div>
          <div className="cart__item__wrapper">
            <div className="cart__item__quantity">
              <div
                className="cart__item__quantity__decrease"
                onClick={() => dispatch(decreaseQuantity(item.apparel_id))}
              >
                <AiOutlineMinus />
              </div>
              <div className="cart__item__quantity__number">
                {item.quantity}
              </div>
              <div
                className="cart__item__quantity__increase"
                onClick={() => dispatch(increaseQuantity(item.apparel_id))}
              >
                <AiOutlinePlus />
              </div>
            </div>
          </div>
        </div>
      ))}
      {items?.length !== 0 ? (
        <>
          <div className="cart__total">
            Total:
            <span>${Math.round((total + Number.EPSILON) * 100) / 100}</span>
          </div>
          <div className="cart__checkout">
            <div className="cart__checkout__button-light">checkout</div>
          </div>
        </>
      ) : (
        <div className="cart__no-items">You do not have any apparel items in your cart.</div>
      )}
    </div>
  );
};

export default ShoppingCart;
