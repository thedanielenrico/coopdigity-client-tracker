// https://docs.google.com/spreadsheets/d/1rl777z7NhjirDUxx1HgHbLmx58AogsR6o5qQx8ZmRpw/edit?gid=0#gid=0
const output = document.querySelector(".output");
const url = "https://docs.google.com/spreadsheets/d/";
const ssid = "1rl777z7NhjirDUxx1HgHbLmx58AogsR6o5qQx8ZmRpw";
const query1 = `/gviz/tq?`;

const endpoint = `${url}${ssid}${query1}`;

fetch(endpoint)
  .then((res) => res.text())
  .then((data) => {
    const temp = data.substring(47).slice(0, -2);
    const json = JSON.parse(temp);
    const rows = json.table.rows;
    const cols = json.table.cols;

    cols.forEach((col) => {
      if (col.label !== "Progress Bar") {
        const colHeader = document.createElement("th");
        colHeader.textContent = col.label;
        output.append(colHeader);
      }
    });
    rows.forEach((row) => {
      const div = document.createElement("tr");
      const temp1 = row.c;
      temp1.forEach((cell) => {
        if (cell) {
          const box = document.createElement("td");
          box.textContent = cell.v;
          box.classList.add("box");
          div.append(box);
        }
      });
      output.append(div);
    });
  });
