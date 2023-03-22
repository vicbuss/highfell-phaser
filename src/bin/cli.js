#!/usr/bin/env node

const yargs = require('yargs');
const {moveHighFell} = require('../utilities/functions');
const {highFellPositions} = require('../utilities/constants'); 

yargs
//   .scriptName("highfell-mover")
  .usage('$0 <cmd> [args]')
  .command('move', ': moves Highfell for a number of periods (default 1)', (yargs) => {
    yargs.positional('period', {
      type: 'int',
      default: 1,
      describe: 'the number of periods to move Highfell for'
    })
  }, function (argv) {
    moveHighFell(argv.period);
    console.log(highFellPositions);
  })
  .help()
  .example('$0 move --period [number]', 'moves Highfell for [number] periods')
  .argv




// var yargs = require('yargs/yargs')(process.argv.slice(2)).argv;
// const {moveHighFell} = require('../utilities/functions');
// const {highFellPositions} = require('../utilities/constants'); 


// yargs.usage("\nUsage: $0 [cmd] <args>").alias("h", "help");

// argv
//     .command(
//         'move',
//         'Move Highfell by a certain number of periods (default 1)',
//         {
//             periods : {
//                 type: 'int',
//                 describe: 'The number of periods Highfell will be moved - (default 1)'
//             }
//         },
//         function(argv) {
//             moveHighFell(argv);
//             console.log(highFellPositions);
//         }
//     )
//     .help()
//     .argv

// // console.log("Start");

// // moveHighFell(1);

// // console.log(highFellPositions);