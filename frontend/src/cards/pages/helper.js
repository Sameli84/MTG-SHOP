
import { createWriteStream } from 'fs';
const myConsole = new console.Console(createWriteStream('./output.txt'));

const response = await fetch(`https://api.scryfall.com/sets`);

const data = await response.json();

const codes = [];
const names = [];

data.data.forEach((set) => {
  codes.push(set.code);
  names.push(set.name);
});

const options = codes.map((set, index) => ({
    value: set,
    label: names[index],
  }));

myConsole.log(JSON.stringify(options)); 
