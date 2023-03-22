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
 */


const {moveHighFell} = require('./utilities/functions');
const {highFellPositions} = require('./utilities/constants'); 

console.log("Start");

moveHighFell(1);

console.log(highFellPositions);






