require("module-alias/register");
import { Day } from "../lib/day";
import day0 from "./day0/index";
import day1_2023 from "../2023/src/day1/index";
import day1_2015 from "../2015/src/day1/index";
// MORE IMPORTS HERE

const days: { [year: number]: { [dayId: number]: Day } } = {
  0: { 0: day0 },
  2023: { 1: day1_2023 },
  2015: { 1: day1_2015 },
  // MORE DAYS HERE
};

async function runDay(year: number, dayId: number) {
  const day = days[year][dayId];
  if (!day) {
    console.error(`Day ${dayId} of year ${year} not found`);
    return;
  }

  const resultPart1 = await day.partOne();
  console.log("Part 1 result:\n");
  console.log(resultPart1);

  console.log("\n");

  const resultPart2 = await day.partTwo();
  console.log("Part 2 result:\n");
  console.log(resultPart2);
}

console.log("\n\n\n   ADVENT OF CODE \n\n");
const params = process.argv.splice(2);
if (params.length >= 2) {
  runDay(parseInt(params[0], 10), parseInt(params[1], 10));
} else {
  console.log(`Usage: npm run start [year] [day]`);
  console.log(
    `Available years and days: ${Object.entries(days)
      .map(([year, days]) => `${year}: [${Object.keys(days).join(", ")}]`)
      .join(", ")}`
  );
}
