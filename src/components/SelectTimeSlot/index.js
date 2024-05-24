import React, { useState, useEffect, use } from "react";
import { Checkbox, Item } from "semantic-ui-react";
import { Select, Dropdown } from "semantic-ui-react";
import addicon from "../../assets/images/addicon.png";
import deleteIcon from "../../assets/images/trashIcon.png";
import { TimeSlotOptions } from "@/utils/constants";
// import uuid from 'react-uuid';
import moment from "moment";
import getDay from "@/utils/getDay";

const SelectTimeSlot = ({ options, dropDownOptions, onChange, label }) => {
  const [availabilityOptions, setAvailabiltyOptions] = useState(options);
  const [copySlotChecked, setCopySlotChecked] = useState(false);

  console.log("props received are ---", options);
  const addSlot = (index) => {
    let customoptions = [...availabilityOptions];

    customoptions[index].rules = [
      ...customoptions[index].rules,
      { from: "10:00", to: "10:30" },
    ];
    setAvailabiltyOptions(customoptions);
  };

  const deleteSlot = (index, ruleIndex) => {
    let customoptions = JSON.parse(JSON.stringify(availabilityOptions));
    let newRule = customoptions[index].rules;
    newRule.splice(ruleIndex, 1);
    console.log("DELETED", customoptions);

    setAvailabiltyOptions(customoptions);
  };

  const changeDropdownValue = (index, type, value, ruleIndex) => {
    let customoptions = [...availabilityOptions];
    if (type === "starttime") {
      customoptions[index].rules[ruleIndex].from = value;
      setAvailabiltyOptions(customoptions);
    } else if (type === "endtime") {
      customoptions[index].rules[ruleIndex].to = value;
      setAvailabiltyOptions(customoptions);
    }
  };

  //copy to all

  const copySlots = (object) => {
    let customoptions = [...availabilityOptions];
    let filteredoptions = customoptions.map((item, index) => {
      if (index === 0) {
        return item;
      } else {
        if (item.isActive === true) {
          return {
            ...item,
            rules: JSON.parse(JSON.stringify(object)),
          };
        } else {
          return item;
        }
      }
    });
    console.log("FILTERED OPTIONS ARE", filteredoptions);
    setAvailabiltyOptions(filteredoptions);
  };

  useEffect(() => {
    const payload = availabilityOptions.map(({ dayTitle, ...rest }) => {
      return rest;
    });

    const finalpayload = payload.map((obj) => {
      const rulesarray = obj.rules.map((item) => {
        return {
          from: moment(item.from, ["h:mm"]).format("HH:mm"),
          to: moment(item.to, ["h:mm"]).format("HH:mm"),
        };
      });
      return { ...obj, rules: rulesarray };
    });

    onChange(finalpayload);
  }, [availabilityOptions]);

  // useEffect(() => {
  //   if (!copySlotChecked) {
  //     let customoptions = [...availabilityOptions];
  //     let filteredoptions = customoptions.map((item, index) => {
  //       if (index === 0) {
  //         return item;
  //       } else {

  //         if (item.isActive === true) {
  //           return {
  //             ...item,
  //             rules: [{ from: "10:00", to: "12:30" }],
  //           };
  //         } else {

  //           return item;
  //         }
  //       }
  //     });
  //     setAvailabiltyOptions(filteredoptions);
  //   }
  // }, [copySlotChecked]);
  console.log("indexx availability", availabilityOptions);

  return (
    <>
      <div className="label">{label}</div>
      <div className="multiselect-container">
        {availabilityOptions &&
          availabilityOptions.length > 0 &&
          availabilityOptions.map((item, index) => {
            return (
              <div
                className={
                  !item?.isActive
                    ? `multiselect-container__box`
                    : `multiselect-container__box multiselect-container__box__active`
                }
                onClick={() => {
                  let customoptions = [...availabilityOptions];
                  let val = !item?.isActive;
                  if (val) {
                    customoptions[index] = {
                      ...item,
                      isActive: true,
                    };
                  } else {
                    customoptions[index] = {
                      ...item,
                      id: item?.id,
                      rules: [{ from: "10:00", to: "10:30" }],
                      isActive: false,
                    };
                  }

                  setAvailabiltyOptions(customoptions);
                }}
              >
                <div className="multiselect-container__box__info">
                  <div className="multiselect-container__box__label">
                    {getDay(item?.day)}
                  </div>
                  <div className="multiselect-container__box__checkboxcontainer">
                    <Checkbox checked={item?.isActive} />
                  </div>
                </div>

                <div>
                  <div
                    className={
                      item?.isActive
                        ? "multiselect-container__box__timeslot-container multiselect-container__box__timeslot-container__active"
                        : "multiselect-container__box__timeslot-container"
                    }
                    id="timecontainer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {availabilityOptions[index].rules.length > 0 &&
                      availabilityOptions[index].rules.map(
                        (item, ruleIndex) => {
                          return (
                            <div className="multiselect-container__box__timeslot-container__timeslots">
                              <div
                                style={{ width: "42%", marginRight: "10px" }}
                              >
                                <Select
                                  value={item.from}
                                  placeholder="Start"
                                  style={{ width: "100%" }}
                                  options={dropDownOptions}
                                  onChange={(e, { value }) =>
                                    changeDropdownValue(
                                      index,
                                      "starttime",
                                      value,
                                      ruleIndex
                                    )
                                  }
                                />
                              </div>

                              <div
                                style={{ width: "42%", marginRight: "10px" }}
                              >
                                <Select
                                  value={item.to}
                                  placeholder="End"
                                  style={{ width: "100%" }}
                                  options={dropDownOptions}
                                  onChange={(e, { value }) =>
                                    changeDropdownValue(
                                      index,
                                      "endtime",
                                      value,
                                      ruleIndex
                                    )
                                  }
                                />
                              </div>

                              <div
                                className="multiselect-container__box__timeslot-container__timeslots__ctaicons"
                                id="addSlot"
                              >
                                {availabilityOptions[index].rules.length > 1 ? (
                                  <div className="deleteicon">
                                    <img
                                      src={deleteIcon.src}
                                      id="deleteSlot"
                                      style={{ width: "100%", height: "100%" }}
                                      onClick={() =>
                                        deleteSlot(index, ruleIndex)
                                      }
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          );
                        }
                      )}
                    <div style={{textDecoration: "underline", color:"black", marginBottom: 10}} onClick={() => addSlot(index)}>
                      Add more slots
                    </div>
                    {index === 0 &&
                      availabilityOptions[index].rules.length > 0 && (
                        <Checkbox
                          label="Copy time slot to all selected days."
                          id="copyslot"
                          onChange={(e, data) => {
                            if (data.checked) {
                              copySlots(availabilityOptions[index].rules);
                            }
                          }}
                        />
                      )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default SelectTimeSlot;
