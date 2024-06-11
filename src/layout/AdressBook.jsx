import React, { useEffect, useState } from "react";

import accountAddressStates from "../json/accountAddressStates.json";

import { fetchUserAddresses } from "../functions/fetchFunctions";
import { handleChange } from "../functions/handleChange";

const AdressBook = ({ userID }) => {
  const [addressList, setAddressList] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUserAddresses().then((list) => {
      setAddressList(list);
    });
  }, []);

  const [addressFormStates, setAddressFormStates] = useState(accountAddressStates);
  const handleFocus = (addressID) => {
    setAddressFormStates({
      ...addressFormStates,
      [addressID]: {
        ...addressFormStates[addressID],
        isFocused: true,
      },
    });
  };
  const handleBlur = (addressID) => {
    setAddressFormStates((prevAddressForm) => ({
      ...prevAddressForm,
      [addressID]: {
        ...prevAddressForm[addressID],
        isFocused: false,
        hasError:
          prevAddressForm[addressID].value.length === 0
            ? "! Input field required."
            : prevAddressForm[addressID].hasError,
      },
    }));
  };

  const handleAddressSubmit = (event) => {
    event.preventDefault();

    let errors = [];
    for (const objState of Object.values(addressFormStates)) {
      if (objState.form === "address") {
        if (objState.hasError) errors = errors.concat(objState.hasError);
      }
    }
    if (!errors.length) {
      console.log("goood");
    }
  };

  return (
    <form onSubmit={handleAddressSubmit} className="update-address-book">
      <div className="update-address-book__header">
        <h1 className="upp">
          {isCreating ? "add a new address" : "manage your saved addresses"}
        </h1>
      </div>
      {isCreating ? (
        <div className="add-address">
          <div className="add-address__wrapper">
            <div className="update-address-book__first-name">
              <div className="input-wrapper">
                <label
                  htmlFor="addressFirstName"
                  className={`cap${
                    addressFormStates.addressFirstName.isFocused ||
                    addressFormStates.addressFirstName.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \first name
                </label>
                <div>
                  <input
                    type="text"
                    id="addressFirstName"
                    value={addressFormStates.addressFirstName.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("addressFirstName")}
                    onBlur={() => handleBlur("addressFirstName")}
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressFirstName",
                        addressFormStates.addressFirstName.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressFirstName.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressFirstName.hasError}
                </p>
              </div>
            </div>
            <div className="update-address-book__last-name">
              <div className="input-wrapper">
                <label
                  htmlFor="addressLastName"
                  className={`cap${
                    addressFormStates.addressLastName.isFocused ||
                    addressFormStates.addressLastName.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \last name
                </label>
                <div>
                  <input
                    type="text"
                    id="addressLastName"
                    value={addressFormStates.addressLastName.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("addressLastName")}
                    onBlur={() => handleBlur("addressLastName")}
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressLastName",
                        addressFormStates.addressLastName.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressLastName.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressLastName.hasError}
                </p>
              </div>
            </div>
          </div>
          <div className="update-address-book__street">
            <div className="input-wrapper">
              <label
                htmlFor="addressStreet"
                className={`cap${
                  addressFormStates.addressStreet.isFocused ||
                  addressFormStates.addressStreet.value !== ""
                    ? " isFocused"
                    : " notFocused"
                }`}
              >
                \address line 1
                <span className="address-line">- street address</span>
              </label>
              <div>
                <input
                  type="text"
                  id="addressStreet"
                  value={addressFormStates.addressStreet.value}
                  maxLength="50"
                  autoComplete="street-address"
                  spellCheck="false"
                  onFocus={() => handleFocus("addressStreet")}
                  onBlur={() => handleBlur("addressStreet")}
                  onChange={(event) =>
                    handleChange(
                      event,
                      "addressStreet",
                      addressFormStates.addressStreet.type,
                      setAddressFormStates
                    )
                  }
                />
              </div>
              <p
                className={
                  addressFormStates.addressStreet.hasError ? "hasError" : "valid"
                }
              >
                {addressFormStates.addressStreet.hasError}
              </p>
            </div>
          </div>
          <div className="update-address-book__street-two">
            <div className="input-wrapper">
              <label
                htmlFor="addressStreetTwo"
                className={`cap${
                  addressFormStates.addressStreetTwo.isFocused ||
                  addressFormStates.addressStreetTwo.value !== ""
                    ? " isFocused"
                    : " notFocused"
                }`}
              >
                \address line 2
                <span className="address-line">
                  - apartment / floor / suite / access code
                </span>
              </label>
              <div>
                <input
                  type="text"
                  id="addressStreetTwo"
                  value={addressFormStates.addressStreetTwo.value}
                  maxLength="50"
                  autoComplete="off"
                  spellCheck="false"
                  onFocus={() => handleFocus("addressStreetTwo")}
                  onBlur={() => handleBlur("addressStreetTwo")}
                  onChange={(event) =>
                    handleChange(
                      event,
                      "addressStreetTwo",
                      addressFormStates.addressStreetTwo.type,
                      setAddressFormStates
                    )
                  }
                />
              </div>
              <p
                className={
                  addressFormStates.addressStreetTwo.hasError ? "hasError" : "valid"
                }
              >
                {addressFormStates.addressStreetTwo.hasError}
              </p>
            </div>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__city">
              <div className="input-wrapper">
                <label
                  htmlFor="addressCity"
                  className={`cap${
                    addressFormStates.addressCity.isFocused ||
                    addressFormStates.addressCity.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \city
                </label>
                <div>
                  <input
                    type="text"
                    id="addressCity"
                    value={addressFormStates.addressCity.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("addressCity")}
                    onBlur={() => handleBlur("addressCity")}
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressCity",
                        addressFormStates.addressCity.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressCity.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressCity.hasError}
                </p>
              </div>
            </div>
            <div className="update-address-book__postal-code">
              <div className="input-wrapper">
                <label
                  htmlFor="addressPostalCode"
                  className={`cap${
                    addressFormStates.addressPostalCode.isFocused ||
                    addressFormStates.addressPostalCode.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \postal code
                </label>
                <div>
                  <input
                    type="text"
                    id="addressPostalCode"
                    value={addressFormStates.addressPostalCode.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("addressPostalCode")}
                    onBlur={() => handleBlur("addressPostalCode")}
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressPostalCode",
                        addressFormStates.addressPostalCode.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressPostalCode.hasError
                      ? "hasError"
                      : "valid"
                  }
                >
                  {addressFormStates.addressPostalCode.hasError}
                </p>
              </div>
            </div>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__province">
              <div className="input-wrapper">
                <label
                  htmlFor="addressProvince"
                  className={`cap${
                    addressFormStates.addressProvince.isFocused ||
                    addressFormStates.addressProvince.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \province
                </label>
                <div>
                  <input
                    type="text"
                    id="addressProvince"
                    value={addressFormStates.addressProvince.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onFocus={() => handleFocus("addressProvince")}
                    onBlur={() => handleBlur("addressProvince")}
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressProvince",
                        addressFormStates.addressProvince.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressProvince.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressProvince.hasError}
                </p>
              </div>
            </div>
            <div className="update-address-book__country">
              <div className="input-wrapper">
                <label
                  htmlFor="addressCountry"
                  className={`cap${
                    addressFormStates.addressCountry.isFocused ||
                    addressFormStates.addressCountry.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \country
                </label>
                <div>
                  <input
                    type="text"
                    id="addressCountry"
                    value={addressFormStates.addressCountry.value}
                    maxLength="30"
                    autoComplete="off"
                    spellCheck="false"
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressCountry",
                        addressFormStates.addressCountry.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressCountry.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressCountry.hasError}
                </p>
              </div>
            </div>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__phone">
              <div className="input-wrapper">
                <label
                  htmlFor="addressPhone"
                  className={`cap${
                    addressFormStates.addressPhone.isFocused ||
                    addressFormStates.addressPhone.value !== ""
                      ? " isFocused"
                      : " notFocused"
                  }`}
                >
                  \phone number
                </label>
                <div className="__container">
                  <span>+1</span>
                  <input
                    type="tel"
                    id="addressPhone"
                    value={addressFormStates.addressPhone.value}
                    autoComplete="off"
                    onChange={(event) =>
                      handleChange(
                        event,
                        "addressPhone",
                        addressFormStates.addressPhone.type,
                        setAddressFormStates
                      )
                    }
                  />
                </div>
                <p
                  className={
                    addressFormStates.addressPhone.hasError ? "hasError" : "valid"
                  }
                >
                  {addressFormStates.addressPhone.hasError}
                </p>
              </div>
            </div>
            <div className="update-address-book__null">
              <div className="input-wrapper"></div>
            </div>
          </div>
          <p className="disclaimer">
            Please ensure that the billing and shipping address provided are
            accurate and complete. Any discrepancies may result in delays or
            issues with your order shipment. Thank you for your attention to
            detail.
          </p>
          <div className="add-address__button__wrapper">
            <button className="add-address__button-dark">
              add new address
            </button>
            <p
              className="cancel-add-address cap"
              onClick={() => setIsCreating(false)}
            >
              Cancel
            </p>
          </div>
        </div>
      ) : addressList !== null ? (
        "list of addresses..."
      ) : (
        <div className="no-addresses">
          <p className="cap">your adress book is empty.</p>
          <div
            className="create-address__button-light"
            onClick={() => setIsCreating(true)}
          >
            create new address
          </div>
        </div>
      )}
    </form>
  );
};

export default AdressBook;
