import React, { useState, useEffect, use } from "react";
import { Checkbox, Item } from "semantic-ui-react";

const MultiSelect = ({ options, onChange, label }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const changeStyling = (id, value) => {
    if (typeof window !== "undefined") {
      const option = window.document.getElementsByClassName(
        "multiselect-container__box"
      );
      const selectedId = id;
      if (value) {
        option[selectedId].classList.add("multiselect-container__box__active");
      } else {
        option[selectedId].classList.remove(
          "multiselect-container__box__active"
        );
      }
    }
  };

  const handleChange = (item, value) => {
    if (value) {
      setSelectedOptions([...selectedOptions, item]);
      onChange(selectedOptions);
    } else {
      const arr = selectedOptions.filter((val) => val !== item?.title);
      setSelectedOptions(arr);
    }
  };

  useEffect(() => {
    onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <>
      <div className="label">{label}</div>
      <div className="multiselect-container">
        {options &&
          options.length > 0 &&
          options.map((item, index) => {
            console.log("dsnfkjndslkf", item);
            return (
              <label for={`check-${index}`}>
                <div className="multiselect-container__box">
                  <div className="multiselect-container__box__info">
                    <div className="multiselect-container__box__label">
                      {item[0]?.title}
                    </div>
                    <div className="multiselect-container__box__checkboxcontainer">
                      <Checkbox
                        onChange={(e, data) => {
                          handleChange(item[0], data.checked);
                          changeStyling(index, data.checked);
                        }}
                        id={`check-${index}`}
                      />
                    </div>
                  </div>
                </div>
              </label>
            );
          })}
      </div>
    </>
  );
};

export default MultiSelect;
