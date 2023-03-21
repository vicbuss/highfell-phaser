/**
 * Highfell is located at the pointer
 * The position of the pointer will initially be determined randomly, between 3-60, representing the hex numbers
 * An array containing 10 nested arrays of variable length containing hex numbers will represent the map
 * The pointer will save a hex number as reference, showing where Highfell is
 * A counter will keep track of the period
 * At each period the pointer will advance one index in its array
 * If the pointer reaches the end of the array, a new position will be determined randomly for the next period
 * 
 * Each time the pointer reaches the end of an array, there is a 1-6 chance it will be in a "demi-plane"
 * It will remain in this demi-plane for 2-8 periods, and after that will reappear at the matrix
 * 
 * 
 * 1- Determine pointer value
 * 2- Increment counter by 1
 * 3- If pointer is at the end of the array, determine chance of phasing to another plane
 * 4- If phases to another plane, determine which plane and advance counter by 2-8 periods and determine a new pointer value
 * 5- If doesn't phase, Determine new Pointer value 
 * 6- If not at end of Array, change pointer value to the value of the next index and check if it is at the end
 *  
 */


const hexMap = [
    [25, 34, 42, 49, 55],
    [3, 9, 15, 26, 35, 43, 50, 56],
    [4, 10, 16, 27, 36, 44, 51, 57],
    [5, 11, 17, 28, 37, 45, 52, 58, 60],
    [6, 12, 18, 29, 38, 46, 53, 59],
    [7, 13, 19, 30, 39, 47, 54],
    [8, 14, 20, 31, 40, 48],
    [21, 32, 41],
    [22, 33],
    [23, 24]
]


const demiPlaneList = [
    {
        roll: 1,
        name: "Plane of Air"
    },
    {
        roll: 2,
        name: "Plane of Earth"
    },
    {
        roll: 3,
        name: "Plane of Fire"
    },
    {
        roll: 4,
        name: "Plane of Ice"
    },
    {
        roll: 5,
        name: "Plane of Shadow"
    },
    {
        roll: 6,
        name: "The Forbidden Zone"
    }
]

//Pointer location
let pointer = null;

//Period

let period = 1;

// Plane flag

let inMaterialPlane = true;


//Plane counter

let planeCounter = 0;


//Row where pointer is located

let pointerRow;

//Index of pointer on row

let pointerIndex;

//Limit of row

let rowBorder;


//Rolling for new Pointer Location

function rollDice(numberOfDice, numberOfSides) {
        const maxMultiplier = numberOfSides + (numberOfDice - 1) * (numberOfSides - 1);
        const minResult = 1 * numberOfDice;
        const result = Math.floor(Math.random() * maxMultiplier + minResult);
        return result;
}

// Phase pointer to a new position if it reaches limit

function phaseToBeginning() {
    pointer = rollDice(3, 20);
    determinePointerPosition();
}

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

// Moving pointer after a period passes - If in material plane, moves pointer until edge; If in demi-plane, 
//advances period until timer runs out 

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


const highFellPositions = [];

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

console.log("Start");

moveHighFell(30);

console.log(highFellPositions);

// phaseToBeginning();

// console.log(`Period: ${period} - Pointer: ${pointer}, in position: ${pointerIndex}, in row: ${pointerRow}`);

// for(let i = 0; i < 121; i++) {


//     pointerMove();
    
//     console.log(`Period: ${period} - Pointer: ${pointer}, in position: ${pointerIndex} in row: ${pointerRow}`);
// }




