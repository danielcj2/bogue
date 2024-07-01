import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../features/cart/cartSlice";

const ShoppingCart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="cart">
      {items.map((item) => (
        <div className="cart__item" key={`cart__item-${item.apparel_id}`}>
          <div className="cart__item__name">{item.apparel_name}</div>
          <p className="cart__item__cost">${item.cost}</p>
          <div
            className="cart__item__remove"
            onClick={() => dispatch(removeItemFromCart(item.apparel_id))}
          >
            Remove
          </div>
        </div>
      ))}
      <div className="cart__total">
        Total:<span>${Math.round((total + Number.EPSILON) * 100) / 100}</span>
      </div>
      <div className="cart__checkout">
        <div className="cart__checkout__button-light">checkout</div>
      </div>
    </div>
  );
};

export default ShoppingCart;
