const { promises, fstat, constants } = require("fs");
const path = require("path");
const { exit } = require("process");

if (process.argv.length !== 4) {
  console.info("ℹ Usage: npm run setup {year} {day}");
  exit(0);
}
const year = process.argv[2]
  ? parseInt(process.argv[2])
  : new Date().getFullYear();
const day = parseInt(process.argv[3]);

if (day < 1 || day > 25) {
  console.warn("⚠ Please enter a day between 1 and 25");
  exit(0);
}

const startPath = process.cwd();

(async function () {
  console.log("\n\n\n  🎄 ADVENT OF CODE 🎄 \n\n");
  console.log(`🎁 Setting up day ${day}`);
  await createInputFiles();
  await createCodeFiles();
  await updateIndex();
  console.log("All done! Enjoy your new puzzle! 🎅");
})();

async function createDirectoryIfItDoesntExist(dir) {
  try {
    await promises.access(dir, constants.F_OK | constants.W_OK);
  } catch {
    console.log(`  Creating directory: ${dir}`);
    await promises.mkdir(dir, { recursive: true });
  }
}

async function createFileWithContentIfItDoesntExist(name, content) {
  try {
    await promises.access(name, constants.R_OK);
    console.log(`  File ${name} exists, will not overwrite.`);
  } catch {
    console.log(`  Creating file ${name}`);
    await promises.writeFile(name, content);
  }
}

async function createInputFiles() {
  const inputDayPath = path.join(startPath, `${year}`, "inputs", `day${day}`);
  await createDirectoryIfItDoesntExist(inputDayPath);

  createFileWithContentIfItDoesntExist(
    path.join(inputDayPath, "part1.txt"),
    `{visit https://adventofcode.com/${year}/day/${day} and paste the part 1 input here}`
  );

  createFileWithContentIfItDoesntExist(
    path.join(inputDayPath, "part2.txt"),
    `{After completing day 1, visit https://adventofcode.com/${year}/day/${day} and paste the part 2 input here}`
  );
}

async function copyTemplate(from, to) {
  const content = (await promises.readFile(from, { encoding: "utf8" })).replace(
    /super\(0, 2023\);/g,
    `super(${day}, ${year});`
  ); // replace the day number and year in the super constructor call
  createFileWithContentIfItDoesntExist(to, content);
}

async function createCodeFiles() {
  const templateFolder = path.join(startPath, "src", "day0");
  const codeFolder = path.join(startPath, `${year}`, "src", `day${day}`);
  await createDirectoryIfItDoesntExist(codeFolder);
  await copyTemplate(
    path.join(templateFolder, "index.ts"),
    path.join(codeFolder, "index.ts")
  );
  await copyTemplate(
    path.join(templateFolder, "day0.spec.ts"),
    path.join(codeFolder, `day${day}.spec.ts`)
  );
}

async function updateIndex() {
  const indexPath = path.join(startPath, "src", "index.ts");
  const contents = (await promises.readFile(indexPath, { encoding: "utf8" }))
    .replace(
      "// MORE IMPORTS HERE",
      `import day${day}_${year} from '../${year}/src/day${day}/index';
// MORE IMPORTS HERE`
    )
    .replace(
      "// MORE DAYS HERE",
      `${year}: { ${day}: day${day}_${year} },
    // MORE DAYS HERE`
    );

  console.log("  Updating index");
  await promises.writeFile(indexPath, contents);
}
