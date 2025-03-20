/* eslint-disable no-restricted-syntax */
import Papa from "papaparse";

const keysToIgnore = ["id", "user_id", "role_id"];

const downloadCSV = (jsonData, fileName) => {
  const data = jsonData.map((d) => {
    const temp = { ...d };
    for (const key of keysToIgnore) {
      delete temp[key];
    }
    return temp;
  });

  const csvData = Papa.unparse(data, {
    header: true,
    skipEmptyLines: true,
  });

  const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.href = url;
  link.setAttribute("download", `${fileName}.csv`);
  link.click();

  URL.revokeObjectURL(url);
};

export default downloadCSV;
