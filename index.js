const xlsx = require("xlsx");

const wb = xlsx.readFile("D:/桌面/test.xlsx");

const s = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

console.log(s);
