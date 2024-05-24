import React, { useState, useEffect, useRef } from "react";

import Navbar from "@/components/Navbar";
import Notes from "@/components/Notes";
import Input from "@/components/Input";
import Button from "@/components/Button";
import ProfileImage from "@/components/ProfileImage";

import backIcon from "../../../assets/images/backIcon.png";
import whatsappIcon from "../../../assets/images/Whatsapplogo.png";
import twitterIcon from "../../../assets/images/twitterIcon.svg";
import instaIcon from "../../../assets/images/instaIcon.svg";
import linkedInIcon from "../../../assets/images/linkedInIcon.svg";
import mediumIcon from "../../../assets/images/mediumIcon.svg";
import webIcon from "../../../assets/images/webIcon.svg";
import addSocialMedia from "../../../assets/images/addSocialIcon.svg";
import deleteSocialIcon from "../../../assets/images/deleteSocialIcon.svg";
import profileImageTest from "../../../assets/images/profileImageTest.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/Onboarding/actions";
import { useRouter } from "next/router";
import Backdrop from "@/components/Backdrop";
import { Loader } from "semantic-ui-react";
import getUserToken from "@/utils/getUserToken";
import axios from "axios";
import toast from "react-hot-toast";
import envconfig from "../../../../env.config";
import getBaseUrl from "@/utils/getBaseUrl";

const EditProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state?.onboardingReducer?.user);
  const profileExists = useSelector(
    (state) => state?.onboardingReducer?.profileExists
  );
  const isLoading = useSelector((state) => state.onboardingReducer.isLoading);
  const username = useSelector(
    (state) => state?.onboardingReducer?.user?.username
  );
  const [showLoader, setShowLoader] = useState(false);
  const [image, setImage] = useState();
  const [userDetails, setuserDetails] = useState(user);
  const [imageUrl, setImageUrl] = useState(
    user?.imageUrl ? user?.imageUrl : user?.googleUrl
  );

  const [url, setUrl] = useState();
  const [mainUrl, setMainUrl] = useState();
  const [isDisabled, setisDisabled] = useState(true);

  const [socialLinks, setSocialLinks] = useState(
    user
      ? [...user?.socialLinks]
      : [
          {
            type: "twitter",
            url: "",
          },
        ]
  );
  const socialIconOptions = [
    {
      key: "twitter",
      text: "",
      value: "twitter",
      image: {
        src: twitterIcon.src,
      },
    },
    {
      key: "instagram",
      text: "",
      value: "instagram",
      image: {
        src: instaIcon.src,
      },
    },
    {
      key: "linkedIn",
      text: "",
      value: "linkedIn",
      image: {
        src: linkedInIcon.src,
      },
    },
    {
      key: "medium",
      text: "",
      value: "medium",
      image: {
        src: mediumIcon.src,
      },
    },
    {
      key: "website",
      text: "",
      value: "website",
      image: {
        src: webIcon.src,
      },
    },
  ];

  useEffect(() => {
    if (userDetails?.name?.length) {
      setisDisabled(false);
    } else {
      setisDisabled(true);
    }
  }, [userDetails?.name, userDetails?.mobile]);

  const handleSubmitProfile = () => {
    const callBack = () => router.push("/onboarding/screens/success");

    let payload = {
      id: userDetails?.id,
      name: userDetails?.name,
      mobile: userDetails?.mobile || "",
      about: userDetails?.about,
      socialLinks: socialLinks,
      googleUrl: imageUrl,
      imageUrl: imageUrl,
    };

    console.log("PAYLOAD IS", payload);

    if (userDetails?.about) {
      dispatch(actions.updateUserDetails({ payload, callBack }));
    } else {
      toast.error("Please enter a description");
    }
  };

  const addSocialMediaLink = () => {
    setSocialLinks([
      ...socialLinks,
      {
        type: "twitter",
        url: "",
      },
    ]);
  };

  const deleteSocialMediaLink = (index) => {
    let customSocialLinks = JSON.parse(JSON.stringify(socialLinks));
    customSocialLinks.splice(index, 1);
    console.log("UPDATED SOCIAL LINKS ARE", customSocialLinks);
    setSocialLinks(customSocialLinks);
  };

  const handleSocialMediaLinkChange = (value, type, index) => {
    let medialinks = [...socialLinks];
    if (type === "input") {
      medialinks[index].url = value;
    } else if (type === "dropdown") {
      medialinks[index].type = value;
    }

    setSocialLinks(medialinks);
  };

  const getSocialMediaIconPlaceHolder = (type) => {
    switch (type) {
      case "twitter":
        return "https://twitter.com/...";
      case "instagram":
        return "https://instagram.com/...";
      case "linkedIn":
        return "https://linkedin.com/...";
      case "medium":
        return "https://medium.com/...";
      case "website":
        return "Enter your website link...";
      default:
        return "https://twitter.com/...";
    }
  };

  const onBackClick = () => router.push("/onboarding/screens/success");

  const fetchUserDetails = () => {
    dispatch(actions?.setIsLoading(true));
    dispatch(actions.getUserDetails());
  };

  const fileRef = useRef();

  const onFileChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      console.log("image file uploaded", event.target.files[0]);
      setImage(event.target.files[0]);
      getSignedUrl(event?.target?.files[0]);
    }
  };

  const uploadImage = async (file, responseData) => {
    const { mainUrl, url } = responseData;
    try {
      let response = await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": `${file?.type}`,
        },
      });
      if (response.status == 200) {
        setImageUrl(mainUrl);
        dispatch(actions.setIsLoading(false));
        toast.success("Profile Image uploaded successfully");
      }
    } catch (err) {
      toast.error("Please upload the image again");
      console.log(err);
    }
  };

  const getSignedUrl = (file) => {
    dispatch(actions.setIsLoading(true));

    const baseUrl = envconfig.API_BASE_URL;

    axios({
      method: "POST",
      baseURL: baseUrl,
      url: `/insta-learn/uploadImage`,
      data: {
        fileExtension: `${file.type}`,
      },
      headers: {
        "x-access-token": getUserToken(),
      },
    })
      .then((response) => {
        response && uploadImage(file, response.data.data);
      })
      .catch((error) => {
        dispatch(actions.setIsLoading(false));
        toast.error("Please upload the image again");
      });
  };

  useEffect(() => {
    setuserDetails(user);
    setImageUrl(user?.imageUrl ? user?.imageUrl : user?.googleUrl);
    console.log("USER ** ", user);
  }, [user]);

  useEffect(() => {
    if (!username) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [isLoading]);

  return (
    <>
      <Navbar
        logo={backIcon}
        heading={"Edit Profile"}
        className={"profileNav"}
        handleBack={onBackClick}
      />

      <div className="editprofile_container">
        <div className="editprofile_detailscontainer">
          {userDetails && (
            <div className="profileImage">
              <ProfileImage image={{ src: imageUrl }} />
              <div
                className="profileImage_textcontainer"
                onClick={() => {
                  fileRef.current.click();
                }}
              >
                <div className="profileImage_textcontainer_text">
                  Change Image
                </div>
                <input
                  accept="image/*"
                  type="file"
                  onChange={onFileChange}
                  ref={fileRef}
                  hidden
                />
              </div>
            </div>
          )}

          <Input
            label={"Your Name"}
            icon={""}
            disabled={false}
            placeholder={"Eg. Swapnil Pande"}
            value={userDetails?.name}
            onChange={(value) => {
              setuserDetails((prev) => ({ ...prev, name: value }));
            }}
            className={"editprofile_name"}
          />

          <Input
            label={"Description"}
            icon={""}
            disabled={false}
            value={userDetails?.about && userDetails?.about}
            placeholder={"Add Description"}
            onChange={(value) => {
              setuserDetails((prev) => ({ ...prev, about: value }));
            }}
            inputType={"textarea"}
            textArea={true}
            isQuestion={false}
            className={"editprofile_desc"}
          />

          <div className="editprofile_borders"></div>

          <Input
            label={"Your WhatsApp Number"}
            icon={""}
            disabled={false}
            value={userDetails?.mobile}
            placeholder={"Eg. 766xxxxxxx"}
            onChange={(value) => {
              if (value.length > 10) {
                return false;
              } else {
                setuserDetails((prev) => ({ ...prev, mobile: value }));
              }
            }}
            className={"editprofile_wtnumber"}
          />

          <Notes
            className={"editprofile_notes"}
            text={
              "To get timely updates and reminders regarding your slot bookings via WhatsApp, enter you number here"
            }
            icon={whatsappIcon}
          />
          <div
            className="editprofile_borders"
            style={{ marginTop: "24px" }}
          ></div>

          <div className="label">Social Media Links</div>

          {socialLinks &&
            socialLinks.map((item, index) => {
              return (
                <>
                  <div className="editprofile__socialmediacontainer">
                    <div className="editprofile__socialmediacontainer__input">
                      <Input
                        // label={index === 0 ? "Social Media Links" : ""}
                        splitInput={true}
                        isDropDown={true}
                        icon={""}
                        disabled={false}
                        placeholder={getSocialMediaIconPlaceHolder(item?.type)}
                        value={item?.url}
                        onChange={(value) =>
                          handleSocialMediaLinkChange(value, "input", index)
                        }
                        className={"editprofile_wtnumber"}
                        dropDownOptions={socialIconOptions}
                        dropDownValue={item?.type}
                        dropDownValueSelect={(value) =>
                          handleSocialMediaLinkChange(value, "dropdown", index)
                        }
                      />
                    </div>
                    <div
                      className="editprofile__socialmediacontainer__delete"
                      onClick={() => deleteSocialMediaLink(index)}
                    >
                      <img
                        src={deleteSocialIcon.src}
                        alt="Delete social icon"
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </div>
                  </div>
                </>
              );
            })}

          {socialLinks && socialLinks.length < 4 && (
            <div className="editprofile_addsocialmedia">
              <div
                className="editprofile_addsocialmedia__icon"
                onClick={() => addSocialMediaLink()}
              >
                <img
                  src={addSocialMedia.src}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div
                className="editprofile_addsocialmedia__text"
                onClick={() => addSocialMediaLink()}
              >
                Add Social media Link
              </div>
            </div>
          )}

          <p className="editprofile_bottomtext">
            Enhance your profile's credibility and make it more complete by
            sharing your social media links.
          </p>
        </div>

        <div className="buttoncontainer buttoncontainer__editprofile">
          <Button
            onClick={() => {
              handleSubmitProfile();
            }}
            disabled={isDisabled}
            className="buttoncontainer__button buttoncontainer__button__editprofile"
          >
            Save Changes
          </Button>
        </div>
      </div>
      {showLoader && (
        <Backdrop>
          <Loader active size="large"></Loader>
        </Backdrop>
      )}
    </>
  );
};

export default EditProfile;
