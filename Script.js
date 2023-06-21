const Stack = require('./Stack');
const prompt = require('prompt-sync')();

const backPages = new Stack();
const nextPages = new Stack();
let currentPage = "Starting Page";

    // Helper Functions //

const showCurrentPage = (action) => {
  console.log(action);
  console.log(`current page = ${currentPage}`);
  console.log(`previous page = ${backPages.peek()}`);
  console.log(`next page = ${nextPages.peek()}`);
}

const newPage = (page) => {
  backPages.push(currentPage);
  currentPage = page;

  while (!nextPages.isEmpty()) {
    nextPages.pop();
  }
  showCurrentPage("New:")
}
// above pushes currentPage to the backPage stack, sets new current page, and clears the nextPages stack

const backPage = () => {
  nextPages.push(currentPage);
  currentPage = backPages.pop();
  showCurrentPage("Back: ");
}
// above pushes currentPage to nextPages stack, sets currentPage to the top of the backPages stack, and shows current page

const nextPage = () => {
  backPages.push(currentPage);
  currentPage = nextPages.pop();
  showCurrentPage("Next: ");
}
// pushes currentPage to nextPages stack, sets new currentPage to top of the nextPages stack, and displays current page


    // The following strings are used to prompt the user //

const baseInfo = '\nEnter a url';
const backInfo = 'B|b for back page';
const nextInfo = 'N|n for next page';
const quitInfo = 'Q|q for quit';
const question = 'Where would you like to go today? '

    // User Interface //
    
let finish = false;
let showBack = false;
let showNext = false;

showCurrentPage("Default: ");

while (finish === false) {
  let instructions = baseInfo;
  if (!backPages.isEmpty()) {
    instructions = `${instructions}, ${backInfo}`;
    showBack = true;
  } else {
    showBack = false;
  }
  if (!nextPages.isEmpty()) {
    instructions = `${instructions}, ${nextInfo}`;
    showNext = true;
  } else {
    showNext = false;
  }

  instructions = `${instructions}, ${quitInfo}`;
  console.log(instructions);

  const answer = prompt(question);
  const lowerCaseAnswer = answer.toLowerCase()

  if ((lowerCaseAnswer !== "b") && (lowerCaseAnswer !== "n") && (lowerCaseAnswer !== "q")) {
    newPage(lowerCaseAnswer);
  } else if ((lowerCaseAnswer === "n") && (showNext === true)) {
    nextPage();
  } else if ((lowerCaseAnswer === "b") && (showBack === true)) {
    backPage();
  } else if (lowerCaseAnswer === "n") {
    console.log("cannot go to next page, stack is empty")
  } else if (lowerCaseAnswer === "b") {
    console.log("cannot go to previous page, stack is empty")
  } else if (lowerCaseAnswer === "q") {
    finish: true;
    break;
  }
}