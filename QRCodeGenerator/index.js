import inquirer from "inquirer";
import qr from "qr-image";
import extractDomain from "extract-domain";
import { createWriteStream, appendFile } from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL:",
      name: "URL",
    },
  ])
  .then((answers) => {
    console.log(answers);
    let domainName = extractDomain(answers["URL"]);
    console.log(domainName);
    let qr_png = qr.image(answers["URL"], { type: "png" });
    qr_png.pipe(createWriteStream(`${domainName}.png`));

    appendFile("url.txt", `${domainName} \n`, (error) => {});
    console.log(
      "QR Code has been generated and URL has been saved in the file."
    );
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error(
        "QR Code has not been generated and URL has not been saved in the file."
      );
    }
  });
