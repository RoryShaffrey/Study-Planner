//Loading functions
function taskStart() {
    setLocalStorage()
    document.getElementById("timetable").innerHTML = localStorage.getItem("taskRows");
    if (localStorage.getItem("theme") == "themeA") {}
    else{
        localStorage.setItem("theme", "themeA")
        changeTheme()
    };

}
function setStart() {
    setLocalStorage()
    document.getElementById("setTable").innerHTML = localStorage.getItem("setRows")
    //colour theme fixes
    if (localStorage.getItem("theme") == "themeA") {
        var redLinks = document.querySelectorAll("a.text2");
        for (var i = 0; i < redLinks.length; i++) {
          redLinks[i].classList.remove("text2");
        }
      }
    else{
        //change the colour of the body
        var element = document.body;
        element.classList.toggle("background2");
        //change the colour of the table
        var tables = document.getElementsByTagName("table");
        for (var i = 0; i < tables.length; i++) {
        tables[i].classList.toggle("background2"); }
        //change the colour of the buttons
        var buttons = document.getElementsByClassName("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.toggle("theme2");}
        var hyperlinks = document.getElementsByTagName("a");
        for (var i = 0; i < hyperlinks.length; i++) {
            hyperlinks[i].classList.toggle("text2");}
        var blueLinks = document.querySelectorAll("a:not([text2])")
        for (var i = 0; i < blueLinks.length; i++) {
            var link = blueLinks[i];
            // Add the "text2" class to all blue links
            link.classList.add("text2");}
        }
}
function cardStart() {
    title = localStorage.getItem("setCurrent")
    console.log(title.length)
    if (title.length < 10) {}
    else {title = title.slice(0,10) + "..."}
    document.getElementById("title").innerHTML = title;
    document.getElementById("leftButton").setAttribute("onclick", 'inputFlashcard("' + localStorage.getItem("setCurrent") + '")');
    
    setLocalStorage()

    if (document.getElementById("cardcount").innerHTML.slice(2,3) < 2) {}
    else {var left_arrow = document.getElementById("leftArrow")
        left_arrow.src = "blue_left_arrow.png"
        left_arrow.setAttribute("onclick", "previousCard()")}

        if (localStorage.getItem("theme") == "themeA") {}
        else{
            //change the colour of the body
            var element = document.body;
            element.classList.toggle("background2");
            //change the colour of the table
            var tables = document.getElementsByTagName("table");
            for (var i = 0; i < tables.length; i++) {
            tables[i].classList.toggle("background2"); }
            //change the colour of the buttons
            var buttons = document.getElementsByClassName("button");
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].classList.toggle("theme2");}
            left_arrow.src = "red_left_arrow.png"
            }

    // Check if there are saved flashcards and load them
    if (localStorage.getItem("setCurrent")) {
        let flashcardSet = localStorage.getItem("setCurrent");
        let flashcards = JSON.parse(localStorage.getItem(flashcardSet));
        if (flashcards && flashcards.length > 0) {
        for (let i = 0; i < flashcards.length; i++) {
            let {question, answer} = flashcards[i];
            showCard(question, answer);
        }
        }
        let flashcardData = JSON.parse(localStorage.getItem(flashcardSet) ?? "[]");
        if (!flashcardData.length || flashcardData.length < 2) {
          left_arrow.src = "grey_left_arrow.png";
          left_arrow.removeAttribute("onclick")}
        var newCardCount = flashcardData.length + "/" + flashcardData.length;
        document.getElementById("cardcount").innerHTML = newCardCount;
        document.getElementById("delete").setAttribute("onclick", 'deleteCard("' + flashcardSet + '")');
    }
}

//Necessary functions
function setLocalStorage() {
    if (localStorage.getItem("theme")==null) {
        localStorage.setItem("theme", "themeA")}
    else{}
    if(localStorage.getItem("setRows") == null) {
        localStorage.setItem("setRows", '<table class="sidetable" align="center" border="1" id="setTable"> <!--Table for the sets--><tr><th width="160"><p title="Hover the title to read it in full">Flashcard Set:</p></th><th width="215"><p title="Hover the description to read it in full">Description:</p></th><th width="60"></th></tr></tbody></table>')}
    else{}
    if(localStorage.getItem("taskRows") == null) {
        let apostrophe = "'";
        localStorage.setItem("taskRows", '<table class="sidetable" align="center" border="1" id="timetable"> <!--Table for the tasks--><tbody><tr><th width="50%"><p title="Hover a task'+apostrophe+'s name to see its description">Task Name:</p></th><th width="200"><p title="Hover a task'+apostrophe+'s due date to see when it was set">Due Date:</p></th><th width="75"></th></tr></tbody></table>')}
    else{}
    if(localStorage.getItem("setTable") == null) {localStorage.setItem("setTable", '<table id="maintable" border=1 width=50%><tr height=2><th width=50%  align=center><a href="index.html" class="mainlink">Homework Page</a></th><th>Consolidation Menu</th></tr><!--Main table--><td width=600 colspan=2> <!--Main row--><p class="title"><button id="leftButton" class="button" onclick="inputDataset()">Add Set</button>Consolidation Menu<button id="rightButton" class="button" onclick="changeTheme()">Change Theme</button></p><table class="sidetable" align=center border=1 id="setTable"> <!--Table for the sets--><tr><th width=160><p title="Hover the title to read it in full">Flashcard Set:</p></th><th width=215><p title="Hover the description to read it in full">Description:</p></th><th width=60></th></tr></table><br></td></tr></table>')}
    else{}
}
function changeTheme() {
    //change the colour of the body
    var element = document.body;
    element.classList.toggle("background2");
    //change the colour of the table
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
    tables[i].classList.toggle("background2"); }
    //change the colour of the buttons
    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.toggle("theme2");}
    //change the colour of links
    var hyperlinks = document.getElementsByTagName("a");
    for (var i = 0; i < hyperlinks.length; i++) {
        hyperlinks[i].classList.toggle("text2");}
    //change the localStorage value
    if (localStorage.getItem("theme") == "themeA") {
        localStorage.setItem("theme", "themeB");
    }
    else{
        localStorage.setItem("theme", "themeA");
    }
}

//Task functions
function inputTask() {
    var today = new Date();
    let dd = today.getDate()+1;
    let mm = today.getMonth()+1; 
    let yyyy = today.getYear()-100;
    if(dd==31 && (mm == 4 || 6 || 9 || 11)) {dd = dd-30; mm = mm + 1} //check 31 or 30 days in month
    else{}
    if (dd == 32) {dd = dd-31; mm = mm + 1} //check 31 days in month
    else{}
    if (mm == 13) {mm = mm-12; yyyy = yyyy + 1} //check 12 months in year
    else{}
    if (dd < 10) {dd = '0' + dd} //add 0 to single digit dates
    else{}
    if (mm < 10) {mm = '0' + mm} //add 0 to single digit months
    else{}
    
    let dueDate = prompt("Please enter the due date",dd + '/' + mm + '/' + yyyy);
    let isValidDate = /^(([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9]|0[1-9]|1[0-2])\/([0-9][0-9]|[0-9][0-9][0-9][0-9]))$/;
    if (isValidDate.test(dueDate) == true) {
        let taskCount = localStorage.getItem("taskCount")
        if (!taskCount) {var firstTask = true; taskCount=0}
        else{}
        taskCount ++
        localStorage.setItem("taskCount", taskCount.toString())
        let taskName = prompt("Please enter the task's name");
        if (taskName !== "" && taskName !== null) {
          let description = prompt("Please enter a description of the task (optional)")
          if (description !== "" && description !== null) {
            dd = dd-1
            let dateSet = dd + '/' + mm + '/' + yyyy
            //Create a new row
            var row = document.createElement("tr");

            //Create a table cell to add the task name
            var taskAdd = document.createElement("td");
            if (description == "") {taskAdd.innerHTML = taskName}
            else{taskAdd.innerHTML = '<p title="' + description + '">' + taskName + '</p>'};
            row.appendChild(taskAdd);
        
            //Create a table cell to add the due date
            var dateAdd = document.createElement("td");
            dateAdd.innerHTML = '<p title="Set ' + dateSet + '">' + dueDate + '</p>';
            row.appendChild(dateAdd);
                
            //Create a button to delete the row
            var deleteTask = document.createElement("td");
            var deleteButton = document.createElement("button");
            deleteButton.setAttribute("onclick", "deleteTask()");
            deleteButton.setAttribute("id", "button")
            deleteButton.innerHTML = "Clear Task";
            deleteTask.appendChild(deleteButton);
            row.appendChild(deleteTask);
        
            // Get the table element and add the new row
            let table = document.getElementById("timetable");
            table.appendChild(row);
            localStorage.setItem("taskRows", table.innerHTML)
            //only show a tip on how to use the website if it is the user(device's) first time inputting a row
            if (firstTask == true) {alert("Hover a task's name to see its description, Hover a task's due date to see when it was set")
                firstTask = false}
            else {}
    }}}
    else if (dueDate == "" || null) {}
    else {alert("Invalid Date")}
}
function deleteTask() {
  let response = confirm("Are you sure you want to delete this task?");
  if (response == true) {
  // make the button delete the row it was clicked on
  var button = event.target;
  var row = button.parentNode.parentNode;
  row.parentNode.removeChild(row);
  localStorage.setItem("taskRows", document.getElementById("timetable").innerHTML)
  let taskCount = localStorage.getItem("taskCount")
  taskCount --
  localStorage.setItem("taskCount", taskCount)
  }
  else {}
}

//Set functions
function inputDataset() {
    let setTitle = prompt("Write a title of the dataset")
    if (setTitle != "" || null) {
        let set_storage = setTitle;
        if (localStorage.getItem(set_storage) == null) {
            let setDescription = prompt("Write a short description of the dataset: ")
            let setCount = localStorage.getItem('setCount');
            if (!setCount) {var firstSet = true; setCount=0}
            else {}
            setCount++;
            localStorage.setItem("setCount", setCount.toString());

            //Create a new row
            var row = document.createElement("tr");
            
            //Create a table cell to add the set name
            var setAdd = document.createElement("td");
            let parameter = "'" + setTitle + "'";
            if (setTitle.length < 9) {if (localStorage.getItem("theme") == "themeA") {setAdd.innerHTML = '<a onclick="flashcards('+parameter+')"><p title="' + setTitle + '">' + setTitle + '</p></a>'
                                    } else {setAdd.innerHTML = '<a onclick="flashcards('+parameter+')" class="text2"><p title="' + setTitle + '">' + setTitle + '</p></a>'}}
                else {if (localStorage.getItem("theme") == "themeA") setAdd.innerHTML = '<a onclick="flashcards('+parameter+')"><p title="' + setTitle + '">' + setTitle.slice(0,8) + '...</p></a>'
                        else{setAdd.innerHTML = '<a onclick="flashcards('+parameter+')" class="text2"><p title="' + setTitle + '">' + setTitle.slice(0,8) + '...</p></a>'}}
            row.appendChild(setAdd);

            //Create a table cell to add the description
            var descriptAdd = document.createElement("td");
            if (setDescription.length < 14) {descriptAdd.innerHTML = '<p title="' + setDescription + '">' + setDescription + '</p>'}
            else{descriptAdd.innerHTML = '<p title="' + setDescription + '">' + setDescription.slice(0,13) + '...</p>'}
            row.appendChild(descriptAdd);

            //Create a table cell to add the delete button
            var deleteSet = document.createElement("td");
            var deleteButton = document.createElement("button");
            let parameter2 = "'" + set_storage + "'";
            deleteButton.setAttribute("onclick", "deleteSet("+parameter2+")");
            deleteButton.setAttribute("id", "button")
            deleteButton.innerHTML = "Delete Set";
            deleteSet.appendChild(deleteButton);
            row.appendChild(deleteSet);

            // Get the table element and add the new row (and fix colours)
            var setTable = document.getElementById("setTable");
            if (localStorage.getItem("theme") == "themeA") {}
            else{setAdd.classList.toggle("text2");}
            setTable.appendChild(row); 
            localStorage.setItem("setRows", setTable.innerHTML)
            //create a new storage item for the set
            localStorage.setItem(set_storage, "[]")
            //only show a tip on how to use the website if it is the user(device's) first time inputting a row
            if (firstSet == true) {alert("Hover the title to read it in full, Hover the description to read it in full")
            firstSet = false}
            else {}
    }   else{alert("This title is currently in use, please choose a different one")}
}
    else {}
}
function deleteSet(set_title) {
    let response = confirm("Are you sure you want to delete this set?");
    if (response == true) {
    // make the button delete the row it was clicked on
    var button = event.target;
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    localStorage.setItem("setRows", document.getElementById("setTable").innerHTML)
    let setCount = localStorage.getItem("setCount")
    setCount --
    localStorage.setItem("setCount", setCount)
    localStorage.removeItem(set_title)
}
    else {
    }
}

//Flashcard functions
function flashcards(title) {
    localStorage.setItem("setCurrent", title);
    window.location.href = "Flashcard.html";
}
function inputFlashcard(title) {
    let question = prompt("What is the front side of the flashcard? (Question)");
    // if there is a question and the user didn't press cancel
    if (question !== "" && question !== null) {
      let answer = prompt("What is the back side of the flashcard? (Answer)");
      // if there is an answer and the user didn't press cancel
      if (answer !== "" && answer !== null) {
        if(answer !== question) {
        // Save flashcard to JSON
        let flashcardData = JSON.parse(localStorage.getItem(title) ?? "[]");

        //colour the arrows
        var theme = localStorage.getItem("theme");
        var colour = theme === "themeA" ? "blue" : "red";
        if (!flashcardData.length) {
          alert("Click on a card to flip it to the answer side");
          var right_arrow = document.getElementById("rightArrow");
          right_arrow.src = "grey_right_arrow.png";
          right_arrow.removeAttribute("onclick");
          var left_arrow = document.getElementById("leftArrow");
          left_arrow.src = "grey_left_arrow.png";
          left_arrow.removeAttribute("onclick");
        } else {
          var left_arrow = document.getElementById("leftArrow");
          left_arrow.src = colour + "_left_arrow.png";
          left_arrow.setAttribute("onclick", "previousCard()");
        }

        flashcardData.push({ question, answer });
        localStorage.setItem(title, JSON.stringify(flashcardData));

        var newCardCount = flashcardData.length + "/" + flashcardData.length;
        document.getElementById("cardcount").innerHTML = newCardCount;

        showCard(question, answer);
        }
        else{alert("The answer cannot be the same as the question")}
      }
    }
}
function showCard(question, answer) {
    var base_div = document.getElementById("container")
    base_div.setAttribute("onclick", "flipCard('" + question + "','" + answer + "')")
    
    var card_side = document.getElementById("cardside")
    card_side.innerHTML = "question" 
    
    var questionSide = document.getElementById("questionSide") ?? document.createElement("div")
    questionSide.setAttribute("id", "questionSide")
    questionSide.innerHTML = question
    questionSide.style.color = "black"
    base_div.appendChild(questionSide) 
}  
function flipCard(question, answer) {
  if (question !== answer) {
    var answerSide = document.getElementById("questionSide")
    var card_side = document.getElementById("cardside")
    if (answerSide.innerHTML == question) {answerSide.innerHTML = answer; answerSide.style.color = "red"; card_side.innerHTML = "answer"}
    else {answerSide.innerHTML = question; answerSide.style.color = "black"; card_side.innerHTML = "question"}
  }
}
function nextCard() {
  var cardCount = document.getElementById("cardcount").textContent;
  var currentIndex = parseInt(cardCount.split("/")[0]);
  var totalCards = parseInt(cardCount.split("/")[1]);
  
  var flashcardSet = localStorage.getItem("setCurrent");
  var flashcards = JSON.parse(localStorage.getItem(flashcardSet));

  if (flashcards && flashcards.length > 0) {
    if (currentIndex < totalCards) {
      var nextIndex = currentIndex + 1;
      showCard(flashcards[nextIndex - 1].question, flashcards[nextIndex - 1].answer);
      document.getElementById("cardcount").textContent = nextIndex + "/" + totalCards;
      
      if (nextIndex === totalCards) {
        updateArrows(nextIndex, totalCards, true, false);
      } else {
        updateArrows(nextIndex, totalCards, true, true);
      }
      
      // Fix coloring of text
      var answerSide = document.getElementById("questionSide")
      answerSide.style.color = "black";
    }
  }
}
function previousCard() {
  var cardCount = document.getElementById("cardcount").textContent;
  var currentIndex = parseInt(cardCount.split("/")[0]);
  var totalCards = parseInt(cardCount.split("/")[1]);
  
  var flashcardSet = localStorage.getItem("setCurrent");
  var flashcards = JSON.parse(localStorage.getItem(flashcardSet));

  if (flashcards && flashcards.length > 0) {
    if (currentIndex > 1) {
      var previousIndex = currentIndex - 1;
      showCard(flashcards[previousIndex - 1].question, flashcards[previousIndex - 1].answer);
      updateArrows(previousIndex, totalCards);
      document.getElementById("cardcount").textContent = previousIndex + "/" + totalCards;
      
  //Fix colouring of text
  var answerSide = document.getElementById("questionSide")
  answerSide.style.color = "black";
    }
  }
}
function backButton() {
    localStorage.removeItem("setCurrent");
    window.location.href = "Consolidation.html";
}
function deleteCard(title) {
  let response = confirm("Are you sure you want to delete this card?");
  if (response == true) {
    var flashcards = JSON.parse(localStorage.getItem(title));
    var cardCount = document.getElementById("cardcount");

    if (flashcards && flashcards.length > 0) {
      var currentIndex = parseInt(cardCount.textContent.split("/")[0]);
      var totalCards = parseInt(cardCount.textContent.split("/")[1]);

      if (currentIndex >= 1 && currentIndex <= totalCards) {
        flashcards.splice(currentIndex - 1, 1);

        if (flashcards.length > 0) {
          localStorage.setItem(title, JSON.stringify(flashcards));

          if (currentIndex === 1) {
            cardCount.textContent = "1/" + flashcards.length;
            showCard(flashcards[0].question, flashcards[0].answer); // Show the second card
            updateArrows(1, flashcards.length);
          } else {
            cardCount.textContent = (currentIndex - 1) + "/" + flashcards.length;
            showCard(flashcards[currentIndex - 2].question, flashcards[currentIndex - 2].answer); // Show the previous card
            updateArrows(currentIndex - 1, flashcards.length);
          }
        } else {
          localStorage.removeItem(title);
          cardCount.textContent = "0/0";
          showCard("", "");
          updateArrows(0, 0);
        }
      }
    }
  }
}
function updateArrows(current, totalCount) {
  console.log(current, totalCount);
  var theme = localStorage.getItem("theme");
  var colour = theme === "themeA" ? "blue" : "red";

  var rightArrow = document.getElementById("rightArrow");
  var leftArrow = document.getElementById("leftArrow");

  if (current === totalCount && totalCount > 1) {
    rightArrow.src = "grey_right_arrow.png";
    rightArrow.removeAttribute("onclick");
  } else {
    rightArrow.src = colour + "_right_arrow.png";
    rightArrow.setAttribute("onclick", "nextCard()");
  }

  if (current === 1 || (current === 2 && totalCount === 1) || totalCount === 0) {
    leftArrow.src = "grey_left_arrow.png";
    leftArrow.removeAttribute("onclick");
  } else {
    leftArrow.src = colour + "_left_arrow.png";
    leftArrow.setAttribute("onclick", "previousCard()");
  }

  if ((current === 1 && totalCount === 1) || totalCount === 0) {
    rightArrow.src = "grey_right_arrow.png";
    rightArrow.removeAttribute("onclick");
    leftArrow.src = "grey_left_arrow.png";
    leftArrow.removeAttribute("onclick");
  }
}