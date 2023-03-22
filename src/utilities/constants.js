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

//Registry of HighFell positions
const highFellPositions = [];



module.exports = { pointer, period, inMaterialPlane, planeCounter, pointerRow, pointerIndex, rowBorder, highFellPositions };