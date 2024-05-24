import React from "react";
import { Dropdown, Checkbox } from "semantic-ui-react";
import Input from "@/components/Input";
import textquestionIcon from "@/assets/images/textquestionIcon.svg";
import fileuploadIcon from "@/assets/images/fileuploadIcon.svg";
import deleteIcon from "@/assets/images/trashIcon.png";

const ServiceQuestion = ({
  dataIndex,
  data,
  handleDeleteQuestion,
  handleEditQuestion,
  isEdit = false,
}) => {
  const questionOptions = [
    {
      key: 0,
      text: "Short Answer",
      value: "text",
      image: { avatar: true, src: textquestionIcon.src },
    },
    {
      key: 1,
      text: "File Upload",
      value: "file",
      image: { avatar: true, src: fileuploadIcon.src },
    },
  ];
  return (
    <div className="serviceQuestionContainer">
      <div className="headingContainer">
        <div className="headingContainer_text">Question Type</div>
        <div className="headingContainer_serviceDropdown">
          <Dropdown
            selection
            className="customDropdownStyle"
            options={questionOptions}
            onChange={(e, { value }) => {
              handleEditQuestion("answerType", value);
            }}
            style={{ color: "#7D8592", width: "100%" }}
            value={data?.answerType}
          />
        </div>
      </div>
      <div className="questionInputContainer">
        <Input
          value={data?.question}
          icon={""}
          disabled={false}
          placeholder={"Enter your question"}
          onChange={(value) => handleEditQuestion("question", value)}
          inputType={"textarea"}
          textArea={true}
          isQuestion={true}
        />
      </div>
      <div className="bottomContainer">
        <div className="bottomContainer_checkboxSection">
          <div>
            <Checkbox
              checked={!data?.isMandatory}
              onChange={(e, data) => {
                handleEditQuestion("isMandatory", Number(!data.checked));
              }}
            />
          </div>
          <div className="bottomContainer_checkboxSection_text">
            Mark Optional
          </div>
        </div>
        {(isEdit || dataIndex !== 0) && (
          <div
            className="bottomContainer_deleteSection"
            onClick={() => handleDeleteQuestion()}
          >
            <img
              src={deleteIcon.src}
              id="deleteSlot"
              style={{
                width: "20px",
                height: "20px",
                display: "flex",
                alignSelf: "center",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceQuestion;
