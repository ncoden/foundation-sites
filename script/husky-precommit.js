const chalk = require('chalk')
const spawn = require('child_process').spawn

console.log(chalk.yellow('🐶  Checking tests before committing with Husky...'))

const child = spawn('npm run test', [], { shell: true })

child.stdout.on('data', function (data) {
  process.stdout.write(data)
})

child.on('exit', function (code) {
  if(code === 0){
    console.log(chalk.yellow(code, '🐶  ✓ Tests run well, we can commit...'))
  } else {
    console.log(chalk.yellow('🐶  ✗ Tests are failing, please fix them before committing.'))
  }
})

child.on('error', function (err) {
  console.log(chalk.red(err))
})