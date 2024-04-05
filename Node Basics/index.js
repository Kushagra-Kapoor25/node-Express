const fs = require("fs");

fs.appendFile("./message.txt", " So Good!", (err) => {
  if (err) throw err;
  console.log("The file has been saved.");
  fs.readFile("./message.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
  });
});
