export const calculateDate = (days) => {
  let daysObj = [
    {
      key: 7,
      value: 7,
    },
    {
      key: 14,
      value: 14,
    },
    {
      key: 30,
      value: 30,
    },
    {
      key: 90,
      value: 90,
    },
  ];

  let dayToSubtract;
  for (let i = 0; i < daysObj.length; i++) {
    if (daysObj[i].key === days) {
      dayToSubtract = daysObj[i].value;
    }
  }

  var today = new Date();
  var priorDate = new Date(
    new Date().setDate(today.getDate() - dayToSubtract)
  );

  var priorDay = String(priorDate.getDate()).padStart(2, "0");
  var priorMonth = String(priorDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var priorYear = priorDate.getFullYear();

  var currentDay = String(today.getDate()).padStart(2, "0");
  var currentMonth = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var currentYear = today.getFullYear();

  let dateObject = {
    startDate: priorYear + "-" + priorMonth + "-" + priorDay,
    endDate: currentYear + "-" + currentMonth + "-" + currentDay,
  };

  return dateObject;
};
