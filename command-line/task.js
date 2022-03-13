#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const moment = require("moment");
const readline = require("readline");

const input = readline.createInterface(process.stdin);

yargs(hideBin(process.argv))
  .scriptName("cmd")
  //Task 2
  .command(
    "$0",
    "Игра угадай число",
    () => {},
    async () => {
      const randomValue = Math.floor(Math.random() * 100);

      console.log("Загадано число в диапазоне от 0 до 100");

      while (true) {
        let answer = await question();

        if (!answer || /\D+/.test(answer)) {
          console.log("Необходимо ввести число");
          continue;
        }

        answer = parseInt(answer, 10);

        if (answer === randomValue) {
          console.log(`Отгадано число ${randomValue}`);
          input.close();
          break;
        } else if (answer > randomValue) {
          console.log("Меньше");
        } else {
          console.log("Больше");
        }
      }
    }
  )
  //Task 1
  .command(
    "current [options]",
    "Получить текущую версию",
    (yargs) =>
      yargs
        .options({
          y: {
            alias: "year",
            describe: "Получить текущий год",
            conflicts: ["m", "d"],
          },
          m: {
            alias: "month",
            describe: "Получить текущий месяц",
            conflicts: ["y", "d"],
          },
          d: {
            alias: "date",
            describe: "Получить текущий день",
            conflicts: ["m", "y"],
          },
        })
        .help(),
    ({ y, m, d }) => {
      const date = new Date();

      if (y) {
        console.log(date.getFullYear());
      } else if (m) {
        console.log(date.getMonth() + 1);
      } else if (d) {
        console.log(date.getDate());
      } else {
        console.log(date.toISOString());
      }

      input.close();
    }
  )
  .command(
    "add",
    "Получение даты с прибавлением дней, недель, лет",
    (yargs) =>
      yargs
        .options({
          y: {
            alias: "year",
            describe: "Добавить лет",
            requiresArg: true,
            type: "number",
            default: 0,
          },
          m: {
            alias: "month",
            describe: "Добавить месяцев",
            requiresArg: true,
            type: "number",
            default: 0,
          },
          d: {
            alias: "date",
            describe: "Добавить дней",
            requiresArg: true,
            type: "number",
            default: 0,
          },
        })
        .check(({ y, m, d }) => {
          if (!y && !m && !d) {
            throw new Error("Должен быть как минимум 1 аргумент");
          }

          return true;
        })
        .help(),
    ({ y = 0, m = 0, d = 0 }) => {
      console.log(
        moment().add(y, "years").add(m, "months").add(d, "days").toISOString()
      );
      input.close();
    }
  )
  .command(
    "sub",
    "Получение даты с убавлением дней, недель, лет",
    (yargs) =>
      yargs
        .options({
          y: {
            alias: "year",
            describe: "Убавить лет",
            requiresArg: true,
            type: "number",
            default: 0,
          },
          m: {
            alias: "month",
            describe: "Убавить месяцев",
            requiresArg: true,
            type: "number",
            default: 0,
          },
          d: {
            alias: "date",
            describe: "Убавить дней",
            requiresArg: true,
            type: "number",
            default: 0,
          },
        })
        .check(({ y, m, d }) => {
          if (!y && !m && !d) {
            throw new Error("Должен быть как минимум 1 аргумент");
          }

          return true;
        })
        .help(),
    ({ y = 0, m = 0, d = 0 }) => {
      console.log(
        moment()
          .subtract(y, "years")
          .subtract(m, "months")
          .subtract(d, "days")
          .toISOString()
      );
      input.close();
    }
  ).argv;
