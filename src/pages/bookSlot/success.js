import React, { useState, useEffect, useRef } from "react";
import successicon from "../../assets/images/successIcon.png";
import Image from "next/image";
import Notes from "@/components/Notes";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import gMeet from "../../assets/images/gmeet.svg";
import linkedInIcon from "../../assets/images/linkedInIcon.svg";
import Button from "@/components/Button";
import { useRouter } from "next/router";
import { trackEvent } from "../../utils/ganalytics";
import Input from "@/components/Input";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import getUniqueId from "@/utils/getUniqueId";
import * as actions from "../../store/Questions/actions";
import * as analyticsactions from "../../store/Analytics/actions";
import upload from "@/assets/images/upload.svg";
import fileCross from "@/assets/images/fileCross.svg";
import axios from "axios";
import envconfig from "../../../env.config";

const BookSlotSuccess = ({
  successText,
  creatorName,
  orderId,
  creatorQuestions,
  bookingId,
}) => {
  console.log("PROPS ARE", orderId);

  const { isLoading } = useSelector((state) => state?.questionsReducer);
  const [showLoader, setShowLoader] = useState(false);
  const fileRefs = useRef({});

  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setname] = useState();
  const [fileName, setFileName] = useState();
  const [answerId, setAnswerId] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [answer, setAnswer] = useState("");
  const expression = new RegExp(
    "^(http(s)://.)[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$"
  );

  const [questions, setQuestions] = useState(creatorQuestions);

  const handleUploadFileClick = (id) => {
    fileRefs.current[id]?.click(); // Use the specific ref for the given id
    setAnswerId(id);
  };

  const onFileChange = async (event, id) => {
    if (event.target.files && event.target.files[0]) {
      const file = event?.target?.files[0];
      if (file?.size > 100 * 1024 * 1024) {
        toast.error("File size exceeds the limit of 100 MB");
      } else {
        setFileNameHandler(file?.name, id); // Use the provided id
        getSignedUrl(file); // Pass the id to getSignedUrl
        event.target.value = null;
      }
    }
  };

  const getSignedUrl = (file) => {
    console.log("ANS ID", answerId);
    dispatch(actions.setIsLoading(true));
    const baseUrl = envconfig.API_BASE_URL;

    axios({
      method: "POST",
      baseURL: baseUrl,
      url: `/insta-learn/uploadMenteeDocs`,
      data: {
        fileExtension: `${file.type}`,
      },
    })
      .then((response) => {
        response && uploadImage(file, response?.data?.data);
      })
      .catch((error) => {
        dispatch(actions.setIsLoading(false));
        toast.error("Please upload the file again");
      });
  };

  const uploadImage = async (file, responseData) => {
    const { mainUrl, url } = responseData;

    try {
      let response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": `${file?.type}`,
          "access-control-allow-origin": "*",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Methods": "*",
        },
      });
      if (response.status == 200) {
        dispatch(actions.setIsLoading(false));
        console.log("RESPONSE IS", response);

        setAnswerValue(mainUrl, answerId);

        setAnswerId(null);

        toast.success("File uploaded successfully");
      }
    } catch (err) {
      toast.error("Please upload the file again");
      dispatch(actions.setIsLoading(false));
      console.log(err);
    }
  };

  const postAnalyticsData = (id, eventType) => {
    let uid = getUniqueId();
    const data = {
      serviceId: parseInt(id),
      uuid: uid,
      eventType: eventType,
    };

    dispatch(analyticsactions.postAnalytics(data));
  };

  //because creator questions takes time to drill in
  useEffect(() => {
    if (creatorQuestions?.length) {
      setQuestions(creatorQuestions);
    }
  }, [creatorQuestions]);

  useEffect(() => {
    let pageData;
    if (!creatorName) {
      pageData = JSON.parse(sessionStorage.getItem("pageData"));
      setname(pageData?.name);
    }

    trackEvent(`Open_Success_${pageData?.creatorId}`);

    if (typeof window !== undefined) {
      const orderRetryPayload = JSON.parse(
        window.sessionStorage.getItem("orderRetryPayload")
      );
      postAnalyticsData(orderRetryPayload?.serviceId, "OPEN_POSTPAYMENT");
    }
  }, []);

  const setAnswerValue = (value, id) => {
    let questionarray = [...creatorQuestions];
    const index = questionarray.findIndex((obj) => obj?.id === id);
    questionarray[index].answer = value !== "" ? value : null;
    setQuestions(questionarray);
  };

  const setFileNameHandler = (value, id) => {
    let questionarray = [...creatorQuestions];
    const index = questionarray.findIndex((obj) => obj?.id === id);
    questionarray[index].fileName = value !== "" ? value : null;
    setQuestions(questionarray);
  };

  const removeFile = (id) => {
    let questionarray = [...creatorQuestions];
    const index = questionarray.findIndex((obj) => obj?.id === id);
    // Remove the fileName key
    delete questionarray[index]?.answer;
    delete questionarray[index]?.fileName;

    // Update the state with the modified array
    setQuestions(questionarray);
  };

  const isAnswerProvided = (data) => {
    return data?.every(
      (item) =>
        !item?.isMandatory ||
        (item?.isMandatory &&
          item?.answer !== undefined &&
          item?.answer !== null &&
          item?.answer !== "")
    );
  };

  const handleDone = () => {
    // Remove the fileName key from every element in the questions array
    const updatedQuestions = questions.map((item) => {
      // Create a copy of the object to avoid mutating the original
      const updatedItem = { ...item };
      // Remove the fileName key
      delete updatedItem?.fileName;
      return updatedItem;
    });

    let route = JSON.parse(sessionStorage.getItem("pageData"));

    const callBack = () => {
      toast.success("Answers have been submitted successfully");
      router.push(route?.username);
    };

    let bookingId = sessionStorage?.getItem("bookingId");

    dispatch(
      actions?.postAnswers({
        payload: {
          answers: updatedQuestions, // Use the updatedQuestions array
          bookingId: parseInt(bookingId),
          callBack,
        },
      })
    );
  };

  useEffect(() => {
    console.log("QUESTION PAYLOAD IS", questions);

    // Check if answers are provided for all mandatory questions
    if (questions?.length !== 0) {
      setButtonDisabled(!isAnswerProvided(questions));
    } else {
      setButtonDisabled(false);
    }
  }, [questions]);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  return (
    <>
      <div className="bookSlotResultContainer">
        <div className="bookSlotResultContainer__box">
          <div className="bookSlotResultContainer__box__logo">
            <Image
              src={successicon}
              alt="Success Icon"
              style={{ width: "100%", height: "100%" }}
            ></Image>
          </div>
          <div className="bookSlotResultContainer__box__text">
            <div className="bookSlotResultContainer__box__text__heading">
              Congratulations
            </div>
            {orderId && (
              <div className="bookSlotResultContainer__box__text__secondaryheading">
                Order Id: {orderId}
              </div>
            )}
            <div className="bookSlotResultContainer__box__text__secondary">
              Your Session is booked with {creatorName || name} on{" "}
              <span className="bookSlotResultContainer__box__text__secondary__timeStamp">
                {successText}
              </span>
            </div>
          </div>
          <div style={{ marginBottom: "24px" }}>
            <Notes
              icon={gMeet}
              text="Your meeting link will be sent to you on your email. Please accept the invite to get timely reminders."
            />
          </div>
          {creatorQuestions && creatorQuestions?.length !== 0 && (
            <div className="questionsbox" style={{ marginBottom: "24px" }}>
              <div className="questionsbox__headline">
                Your Mentor would like to know you more
              </div>
              <div className="questionsbox__info">
                Please answer the questions so that you have more meaningful
                conversations.
              </div>
            </div>
          )}

          {questions &&
            questions.length > 0 &&
            questions.map((item, index) => {
              if (item?.answerType === "text") {
                return (
                  <Input
                    splitInput={false}
                    textInputLabel={null}
                    label={`
                      <div>
                        ${item?.question}
                        ${
                          !item?.isMandatory
                            ? '<span class="labelSecondary">(<i> Optional </i>)</span>'
                            : ""
                        }
                      </div>
                `}
                    icon={""}
                    value={item?.answer}
                    disabled={false}
                    placeholder={"Enter your answer"}
                    textArea={true}
                    onChange={(value) => setAnswerValue(value, item?.id)}
                    inputType={"textarea"}
                    isQuestion={true}
                  />
                );
              } else if (item?.answerType === "file") {
                return (
                  <div className="uploadFileContainer">
                    <div className="uploadFileContainer_heading">
                      {item?.question}
                      {!item?.isMandatory && (
                        <span class="labelSecondary">
                          (<i> Optional </i>)
                        </span>
                      )}
                    </div>
                    {!item?.answer ? (
                      <div
                        className="uploadFileContainer_buttonContainer"
                        onClick={() => {
                          handleUploadFileClick(item?.id);
                        }}
                      >
                        <div className="uploadIcon">
                          <Image
                            src={upload}
                            alt="Upload"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                        <div className="uploadText">
                          Upload File
                          <input
                            type="file"
                            onChange={(event) => onFileChange(event, item.id)}
                            ref={(ref) => (fileRefs.current[item.id] = ref)} // Assign a ref for the given id
                            hidden
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="fileContainer">
                        <div className="fileContainer_text">
                          {item?.fileName}
                        </div>
                        <div
                          className="fileContainer_crossIcon"
                          onClick={() => removeFile(item?.id)}
                        >
                          <Image
                            src={fileCross}
                            alt="fileCross"
                            style={{ width: "100%", height: "100%" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
      <div className="buttoncontainer buttoncontainer__bookSlot">
        <Button onClick={handleDone} disabled={buttonDisabled}>
          {questions?.length ? <>Submit</> : <>Done</>}
        </Button>
      </div>

      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default BookSlotSuccess;
