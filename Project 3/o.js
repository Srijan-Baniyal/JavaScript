let table = 3;             // Unit of table
let operator = 'addition'; // Type of calculation
let i = 1;                 // Set counter to 1
let msg = '';              // Message

if (operator === 'addition') {
  // Do addition
  while (i < 11) {
    msg += i + ' + ' + table + ' = ' + (i + table) + '<br />';
    i++;
  }
} else {
  // Do multiplication
  while (i < 11) {
    msg += i + ' x ' + table + ' = ' + (i * table) + '<br />';
    i++;
  }
}

// Write the message into the page
let el = document.getElementById('blackboard');
el.innerHTML = msg;