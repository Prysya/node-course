const fs = require("fs");
const path = require("path");

const generateJsonLogFilePath = (filename) =>
  path.join(__dirname, "log", filename + ".json");

const getLogFileData = async (filename) =>
  await fs.promises.readFile(generateJsonLogFilePath(filename), "utf-8");

const saveLogToFile = async (filename, data) =>
  await fs.promises.writeFile(
    generateJsonLogFilePath(filename),
    JSON.stringify(data, null, 4),
    "utf-8"
  );

const generateGameStatsObject = (data, isWin) => ({
  games: (data.games || 0) + 1,
  win: (data.win || 0) + (isWin ? 1 : 0),
  lose: (data.lose || 0) + (isWin ? 0 : 1),
});

const writeLogsToFile = async (filename, isWin) => {
  let data = {};

  try {
    data = JSON.parse(await getLogFileData(filename));
  } catch {
  } finally {
    await saveLogToFile(filename, generateGameStatsObject(data, isWin));
  }
};

const checkAllStatsData = (data) =>
  "games" in data && "win" in data && "lose" in data;

const getAllStats = async (filename) => {
  try {
    const data = JSON.parse(await getLogFileData(filename));
    
    if (!checkAllStatsData(data)) {
      throw new Error();
    }

    return data;
  } catch {
    throw new Error('Ошибка обработки данных')
  }
}

module.exports = {
  getLogFileData,
  writeLogsToFile,
  getAllStats
};
