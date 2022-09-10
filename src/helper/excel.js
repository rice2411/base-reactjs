import * as XLSX from "xlsx/xlsx.mjs";

export const exportExcel = (option) => {
  var wb = XLSX.utils.book_new();
  var ws = XLSX.utils.json_to_sheet(option.data);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, option.sheetName + ".xlsx");
};
export const importExcel = (onSubmit, convert) => {
  const excelInput = document.createElement("input");
  excelInput.type = "file";
  excelInput.click();
  excelInput.onchange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const dataRaw = XLSX.utils.sheet_to_json(ws, { header: 1 });
      let data = [];
      dataRaw.map((item) => {
        if (item.length) {
          const realData = convert(item);
          data.push(realData);
        }
      });
      // data.shift();
      console.log(data);
      /* Update state */
      onSubmit(data);
    };
    reader.readAsBinaryString(file);
  };
  excelInput.remove();
};
