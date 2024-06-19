import {
  PiTrashLight,
  PiPencilSimpleLight 
} from "react-icons/pi";

const CardAddress = ({ address }) => {
  return (
    <div className="icon__wrapper">
      <div className="update-address-book__card" key={address.address_id}>
        <div className="update-address-book__card__header">
          <h4 className="cap">
            {address.first_name} {address.last_name}
          </h4>
          <p>
            {address.street}, {address.city}, {address.province},{" "}
            {address.postal_code}
          </p>
        </div>
        <div className="update-address-book__card__wrapper">
          <div className="address__button">
            <span>Edit</span>
          </div>
          <div className="address__button">
            <PiTrashLight />
            <span>Remove</span>
          </div>
        </div>
      </div>
      <span>
        <PiPencilSimpleLight />
      </span>
    </div>
  );
};

export default CardAddress;
