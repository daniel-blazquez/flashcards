/**
 * Create a open translate menu item.
 */
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Page');
}


/**
 * Create a open translate menu item.
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

function quizz(event) {
 
  // Generate quizz
  var quizz = shuffle(SlidesApp.getActivePresentation().getSlides())
  
  // Save quizz to spreadsheet columns
  var sheet = SpreadsheetApp.create('quizz')
   Logger.log(sheet.getUrl());
  for (var i = 0; i < quizz.length; i++){
    var title = quizz[i].getPageElements()[0].asShape().getText().asString()
    sheet.appendRow([i, title])
   }
    
    
    //SlidesApp.getUi().alert(tit
  
  
  // Prepare interface
  var html = HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('Quizz')
      .setWidth(300);
  SlidesApp.getUi().showSidebar(html);
}


function test (){
  var ui = SlidesApp.getUi(); // Same variations.  
  var quizz = PropertiesService.getScriptProperties().getProperty('quizz');


  Logger.log(quizz.length)
  
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

/**
 * Open the Add-on upon install.
 */
function onInstall(event) {
  onOpen(event);
}