import * as XLSX from "xlsx";
import { moment } from "../boot";
export default function jsonToXlsx({ json = {}, title = "" }) {
  const workbook = XLSX.utils.book_new();
  workbook.Props = {
    Title: title,
    Subject: title,
    Author: "marvel-trade",
    CreatedDate: new Date(),
  };
  const ws = XLSX.utils.json_to_sheet(json);
  XLSX.utils.book_append_sheet(workbook, ws, "Results");
  const fileName = `${title}-${moment.miladiToShamsi({})}.xlsx`;
  XLSX.writeFile(workbook, fileName, { type: "file" });
}
