const handleOptionDropdown = (input, type, setType, dropdown, setDropdown) => {
    if (input === type && dropdown === true) {
        setDropdown(false);
      } else {
        setDropdown(true);
      }
      setType(input);
}

export default handleOptionDropdown;