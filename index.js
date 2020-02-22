// Your code here
const createEmployeeRecord = function(person) {
  return {
    firstName: person[0],
    familyName: person[1],
    title: person[2],
    payPerHour: person[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

const createEmployeeRecords = function(peopleArray) {
  return peopleArray.map(person => createEmployeeRecord(person));
}

const createTimeEvent = function(employeeRecord, dateStamp, type) {
  const dateHourSplit = dateStamp.split(" ");
  let date = dateHourSplit[0];
  let hour = parseInt(dateHourSplit[1],10);
  const timeEvent = {
    type: type,
    hour: hour,
    date: date
  };

  if (type == 'TimeIn') {
    employeeRecord.timeInEvents.push(timeEvent);
  } else {
    employeeRecord.timeOutEvents.push(timeEvent);
  };

  return employeeRecord;
}

const createTimeInEvent = function(employeeRecord, dateStamp) {
  return createTimeEvent(employeeRecord, dateStamp, 'TimeIn');
}

const createTimeOutEvent = function(employeeRecord, dateStamp) {
  return createTimeEvent(employeeRecord, dateStamp, 'TimeOut');
}

const hoursWorkedOnDate = function(employeeRecord, date) {
  const timeInEvent = employeeRecord.timeInEvents.find(e => e.date == date);
  const timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date == date);
  let hours = (timeOutEvent.hour - timeInEvent.hour)/100;
  return hours;
}

const wagesEarnedOnDate = function(employeeRecord, date) {
  const hours = hoursWorkedOnDate(employeeRecord, date);
  const wages = hours * employeeRecord.payPerHour;
  return wages;
}

const allWagesFor = function(employeeRecord) {
  const availableDates = employeeRecord.timeInEvents.map(e => e.date);
  const allWages = availableDates.reduce((total, date) => wagesEarnedOnDate(employeeRecord, date) + total, 0);
  return allWages;
}

const findEmployeeByFirstName = function(srcArray, firstName) {
  const employee = srcArray.find(person => person.firstName == firstName);

  if (!employee) {
    return undefined;
  } else {
    return employee;
  }
}

const calculatePayroll = function(employeeRecords) {
  const payroll = employeeRecords.reduce((total, employee) => allWagesFor(employee) + total, 0);
  return payroll;
}
