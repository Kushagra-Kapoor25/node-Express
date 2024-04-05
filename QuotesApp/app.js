import quotes from "quotes-goodreads";
import { appendFile } from "fs";

let quote = quotes.getRandomStringQuoteWithAuthor();
appendFile("quotes.txt", `${quote} \n`, "utf8", (err) => {
  if (err) throw err;
  console.log("Quotation added to the quotes.txt");
});
