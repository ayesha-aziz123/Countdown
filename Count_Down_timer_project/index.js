#! /usr/bin/env node.
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.bold.italic.magenta("<------------------------------------------------------------------------------->"));
console.log(chalk.bold.italic.magenta("<----------------------- WELCOME COUNTDOWN TIMER PROJECT START ----------------->"));
console.log(chalk.italic.bold.magenta("<------------------------------------------------------------------------------->"));
const response = await inquirer.prompt({
    name: "user_input",
    type: "number",
    message: chalk.italic.green("Please enter the amount of second under 60:"),
    transformer: (input) => {
        return chalk.bold.italic.whiteBright(input);
    },
    validate: (input) => {
        if (isNaN(input)) {
            return chalk.bold.italic.blue("Please enter Validate number !");
        }
        else if (input > 60) {
            return chalk.bold.italic.blue("Seconds must be in 60");
        }
        else {
            return true;
        }
    },
});
let result = response.user_input;
function startTime(val) {
    const iniTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervTime = new Date(iniTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervTime, currentTime);
        if (timeDiff <= 0) {
            console.log(chalk.bold.italic.red("Timer has Expired !"));
            process.exit();
        }
        const min = Math.floor((timeDiff % (3600 * 24)) / 3600); //minutes
        const sec = Math.floor(timeDiff % 60); //seconds
        console.log(`${chalk.bold.italic.yellow(min.toString().padStart(2, "0"))}:${chalk.bold.italic.yellow(sec.toString().padStart(2, "0"))}`);
    }, 1000);
}
startTime(result);
