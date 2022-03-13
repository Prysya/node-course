#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const readline = require("readline");
const chalk = require("chalk");

const { question } = require("../utils/question");
const { writeLogsToFile, getAllStats } = require("./helpers");

const input = readline.createInterface(process.stdin);

yargs(hideBin(process.argv))
  .scriptName("tossTheCoin")
  .command(
    "play <filename>",
    "Орел или решка",
    (yargs) =>
      yargs
        .positional("filename", {
          type: "string",
          default: "log",
          describe: "имя файла для записи логов",
          demandOption: true,
        })
        .help(),
    async ({ filename }) => {
      const randomValue = Math.floor(Math.random() * (2 - 1 + 1) + 1);
      console.log(chalk.cyan("Загадано число 1 или 2, угадайте число"));

      let isWin = false;
      let answer = await question();

      if (!answer || !(answer === "1" || answer === "2")) {
        console.log("Необходимо ввести число 1 или 2");
      }

      answer = parseInt(answer, 10);

      if (answer === randomValue) {
        console.log(chalk.green("Верно!"));
        isWin = true;
      } else {
        console.log(chalk.red("Не верно :("));
      }

      await writeLogsToFile(filename, isWin);

      input.close();
    }
  )
  //Task 2
  .command(
    "analyze <filename>",
    "Анализ игр по имени файла",
    (yargs) =>
      yargs
        .positional("filename", {
          type: "string",
          default: "log",
          describe: "имя файла для записи логов",
          demandOption: true,
        })
        .help(),
    async ({ filename }) => {
      try {
        const { games, win, lose } = await getAllStats(filename);

        if (games === 0) {
          console.log(chalk.red("Всего игр: 0"));
          input.close();
          return;
        }

        const winPercents = Math.round((win / games) * 100);

        console.log(chalk.cyan(`Всего игр: ${games}`));
        console.log(chalk.green(`Количество побед: ${win}`));
        console.log(chalk.red(`Количество поражений: ${lose}`));
        console.log(
          chalk.blueBright("Процентное соотношение побед/поражений:") +
            " " +
            chalk.greenBright(`${winPercents}% / ${100 - winPercents}%`)
        );
      } catch (err) {
        console.log(chalk.red(err.message));
      }
      input.close();
    }
  )
  .demandCommand(1, "Необходимо выбрать команду").argv;
