#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const http = require("http");
require("dotenv").config();

yargs(hideBin(process.argv))
  .scriptName("weather")
  .command(
    "$0 <country>",
    "Узнать погоду",
    (yargs) =>
      yargs
        .positional("country", {
          type: "string",
          default: "Moscow",
          describe: "город на английском",
          demandOption: true,
        })
        .help(),
    async ({ country }) => {
      const url =
        `${process.env.BASE_URL}` +
        `?access_key=${process.env.API_KEY}` +
        `&query=${country}`;

      console.log(url);

      http
        .get(url, (res) => {
          const statusCode = res.statusCode;

          if (statusCode !== 200) {
            console.error(`Статус код: ${statusCode}`);
            return;
          }

          res.setEncoding("utf8");

          let rawData = "";
          res.on("data", (chunk) => (rawData += chunk));

          res.on("end", () => {
            let parsedData = JSON.parse(rawData);
            console.log(parsedData);
          });
        })
        .on("error", (e) => {
          console.error(`Ошибка: ${e.message}`);
        });
    }
  )
  .demandCommand(1, "Необходимо выбрать команду").argv;
