import React, { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import backIcon from "@/assets/images/backIcon.png";
import addSocialMedia from "@/assets/images//addSocialIcon.svg";
import Navbar from "@/components/Navbar";
import Sidenav from "@/components/SideNav";
import ServiceQuestion from "@/components/ServiceQuestion";
import {
  saveQuestions,
  setEditQuestionsPayload,
} from "@/store/Questions/actions";
import { editOfferings, getOfferings } from "@/store/Offerings/actions";

const ServiceQuestions = () => {
  const dispatch = useDispatch();
  const serviceQuestionsBoxRef = useRef(null);
  const router = useRouter();

  //SELECTORS
  const offeringData = useSelector((state) => state?.offeringReducer);
  const { serviceQuestions, questionsPayload } = useSelector(
    (state) => state?.questionsReducer
  );

  //STATES
  const [IsDesktopView, setIsDesktopView] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isEditQuestion, setIsEditQuestion] = useState(false);

  const addQuestion = () => {
    let questionarray = [
      ...questions,
      { question: "", answerType: "text", isMandatory: 1 },
    ];
    setQuestions(questionarray);
  };

  const deleteQuestion = (id, arrIndex) => {
    debugger;
    const index = questions?.findIndex((item) => item?.id === id);
    const spliceIndex = index !== -1 && id !== undefined ? index : arrIndex;
    let questionarray = [...questions];
    if (isEditQuestion && id !== undefined) {
      questionarray[spliceIndex].isDeleted = true;
      delete questionarray[spliceIndex].isUpdated;
    } else {
      questionarray.splice(spliceIndex, 1);
    }
    setQuestions(questionarray);
  };

  const changeQuestion = (typeOfValue, value, id, arrIndex) => {
    const index = questions?.findIndex((item) => item?.id === id);
    const editIndex = index !== -1 && id !== undefined ? index : arrIndex;
    let questionarray = [...questions]; // QUESTIONS STATE FOR RENDERING ON UI
    questionarray[editIndex][typeOfValue] = value;
    if (isEditQuestion) {
      questionarray[editIndex].isUpdated = true;
    }
    setQuestions(questionarray);
  };

  const handleGoBack = () => {
    router?.back();
  };

  const handleSaveQuestion = () => {
    dispatch(saveQuestions(questions));

    const callBack = () => {
      toast.success("Questions saved successfully");
      dispatch(getOfferings());
      handleGoBack();
    };

    const payload = {
      id: offeringData?.serviceId,
      questions,
    };

    if (isEditQuestion) {
      dispatch(editOfferings({ offerringData: payload, callBack }));
    } else {
      callBack();
    }
  };

  // page refresh
  useEffect(() => {
    if (offeringData?.services === null) {
      router.push("/onboarding/screens/success");
    }
  }, [offeringData]);

  useEffect(() => {
    if (window?.innerWidth < 768) {
      setIsDesktopView(false);
    } else {
      setIsDesktopView(true);
    }
  }, []);

  const areQuestionsNotEmpty = () => {
    console.log("Questions", questions);

    const isButtonDisabled = questions?.every((item) => {
      if (item.isDeleted) {
        return true; // Skip the check for deleted items
      }

      return item.question?.trim() !== "";
    });
    setButtonDisabled(!isButtonDisabled);
  };

  useEffect(() => {
    areQuestionsNotEmpty();
  }, [questions]);

  useEffect(() => {
    if (router?.query?.edit == "true") {
      setIsEditQuestion(true);
    }
  }, [router]);

  const handleScroll = () => {
    const serviceQuestionsBox = serviceQuestionsBoxRef.current;

    if (serviceQuestionsBox.scrollTop > 0) {
      serviceQuestionsBox.classList.add("scrollActive");
    } else {
      serviceQuestionsBox.classList.remove("scrollActive");
    }
  };

  useEffect(() => {
    //DEEP CLONING THE REDUCER STATE AS UPDATING THE STATE IS ALSO CHANGING REDUCER STATE DUE TO REFERENCE ISSUE
    if (typeof window !== undefined) {
      setQuestions(window.structuredClone(serviceQuestions));
    }
  }, []);

  return (
    <>
      {!IsDesktopView && (
        <Navbar
          logo={backIcon}
          heading={"Service Questions"}
          handleBack={handleGoBack}
        />
      )}
      <Sidenav
        tabSelected={"offerings"}
        IsDesktopView={IsDesktopView}
        heading={"Service Questions"}
        isBackNavigation={true}
      >
        <div className="questionscontainer">
          <div className="questionsbox">
            <div className="questionsbox__headline">
              Something you wanna ask your mentee
            </div>
            <div className="questionsbox__info">
              Enter the questions you want to ask during the time of the booking
              to have more meaningful conversations.
            </div>
          </div>

          <div
            className="servicequestionsbox"
            ref={serviceQuestionsBoxRef}
            onScroll={handleScroll}
          >
            <div className="servicequestionsbox_parentContainer">
              {questions &&
                questions.length > 0 &&
                questions.map((item, index) => {
                  if (!item?.isDeleted)
                    return (
                      <ServiceQuestion
                        dataIndex={index}
                        data={item}
                        handleDeleteQuestion={() =>
                          deleteQuestion(item?.id, index)
                        }
                        handleEditQuestion={(type, value) =>
                          changeQuestion(type, value, item?.id, index)
                        }
                        isEdit={isEditQuestion}
                      />
                    );
                })}
            </div>
          </div>

          <div className="addquestion" onClick={() => addQuestion()}>
            <div className="addquestion__icon">
              <img
                src={addSocialMedia.src}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="addquestion__text">Add Question</div>
          </div>

          <button
            className="questionscontainer_saveBtn"
            onClick={() => handleSaveQuestion()}
            disabled={buttonDisabled}
          >
            Save Question
          </button>
        </div>
      </Sidenav>
    </>
  );
};

export default ServiceQuestions;
