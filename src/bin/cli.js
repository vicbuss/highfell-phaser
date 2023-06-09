#!/usr/bin/env node

const yargs = require('yargs');
const {moveHighFell} = require('../utilities/functions');
const {highFellPositions} = require('../utilities/constants'); 

yargs
//   .scriptName("highfell-mover")
  .usage('$0 <cmd> [args]')
  .command('move', 'moves Highfell for a number of [--periods] (default 1)', (yargs) => {
    yargs.positional('periods', {
      type: 'int',
      default: 1,
      describe: 'the number of periods to move Highfell for'
    })
  }, function (argv) {
    moveHighFell(argv.periods);
    console.log(highFellPositions);
  })
  .help()
  .example('$0 move --period [number]', 'moves Highfell for [number] periods')
  .argv

