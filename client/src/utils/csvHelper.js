
export const convertAndDownloadAsCSV = async (dataArr, filename) => {
  if (dataArr && dataArr.length > 0) {
    var csv = convertToCSV(dataArr);
    var exportedFilename = filename + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilename);
    } else {
      var link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}

export const convertToCSV = (Arr) => {
  // Use first element to choose the keys and the order
  var keys = Object.keys(Arr[0]);

  // Build header
  var result = keys.join(",") + "\n";

  // Add the rows
  Arr.forEach(function (obj) {
    result += keys.map(k => obj[k]).join(",") + "\n";
  });

  return result;
}
