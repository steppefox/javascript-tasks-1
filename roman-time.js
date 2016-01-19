var hours = Number(process.argv[2]);
var minutes = Number(process.argv[3]);

// Немного замечательного кода и магии

function init() {
  if ((hours !== 0 && !hours) || (minutes !== 0 && !minutes)) {
    console.warn('Время нужно указать числами');
  } else if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    console.warn('Время указано не верно');
  } else {
    var romanHours = timeToRoman(hours);
    var romanMinutes = timeToRoman(minutes);
    var asciiArr = printAscii(romanHours + ':' + romanMinutes);
    for (var i in asciiArr) {
      console.log(asciiArr[i]);
    }
  }
}

init();

function timeToRoman(number) {
  var romanNumbers = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
  };


  var ret = '';
  while (true) {
    for (var i in romanNumbers) {
      var nm = romanNumbers[i];
      if (number >= nm) {
        var ost = parseInt(number / nm);
        for (var k = 0; k < ost; k++) {
          ret += i;
        }
        number = number % nm;
        break;
      }
    }

    if (number == 0) {
      break;
    }
  }
  return ret;
}

function printAscii(number) {
  var matrix = {
    I: [
      [0,1,1,1,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,0,1,0,0],
      [0,1,1,1,0]
    ],
    V: [
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [0,1,0,0,0,1,0],
      [0,1,0,0,0,1,0],
      [0,0,1,0,1,0,0],
      [0,0,1,0,1,0,0],
      [0,0,0,1,0,0,0]
    ],
    X: [
      [1,0,0,0,0,0,1],
      [0,1,0,0,0,1,0],
      [0,0,1,0,1,0,0],
      [0,0,0,1,0,0,0],
      [0,0,1,0,1,0,0],
      [0,1,0,0,0,1,0],
      [1,0,0,0,0,0,1]
    ],
    L: [
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,0],
      [1,0,0,0,1],
      [1,1,1,1,1]
    ],
    C: [
      [0,0,1,1,1,0],
      [0,1,0,0,0,1],
      [1,0,0,0,0,0],
      [1,0,0,0,0,0],
      [1,0,0,0,0,0],
      [0,1,0,0,0,1],
      [0,0,1,1,1,0]
    ],
    D: [
      [1,1,1,0,0],
      [1,0,0,1,0],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,0,1],
      [1,0,0,1,0],
      [1,1,1,0,0]
    ],
    M: [
      [1,1,0,0,0,1,1],
      [1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1],
      [1,0,0,1,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1],
      [1,0,0,0,0,0,1]
    ],
    ':': [
      [0,0,0],
      [0,1,0],
      [0,1,0],
      [0,0,0],
      [0,1,0],
      [0,1,0],
      [0,0,0]
    ]
  };

  number = String(number);
  var ret = [];
  for (var inc = 0; inc < 7; inc++) {
    var st = '';
    for (var i in number) {
      if (typeof matrix[number[i]] !== 'undefined') {
        var letterMatrix = matrix[number[i]][inc];
        for (var j in letterMatrix) {
          var nm = letterMatrix[j];
          if (nm == 0) {
            st += ' '; // Пустота в символе
          } else {
            st += '*'; // Черточка или другой знак
          }
        }
      }

      st += '  ';
    }
    ret.push(st);
  }

  return ret;
}
