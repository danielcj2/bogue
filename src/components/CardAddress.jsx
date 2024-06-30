import { PiTrashLight, PiPencilSimpleLight } from "react-icons/pi";
import { formatPhone } from "../functions/handleChange";
import { handleDeleteAddress } from "../functions/authenticationFunctions";

const CardAddress = ({ address, edit, setAlert, dispatch }) => {
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
          <p>+1 {formatPhone(address.phone_number)}</p>
        </div>
        <div className="update-address-book__card__wrapper">
          <div className="address__button" onClick={() => edit(address)}>
            <span>Edit</span>
          </div>
          <div
            className="address__button"
            onClick={() =>
              handleDeleteAddress(address.address_id, setAlert, dispatch)
            }
          >
            <PiTrashLight />
            <span>Remove</span>
          </div>
        </div>
      </div>
      {/* <span onClick={() => edit(address)}>
        <PiPencilSimpleLight />
      </span> */}
    </div>
  );
};

export default CardAddress;
