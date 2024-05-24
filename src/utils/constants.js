export const GAUTH = {
  CLIENT_ID:
    process.env.NODE_ENV === "production"
      ? "744738293960-2opm8rknv47q2i115vvo057ju4f2r69v.apps.googleusercontent.com"
      : "713801279282-g676ebjruu3f4v9s4sbu3b9fanpkh11u.apps.googleusercontent.com",
  REDIRECT_URI:
    process.env.NODE_ENV === "production"
      ? "https://meetpro.club/authorization"
      : "http://localhost:8080/authorization",
  SCOPES:
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
};

export const GTM_ID = "G-CP5Q66JWJ5";

export const TimeSlotOptions = {
  Saturday: {
    isEnabled: false,
    slots: [],
  },
  Sunday: {
    isEnabled: false,
    slots: [],
  },
  Monday: {
    isEnabled: false,
    slots: [],
  },
  Tuesday: {
    isEnabled: false,
    slots: [],
  },
  Wednesday: {
    isEnabled: false,
    slots: [],
  },
  Thursday: {
    isEnabled: false,
    slots: [],
  },
  Friday: {
    isEnabled: false,
    slots: [],
  },
};

export const timeSlots = [
  { key: "00:00", value: "00:00", text: "12:00 am" },
  { key: "00:30", value: "00:30", text: "12:30 am" },
  { key: "01:00", value: "01:00", text: "1:00 am" },
  { key: "01:30", value: "01:30", text: "1:30 am" },
  { key: "02:00", value: "02:00", text: "2:00 am" },
  { key: "02:30", value: "02:30", text: "2:30 am" },
  { key: "03:00", value: "03:00", text: "3:00 am" },
  { key: "03:30", value: "03:30", text: "3:30 am" },
  { key: "04:00", value: "04:00", text: "4:00 am" },
  { key: "04:30", value: "04:30", text: "4:30 am" },
  { key: "05:00", value: "05:00", text: "5:00 am" },
  { key: "05:30", value: "05:30", text: "5:30 am" },
  { key: "06:00", value: "06:00", text: "6:00 am" },
  { key: "06:30", value: "06:30", text: "6:30 am" },
  { key: "07:00", value: "07:00", text: "7:00 am" },
  { key: "07:30", value: "07:30", text: "7:30 am" },
  { key: "08:00", value: "08:00", text: "8:00 am" },
  { key: "08:30", value: "08:30", text: "8:30 am" },
  { key: "09:00", value: "09:00", text: "9:00 am" },
  { key: "09:00", value: "09:30", text: "9:30 am" },
  { key: "10", value: "10:00", text: "10:00 am" },
  { key: "10:30", value: "10:30", text: "10:30 am" },
  { key: "11", value: "11:00", text: "11:00 am" },
  { key: "11:30", value: "11:30", text: "11:30 am" },
  { key: "12", value: "12:00", text: "12:00 pm" },
  { key: "12:30", value: "12:30", text: "12:30 pm" },
  { key: "13:00", value: "13:00", text: "1:00 pm" },
  { key: "13:30", value: "13:30", text: "1:30 pm" },
  { key: "14:00", value: "14:00", text: "2:00 pm" },
  { key: "14:30", value: "14:30", text: "2:30 pm" },
  { key: "15:00", value: "15:00", text: "3:00 pm" },
  { key: "15:30", value: "15:30", text: "3:30 pm" },
  { key: "16:00", value: "16:00", text: "4:00 pm" },
  { key: "16:30", value: "16:30", text: "4:30 pm" },
  { key: "17:00", value: "17:00", text: "5:00 pm" },
  { key: "17:30", value: "17:30", text: "5:30 pm" },
  { key: "18:00", value: "18:00", text: "6:00 pm" },
  { key: "18:30", value: "18:30", text: "6:30 pm" },
  { key: "19:00", value: "19:00", text: "7:00 pm" },
  { key: "19:30", value: "19:30", text: "7:30 pm" },
  { key: "20:00", value: "20:00", text: "8:00 pm" },
  { key: "20:30", value: "20:30", text: "8:30 pm" },
  { key: "21:00", value: "21:00", text: "9:00 pm" },
  { key: "21:30", value: "21:30", text: "9:30 pm" },
  { key: "22:00", value: "22:00", text: "10:00 pm" },
  { key: "22:30", value: "22:30", text: "10:30 pm" },
  { key: "23:00", value: "23:00", text: "11:00 pm" },
  { key: "23:30", value: "23:30", text: "11:30 pm" },
];

export const faqOptions = [
  {
    heading: "What is MeetPro?",
    title:
      "MeetPro is a tool that helps you create a personal link through which you can manage all your 1:1 sessions, consultations, interviews, etc and monetize your expertise and time smoothly. You need not worry about scheduling calls, sending reminders and collecting payments - MeetPro is here for you.",
    isOpen: false,
  },
  {
    heading: "Can I create my personal link?",
    title:
      "Yes. If you are a content-creator, expert, leader, consultant, or basically anybody who is open to mentoring can start monetizing their time and expertise with their personal link in just two minutes!",
    isOpen: false,
  },
  {
    heading: "What will be the duration of each session?",
    title:
      "You can set the duration of each session as per your availability. Ideally sessions are of 30 or 60 minutes.",
    isOpen: false,
  },
  {
    heading: "How will I earn money?",
    title:
      "There are millions of learners who are stuck at some point and are awaiting guidance. You can set a price for each session and any learner will be able to book a slot after making the payment.",
    isOpen: false,
  },
  {
    heading: "What should I charge for my sessions?",
    title:
      "It absolutely depends on you. We recommend playing around with the prices to find the perfect price point which your potential customers appreciate!",
    isOpen: false,
  },
];
