import React, { useState } from "react";
import ColoredButton from "../ColoredButton";
import infoicon from "../../assets/images/infoicon.png";
import alert from "../../assets/images/alert.svg";
import modalCross from "../../assets/images/modalCross.svg";
import editIcon from "../../assets/images/Vector.png";
import clockIcon from "../../assets/images/clock.svg";
import { Dropdown } from "semantic-ui-react";
import Link from "next/link";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import { Button, Header, Modal } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import * as actions from "../../store/Offerings/actions";
import ModalContainer from "../ModalContainer";

const OfferingsCard = ({
  title,
  cost,
  duration,
  id,
  description,
  numberOfOfferings,
  questions,
}) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const setEditValues = () => {
    dispatch(
      actions.setOfferingDetails({ type: "serviceTitle", value: title })
    );
    dispatch(
      actions.setOfferingDetails({
        type: "serviceDescription",
        value: description,
      })
    );
    dispatch(
      actions.setOfferingDetails({
        type: "serviceDuration",
        value: duration,
      })
    );
    dispatch(actions.setOfferingDetails({ type: "servicePrice", value: cost }));
  };

  const handleEdit = () => {
    let payload = {
      title,
      cost,
      duration,
      id,
      description,
      numberOfOfferings,
      questions: JSON.stringify(questions),
    };

    setEditValues();

    router.push(
      {
        pathname: `/offerings/edit/${id}`,
        query: payload,
      },
      `/offerings/edit/${id}`
    );
  };

  const handleDelete = () => {
    debugger;
    dispatch(actions.deleteOffering({ id }));
    setShowModal(false);
  };

  const router = useRouter();
  const options = [
    {
      key: "Edit",
      text: (
        <div onClick={() => handleEdit()} className="offeringscard__menulink">
          <span className="offeringscard__menuicon">
            <Icon name="edit"></Icon>
          </span>
          Edit
        </div>
      ),
    },
    ...(numberOfOfferings > 1
      ? [
          {
            key: "Delete",
            text: (
              <div
                onClick={() => {
                  setShowModal(true);
                }}
                className="offeringscard__menulink offeringscard__menulink__delete"
              >
                <span className="offeringscard__menuicon">
                  <Icon name="delete"></Icon>
                </span>
                Delete
              </div>
            ),
          },
        ]
      : []),
  ];
  const trigger = (
    <span>
      <img className="infoIcon" src={infoicon?.src} alt="Info icon"></img>
    </span>
  );

  return (
    <>
      <div className="offeringscard">
        <div className="offeringscard__info">
          <div className="offeringscard__info__heading">{title}</div>
          <div className="offeringcta-dropdown">
            <Dropdown
              options={options}
              trigger={trigger}
              direction="left"
              icon={null}
            />
          </div>
        </div>
        <div className="offeringscard__buttoncontainer">
          <div className="offeringscard__buttoncontainer__button">
            <ColoredButton
              color="green"
              text={`${cost == 0 ? " FREE" : `₹ ${cost}`}`}
            />
          </div>
          <div className="offeringscard__buttoncontainer__button">
            <ColoredButton
              color="blue"
              text={`${duration} mins`}
              icon={clockIcon}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal open={open} style={{ zIndex: "999 !important" }}>
          <Modal.Content>
            <div className="modalcontent">
              <div
                className="modalcontent__crossicon"
                onClick={() => setShowModal(false)}
              >
                <img src={modalCross.src} alt="Cross"></img>
              </div>
              <div className="modalcontent__alerticon">
                <img src={alert.src} alt="Alert Icon"></img>
              </div>
              <div className="modalcontent__heading">
                Are you sure you want to delete this offering ?
              </div>
              <div className="modalcontent__text">
                This offering will be deleted and can not be restored later.
              </div>
              <div
                className="modalcontent__delete"
                onClick={() => handleDelete()}
              >
                Yes, Delete
              </div>
              <div
                className="modalcontent__cancel"
                onClick={() => setShowModal(false)}
              >
                No, Cancel
              </div>
            </div>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
};

export default OfferingsCard;
