import React, { useState, useEffect } from "react";
import yesicon from "../../assets/images/yesicon.png";
import alertIcon from "../../assets/images/alert.png";
import { Input, Label, Dropdown } from "semantic-ui-react";
import { useSelector } from "react-redux";
const CommonInput = ({
  type = "text",
  value,
  dropDownValue,
  label,
  isDropDown = false,
  dropDownOptions,
  dropDownValueSelect,
  textInputLabel,
  placeholder,
  icon,
  disabled,
  className,
  inputType = "input",
  isQuestion = true,
  splitInput,
  onChange,
  textArea,
  handleBlur,
  userName,
  maxLength,
  setError,
  error,
  errorMessage,
  ...inputProps
}) => {
  const isNumberInput = type === "number";
  const reg = new RegExp("^[0-9]+$");
  const Component = inputType;
  const CustomIcon = (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "5px",
        transform: "translate(0%, -35%)",
      }}
    >
      {<img width={20} height={20} src={yesicon.src} />}
    </div>
  );
  const options = [
    { key: ".com", text: ".com", value: ".com" },
    { key: ".net", text: ".net", value: ".net" },
    { key: ".org", text: ".org", value: ".org" },
  ];
  return (
    <>
      {label !== "" && (
        <div className={`label ${className}`}>
          {/* Use dangerouslySetInnerHTML to render HTML in the label */}
          <div dangerouslySetInnerHTML={{ __html: label }} />
        </div>
      )}
      {!splitInput && (
        <div
          className={
            !textArea
              ? `inputcontainer`
              : isQuestion
              ? `inputcontainer inputcontainer__textareaquestion`
              : `inputcontainer inputcontainer__textarea`
          }
        >
          <Component
            type={isNumberInput ? "text" : type} // Use "text" type for custom handling
            className="inputcontainer__input"
            disabled={disabled}
            {...inputProps}
            placeholder={placeholder}
            value={value}
            maxLength={maxLength && maxLength}
            onChange={(e) => {
              if (isNumberInput) {
                // Handle the case where the input type is "number"
                const inputValue = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                onChange(inputValue);
              } else {
                onChange(e.target.value);
              }
            }}
          />
        </div>
      )}

      {splitInput && !isDropDown && (
        <div style={{ width: "100%" }}>
          <Input
            disabled={disabled}
            type={type}
            icon={icon ? CustomIcon : null}
            label={{ basic: true, content: textInputLabel }}
            labelPosition="left"
            style={{ width: "100%", marginBottom: "24px" }}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onBlur={handleBlur}
          />
        </div>
      )}

      {splitInput && isDropDown && (
        <div className="inputcontainer__dropdowncontainer">
          <Input
            disabled={disabled}
            type={type}
            value={value}
            label={
              <Dropdown
                value={dropDownValue}
                options={dropDownOptions}
                onChange={(e, { value }) => dropDownValueSelect(value)}
              />
            }
            // style={{ width: "100%", marginBottom: "24px" }}
            className="inputcontainer__dropdowncontainer__input"
            labelPosition="left"
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default CommonInput;
