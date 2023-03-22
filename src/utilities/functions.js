const {hexMap, demiPlaneList} = require('./map');
let {pointer, period, inMaterialPlane, planeCounter, pointerRow, pointerIndex, rowBorder} = require('./constants');
const {highFellPositions} = require('./constants');

function rollDice(numberOfDice, numberOfSides, modifier = 0) {
    const maxMultiplier = numberOfSides + (numberOfDice - 1) * (numberOfSides - 1);
    const minResult = numberOfDice;
    const result = Math.floor(Math.random() * maxMultiplier + minResult) + modifier;
    return result;
}

// Updates pointer position after move
function determinePointerPosition() {
    if (inMaterialPlane) {
        for(row of hexMap) {
            if(row.includes(pointer)) {
                pointerRow = row;
            }
        }
        pointerIndex = pointerRow.indexOf(pointer);
        rowBorder = pointerRow[pointerRow.length -1];
    } else {
        pointerRow = "In Demi Plane";
        pointerIndex = "In Demi Plane";
        rowBorder = null;
    }
}

// Phase pointer to a new position if it reaches limit or leaves demi-plane

function phaseToBeginning() {
    pointer = rollDice(3, 20);
    determinePointerPosition();
}


// Checks if pointer is in the material plane or in a demi-plane and moves pointer after a period passes. 

function pointerMove() {
period++;

    if(inMaterialPlane) {
        if(pointer === rowBorder) {
            if(rollDice(1, 6) !== 1) {
                phaseToBeginning();
            } else {
                planeShift();
            }
        } else {
            pointer = pointerRow[pointerIndex + 1];
            determinePointerPosition();
        }
    } else {
        planeCounter--;
        if(planeCounter === 0) {
            inMaterialPlane = true;
            phaseToBeginning();
        }
    }
}


// Shifts pointer to a demi-plane and calculates how many periods it will remain there

function planeShift() {
    planeCounter = rollDice(2, 8);
    inMaterialPlane = false;
    demiPlaneRoll = rollDice(1, 6);

    for(demiPlane of demiPlaneList) {
        if(demiPlaneRoll === demiPlane.roll) {
            pointer = demiPlane.name;
        }
    }

    determinePointerPosition();
}

//Function that takes the number of periods and for each period moves highfell and records its positions in an object list

function moveHighFell(numberOfPeriods = 1, initialPointer = null, initialPeriod = period) {
    for (let i = numberOfPeriods; i > 0; i--) {
        if (pointer === null) {
            phaseToBeginning();
        } else {
            pointerMove();
        }
        let positionEntry = {
            period : period,
            inMaterialPlane: inMaterialPlane,
            location : pointer,
            row: pointerRow,
            periodsToPhase: inMaterialPlane ? pointerRow.length - pointerIndex : planeCounter  
        }
        highFellPositions.push(positionEntry);
    }
}


module.exports = { moveHighFell };