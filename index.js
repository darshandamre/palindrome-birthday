const reverseStr = (str) => {
  let charList = str.split("");
  let reversedList = charList.reverse();
  return reversedList.join("");
};

const isPalindrome = (str) => {
  let reversedStr = reverseStr(str);
  return str === reversedStr;
};

const dateToString = (date) => {
  let newDate = {
    day: date.day.toString(),
    month: date.month.toString(),
    year: date.year.toString(),
  };
  if (date.day < 10) {
    newDate.day = `0${date.day}`;
  }
  if (date.month < 10) {
    newDate.month = `0${date.month}`;
  }
  return newDate;
};

const getDateInAllFormats = (date) => {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yymmdd = date.year.slice(-2) + date.month + date.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const checkPalindromeForAllDateFormats = (date) => {
  let dateStr = dateToString(date);
  let listOfPalindromes = getDateInAllFormats(dateStr);

  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      return true;
    }
  }
  return false;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

const getNextDate = (date) => {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getNextPalindrome = (date) => {
  let nextDate = getNextDate(date);
  let counter = 0;
  while (true) {
    counter++;
    let result = checkPalindromeForAllDateFormats(nextDate);

    if (result) {
      return [counter, nextDate];
    }

    nextDate = getNextDate(nextDate);
  }
};

const getPreviousDate = (date) => {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      year--;
    }

    if (month === 2 && isLeapYear(year)) {
      day = 29;
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

const getPreviousPalindrome = (date) => {
  let previousDate = getPreviousDate(date);
  let counter = 0;
  while (true) {
    counter++;
    let result = checkPalindromeForAllDateFormats(previousDate);

    if (result) {
      return [counter, previousDate];
    }

    previousDate = getPreviousDate(previousDate);
  }
};

const getNearestPalindrome = (date) => {
  let nextPalindrome = getNextPalindrome(date);
  let previousPalindrome = getPreviousPalindrome(date);

  return nextPalindrome[0] < previousPalindrome[0]
    ? nextPalindrome
    : previousPalindrome;
};

const inputDate = document.querySelector("#input-date");
const checkBtn = document.querySelector(".btn-check");
const output = document.querySelector(".output");

checkBtn.addEventListener("click", () => {
  let dateStr = inputDate.value;
  let date = {
    day: 0,
    month: 0,
    year: 0,
  };
  if (dateStr !== "") {
    dateStrList = dateStr.split("-");
    date.year = Number(dateStrList[0]);
    date.month = Number(dateStrList[1]);
    date.day = Number(dateStrList[2]);
  } else {
    return (output.innerHTML = "Enter your Birth Date.");
  }

  let dateIsPalindrome = checkPalindromeForAllDateFormats(date);

  if (dateIsPalindrome) {
    output.innerHTML = "Yayy! Your birthday is a palindrome.";
  } else {
    let [count, { day, month, year }] = getNearestPalindrome(date);
    output.innerHTML = `The nearest palindrome date is ${day}-${month}-${year}, you missed by ${count} days.`;
  }
});
