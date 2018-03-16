/**
 * Listens to events from the custom HTML side bar
*/
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Page');
}


/**
 * Creates user interface in the bar
*/
function onOpen(event) {
  SlidesApp.getUi() 
      .createMenu('Quizz')
      .addItem('Quizz', 'quizz')
      .addToUi();
}


function showAlert() {
  var ui = SlidesApp.getUi(); 
  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Confirmation received.');
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
  }
}


/**
 * Initiates a new quizz: shuffle the slides, save the quiz in Google Sheets, 
*/
function quizz(event) {
 
  // Generate quizz
  var quizz = shuffle(SlidesApp.getActivePresentation().getSlides())
  
  // Save quizz to master quizz 
  var sheet = SpreadsheetApp.create('quizz')
  
  // Save quizz to temp sheet
  var bufferSheet = SpreadsheetApp.create('quizz-TEMP')
  
  // Log document URL
  Logger.log(sheet.getUrl());
  
  // Create a new sheet with the name of current date and time
  var date = new Date();  
  var options = {  
    weekday: "long", year: "numeric", month: "short",  
    day: "numeric", hour: "2-digit", minute: "2-digit"  
  };  
  var newSheet = sheet.insertSheet();
   newSheet.setName(date.toLocaleDateString("en-US", options));
  
  
  // save the quizz into the sheet
  for (var i = 0; i < quizz.length; i++){
    var title = quizz[i].getPageElements()[0].asShape().getText().asString().slice(0,-1)
    sheet.appendRow([i, title])
    bufferSheet.appendRow([i, title])
  }
  
  // Prepare interface
  var html = HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('Quizz')
      .setWidth(300);
  SlidesApp.getUi().showSidebar(html);
}


function test (){
  var ui = SlidesApp.getUi();   
  var temp = getSpreadsheetByName('quizz-TEMP')
  
  var drng = temp.getDataRange();
  var rng = sht.getRange(2,1, drng.getLastRow()-1,drng.getLastColumn());
  var rngA = rng.getValues();//Array of input values
  for(var i = 0; i < rngA.length; i++) {

  }
  
  for (var i = 0; i < quizz.length; i++){
    var title = quizz[i].getPageElements()[0].asShape().getText().asString()
    Logger.log(title)
    ui.alert(title);
    quizz[i].selectAsCurrentPage();
    
    
    var result = ui.alert(
     'How did it go',
     'Did you get it right?',
      ui.ButtonSet.YES_NO);
      // Process the user's response.
    if (result == ui.Button.YES) {
      // User clicked "Yes".
      
    } else {
      // User clicked "No" or X in the title bar.
      
    }
    
    
    //SlidesApp.getUi().alert(title);
  }
}


/**
 * Helper method to shuffle slides. Fisher-Yates (aka Knuth) Shuffle technique
 */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function showAlert() {
  var ui = SlidesApp.getUi(); // Same variations.

  var result = ui.alert(
     'Please confirm',
     'Are you sure you want to continue?',
      ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    ui.alert('Confirmation received.');
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Permission denied.');
  }
}

function getSpreadsheetByName(filename) {
  var files = DocsList.find(filename);

  for(var i in files)
  {
    if(files[i].getName() == filename)
    {
      // open - undocumented function
      return SpreadsheetApp.open(files[i]);
      // openById - documented but more verbose
      // return SpreadsheetApp.openById(files[i].getId());
    }
  }
  return null;
}

/**
 * Open the Add-on upon install.
 */
function onInstall(event) {
  onOpen(event);
}