var chalk = require('chalk');

var formatNumber = (num, digits) => {
    var si = [
        { value: 1, symbol: "" },
        { value: 1E3, symbol: "k" },
        { value: 1E6, symbol: "M" },
        { value: 1E9, symbol: "G" },
        { value: 1E12, symbol: "T" },
        { value: 1E15, symbol: "P" },
        { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

var getResistorDetails = (colors) => {
    
    var r = {};
    
    r.colors = colors.slice(0);
    
    r.toleranceColor = colors.pop();
    r.tolerance = getTolerance(r.toleranceColor);
    
    r.multiplierColor = colors.pop();
    r.multiplier = getMultiplier(r.multiplierColor);
    
    var digitColors = colors;
    var digitString = '';
    digitColors.forEach(digitColor => {
        var digitValue = getDigit(digitColor);
        digitString += digitValue;
    });
    
    r.digits = parseInt(digitString);
    
    r.digitOne = parseInt(digitString[0]);
    r.digitOneColor = getDigitColor(r.digitOne);
    
    r.digitTwo = parseInt(digitString[1]);
    r.digitTwoColor = getDigitColor(r.digitTwo);
    
    r.digitThree = parseInt(digitString[2]);
    r.digitThreeColor = getDigitColor(r.digitThree);

    return r;

}

var logResistorDetails = (resistor) => {

    var r = resistor;
    // console.log(r);

    var width = 4;
    var spacer = ' '.repeat(width);
    var underline = '_'.repeat(width);
    var overline = '\u203e'.repeat(width);
    var borderTop = ` ${underline}  `;
    var borderHorizontal = `|`;
    var borderBottom = ` ${overline}  `;

    console.log( formatNumber(r.digits * r.multiplier) + '\u03A9' + ` \u2213 ` + r.tolerance * 100 + '%' );

    console.log(spacer + ' ' + borderTop.repeat(5));    
    console.log(
        underline + ' ' + 
        borderHorizontal + (r.digitOne >= 0 ? chalk.underline.bgKeyword(r.digitOneColor)(spacer) : spacer) + '|' + ' ' + 
        borderHorizontal + (r.digitTwo >= 0 ? chalk.underline.bgKeyword(r.digitTwoColor)(spacer) : spacer) + borderHorizontal  + ' ' + 
        borderHorizontal + (r.digitThree >= 0 ? chalk.underline.bgKeyword(r.digitThreeColor)(spacer) : spacer) + borderHorizontal  + ' ' +  
        borderHorizontal + (r.multiplier >= 0? chalk.underline.bgKeyword(r.multiplierColor)(spacer) : spacer) + borderHorizontal  + ' ' + 
        borderHorizontal + (r.tolerance >= 0? chalk.underline.bgKeyword(r.toleranceColor)(spacer) : spacer) + borderHorizontal + ' ' +
        underline
    );
    console.log(
        spacer + ' ' +
        borderHorizontal + (r.digitOne >= 0 ? formatNumber(r.digitOne).padEnd(spacer.length) : spacer) + borderHorizontal  + ' ' + 
        borderHorizontal + (r.digitTwo >= 0 ? formatNumber(r.digitTwo).padEnd(spacer.length) : spacer) + borderHorizontal  + ' ' + 
        borderHorizontal + (r.digitThree >= 0 ? formatNumber(r.digitThree).padEnd(spacer.length) : spacer) + borderHorizontal  + ' ' +  
        borderHorizontal + (r.multiplier >= 0 ? formatNumber(r.multiplier).padEnd(spacer.length) : spacer) + borderHorizontal  + ' ' + 
        borderHorizontal + (r.tolerance >= 0 ? (r.tolerance * 100 + '%').padEnd(spacer.length) : spacer) + borderHorizontal + ' ' +
        spacer
    );
    console.log(spacer + ' ' + borderBottom.repeat(5));
}

var logColors = () => {
    console.log(chalk.bgKeyword('black')('black'));
    console.log(chalk.bgKeyword('brown')('brown'));
    console.log(chalk.bgKeyword('red')('red'));
    console.log(chalk.bgKeyword('orange')('orange'));
    console.log(chalk.bgKeyword('yellow')('yellow'));
    console.log(chalk.bgKeyword('green')('green'));
    console.log(chalk.bgKeyword('blue')('blue'));
    console.log(chalk.bgKeyword('violet')('violet'));
    console.log(chalk.bgKeyword('gray')('gray'));
    console.log(chalk.bgKeyword('white')('white'));
    console.log(chalk.bgKeyword('gold')('gold'));
    console.log(chalk.bgKeyword('silver')('silver'));
    // console.log(chalk.bgKeyword('none')('none'));
}

var getTolerance = (color) => {
    switch (color) {
        case 'black':   return .01;
        case 'brown':   return .02;
        case 'red':     return;
        case 'orange':  return;
        case 'yellow':  return;
        case 'green':   return .005;
        case 'blue':    return .0025;
        case 'violet':  return .001;
        case 'gray':    return .0005;
        case 'white':   return;
        case 'gold':    return .05;
        case 'silver':  return .1;
        case 'none':    return;
        default:        return;
    }
}

var getToleranceColor = (tolerance) => {
    switch (tolerance) {
        case  .01:      return 'black';
        case  .02:      return 'brown';
        case  .005:     return 'green';
        case  .0025:    return 'blue';
        case  .001:     return 'violet';
        case  .0005:    return 'gray';
        case  .05:      return 'gold';
        case  .1:       return 'silver';
        default:        return;
    }
}

var getMultiplier = (color) => {
    switch (color) {
        case 'black':   return 1;
        case 'brown':   return 10;
        case 'red':     return 100;
        case 'orange':  return 1000;
        case 'yellow':  return 10000;
        case 'green':   return 100000;
        case 'blue':    return 1000000;
        case 'violet':  return 10000000;
        case 'gray':    return 100000000;
        case 'white':   return 1000000000;
        case 'gold':    return 0.1;
        case 'silver':  return 0.01;
        case 'none':    return;
        default:        return;
    }    
}

var getMultiplierColor = (multiplier) => {
    switch (multiplier) {
        case 1:         return 'black';
        case 10:        return 'brown';
        case 100:       return 'red';
        case 1000:      return 'orange';
        case 10000:     return 'yellow';
        case 100000:    return 'green';
        case 1000000:   return 'blue';
        case 10000000:  return 'violet';
        case 100000000: return 'gray';
        case 1000000000:return 'white';
        case 0.1:       return 'gold';
        case 0.01:      return 'silver';
        case 'none':    return;
        default:        return;
    }    
}

var getDigit = (color) => {
    switch (color) {
        case 'black':   return 0;
        case 'brown':   return 1;
        case 'red':     return 2;
        case 'orange':  return 3;
        case 'yellow':  return 4;
        case 'green':   return 5;
        case 'blue':    return 6;
        case 'violet':  return 7;
        case 'gray':    return 8;
        case 'white':   return 9;
        case 'gold':    return;
        case 'silver':  return;
        case 'none':    return;
        default:        return;
    }
}

var getDigitColor = (digit) => {
    switch (digit) {
        case 0:         return 'black';
        case 1:         return 'brown';
        case 2:         return 'red';
        case 3:         return 'orange';
        case 4:         return 'yellow';
        case 5:         return 'green';
        case 6:         return 'blue';
        case 7:         return 'violet';
        case 8:         return 'gray';
        case 9:         return 'white';
        default:        return;
    }
}


module.exports = {
    getTolerance: getTolerance,
    getMultiplier: getMultiplier,
    getDigit: getDigit,
    logColors: logColors,
    logResistorDetails: logResistorDetails,
    getResistorDetails: getResistorDetails,
}