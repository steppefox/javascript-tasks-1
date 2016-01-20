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
  if (number > 0) {
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
  } else {
    ret = 'N';
  }
  return ret;
}

function printAscii(romanTime) {
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
    N: [
      [1,0,0,0,0,0,1],
      [1,1,0,0,0,0,1],
      [1,0,1,0,0,0,1],
      [1,0,0,1,0,0,1],
      [1,0,0,0,1,0,1],
      [1,0,0,0,0,1,1],
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

  romanTime = String(romanTime);
  var ret = [];
  var maxRows;
  for (var i in matrix) {
    if (typeof maxRows === 'undefined' || matrix[i].length > maxRows) {
      maxRows = matrix[i].length;
    }
  }

  for (var inc = 0; inc < maxRows; inc++) {
    var st = '';
    for (var i in romanTime) {
      if (typeof matrix[romanTime[i]] !== 'undefined') {
        var letterMatrix = matrix[romanTime[i]][inc];
        // Если матрица буквы меньше по высоте чем максимальное кол-во строк во всём выводе
        if (typeof letterMatrix === 'undefined') {
          letterMatrix = new Array(matrix[romanTime[i]][0].length + 1).join('0').split('');
        }

        for (var j in letterMatrix) {
          var nm = letterMatrix[j];
          if (nm == 1) {
            st += '*'; // Черточка или другой знак
          } else {
            st += ' '; // Пустота в символе
          }
        }
      }

      st += '  ';
    }
    ret.push(st);
  }

  return ret;
}
