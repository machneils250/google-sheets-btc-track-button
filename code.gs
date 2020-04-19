function getGlobalVars() {
  var global = {
    XRP: {
      inputCell: "I7",
      outputCountCell: "A7",
      dateCountCell: "A9",
      sheetReference: "'raw xrp'!",
      BTCname: "XRP",
    },
    ETH: {
      inputCell: "I35",
      outputCountCell: "A7",
      dateCountCell: "A9",
      sheetReference: "'raw eth'!",
      BTCname: "ETH",
    },
    BCH: {
      inputCell: "I61",
      outputCountCell: "A7",
      dateCountCell: "A9",
      sheetReference: "'raw bch'!",
      BTCname: "BCH",
    },
  }
  return global;
}

function AppendToXRP() {
  AppendToTable(
    getGlobalVars().XRP.inputCell,
    getGlobalVars().XRP.outputCountCell,
    getGlobalVars().XRP.dateCountCell,
    getGlobalVars().XRP.sheetReference,
    getGlobalVars().XRP.BTCname,
  );
}
function AppendToETH() {
  AppendToTable(
    getGlobalVars().ETH.inputCell,
    getGlobalVars().ETH.outputCountCell,
    getGlobalVars().ETH.dateCountCell,
    getGlobalVars().ETH.sheetReference,
    getGlobalVars().ETH.BTCname,
  );
}
function AppendToBCH() {
  AppendToTable(
    getGlobalVars().BCH.inputCell,
    getGlobalVars().BCH.outputCountCell,
    getGlobalVars().BCH.dateCountCell,
    getGlobalVars().BCH.sheetReference,
    getGlobalVars().BCH.BTCname,
  );
}

/*
 * This appends a input value to the specific BTC table.
 *
 * It first gets the input value, then gets the output value (by referring to a outputCountCoord
 * Then puts the input value there, and the date at the cell beside it. After that, it clears the cell with the input value.
 */
function AppendToTable(inputCoord, outputCountCoord, dateCountCell, sheetReference, BTCname) {
 var inputCell = SpreadsheetApp.getActiveSheet().getRange(inputCoord);
 var inputNumber = inputCell.getValue();
 if (!isNaN(parseFloat(inputNumber)) && isFinite(inputNumber)) {
   // its a number. do nothing
 } else {
   throw "Please input a number in cell [" + inputCoord + "]. We got this instead: [" + inputNumber + "]";
 }
 
 var outputCountCell = SpreadsheetApp.getActiveSheet().getRange("" + sheetReference + outputCountCoord);
 var outputCellDate  = SpreadsheetApp.getActiveSheet().getRange("" + sheetReference + dateCountCell); // [PATCH] Put current time here 
    
 if (outputCountCell.isBlank()) {
   throw "WARNING: No defined count cell found. We're looking up in cell [" + sheetReference + outputCountCoord + "]"
 } // else, do nothing. Its good
 if (outputCellDate.isBlank()) {
   throw "WARNING: No defined date cell found. We're looking up in cell [" + sheetReference + dateCountCell + "]"
 } // else, do nothing. Its good
    

 var targetCellAppend = SpreadsheetApp.getActiveSheet().getRange("" + sheetReference + outputCountCell.getValue());
 var targetDateAppend = SpreadsheetApp.getActiveSheet().getRange("" + sheetReference + outputCellDate.getValue());
 
 // assign the value there, put the date, and clear the input value
 targetCellAppend.setValue(inputNumber)
 targetDateAppend.setValue(new Date());
 inputCell.setValue("")
 
 SpreadsheetApp.getActiveSpreadsheet().toast
           ("Added " + inputNumber + " to " + BTCname + " table.","Append complete",10);
 Logger.log("Added " + inputNumber + " to " + BTCname + " table.");
}
