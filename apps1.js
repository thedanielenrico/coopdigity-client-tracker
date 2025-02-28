// https://docs.google.com/spreadsheets/d/1rl777z7NhjirDUxx1HgHbLmx58AogsR6o5qQx8ZmRpw/edit?gid=0#gid=0
const output = document.querySelector(".output");
const url = "https://docs.google.com/spreadsheets/d/";
const ssid = "1rl777z7NhjirDUxx1HgHbLmx58AogsR6o5qQx8ZmRpw";
const query1 = `/gviz/tq?gid=1904945682`;

const clientIdSubmit = document.getElementById("client-id-submit-btn");
const clientIdInput = document.getElementById("client-id");

clientIdSubmit.addEventListener("click", () => {
  const clientIdVal = clientIdInput.value;
  if (clientIdVal.length >= 1) {
    fetchClientData(clientIdVal);
  }
});

function fetchClientData(clientId) {
  if (clientId) {
    const endpoint = `${url}${ssid}/gviz/tq?gid=${clientId}`;
    if (output.hasChildNodes()) {
      output.innerHTML = "";
    }

    fetch(endpoint)
      .then((res) => res.text())
      .then((data) => {
        const temp = data.substring(47).slice(0, -2);
        const json = JSON.parse(temp);
        const rows = json.table.rows;
        const cols = json.table.cols;
        console.log(json);
        cols.forEach((col) => {
          if (col.label !== "Progress Bar") {
            const colHeader = document.createElement("th");
            colHeader.textContent = col.label;
            output.append(colHeader);
          }
        });
        rows.forEach((row) => {
          const tableRow = document.createElement("tr");
          const rowContent = row.c;
          rowContent.forEach((cell) => {
            if (cell) {
              const tableData = document.createElement("td");
              tableData.textContent = cell.v;
              if (typeof cell.v === "boolean") {
                tableData.innerHTML = `<i class="material-icons is-completed-icon">${
                  cell.v ? "check_box" : "check_box_outline_blank"
                }</i>`;
              }
              tableRow.append(tableData);
            }
          });
          output.append(tableRow);
          clientIdInput.value = "";
        });
      });
  }
}
