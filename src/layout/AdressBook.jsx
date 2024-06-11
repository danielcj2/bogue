import React, { useEffect, useState } from "react";

import InputWrapper from "../components/InputWrapper";

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

  const [addressFormStates, setAddressFormStates] =
    useState(accountAddressStates);
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
              <InputWrapper
                state={addressFormStates.addressFirstName}
                text="\first name"
              >
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
              </InputWrapper>
            </div>
            <div className="update-address-book__last-name">
              <InputWrapper
                state={addressFormStates.addressLastName}
                text="\last name"
              >
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
              </InputWrapper>
            </div>
          </div>
          <div className="update-address-book__street">
            <InputWrapper
              state={addressFormStates.addressStreet}
              text={
                <>
                  \address line 1
                  <span className="address-line">- street address</span>
                </>
              }
            >
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
            </InputWrapper>
          </div>
          <div className="update-address-book__street-two">
            <InputWrapper
              state={addressFormStates.addressStreetTwo}
              text={
                <>
                  \address line 2
                  <span className="address-line">
                    - apartment / floor / suite / access code
                  </span>
                </>
              }
            >
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
            </InputWrapper>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__city">
              <InputWrapper state={addressFormStates.addressCity} text="\city">
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
              </InputWrapper>
            </div>
            <div className="update-address-book__postal-code">
              <InputWrapper
                state={addressFormStates.addressPostalCode}
                text="\postal code"
              >
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
              </InputWrapper>
            </div>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__province">
              <InputWrapper
                state={addressFormStates.addressProvince}
                text="\province"
              >
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
              </InputWrapper>
            </div>
            <div className="update-address-book__country">
              <InputWrapper
                state={addressFormStates.addressCountry}
                text="\country"
              >
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
              </InputWrapper>
            </div>
          </div>
          <div className="add-address__wrapper">
            <div className="update-address-book__phone">
              <InputWrapper
                state={addressFormStates.addressPhone}
                text="\phone number"
              >
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
              </InputWrapper>
            </div>
            <div className="update-address-book__null">
              <InputWrapper state={null}></InputWrapper>
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
