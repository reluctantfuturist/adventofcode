require("module-alias/register");
import { Day } from "../lib/day";
import day0 from "./day0/index";
import day1_2023 from "../2023/src/day1/index";
import day1_2015 from "../2015/src/day1/index";
import day2_2015 from "../2015/src/day2/index";
import day3_2015 from '../2015/src/day3/index';
import day2_2023 from '../2023/src/day2/index';
import day4_2015 from '../2015/src/day4/index';
import day5_2015 from '../2015/src/day5/index';
import day3_2023 from '../2023/src/day3/index';
import day6_2015 from '../2015/src/day6/index';
import day4_2023 from '../2023/src/day4/index';
import day7_2015 from '../2015/src/day7/index';
import day8_2015 from '../2015/src/day8/index';
import day9_2015 from '../2015/src/day9/index';
import day5_2023 from '../2023/src/day5/index';
// MORE IMPORTS HERE

const days: { [year: number]: { [dayId: number]: Day } } = {
  0: { 0: day0 },
  2023: { 1: day1_2023 , 2: day2_2023 , 3: day3_2023 , 4: day4_2023 , 5: day5_2023 },
  2015: { 1: day1_2015, 2: day2_2015 , 3: day3_2015 , 4: day4_2015 , 5: day5_2015 , 6: day6_2015 , 7: day7_2015 , 8: day8_2015 , 9: day9_2015 },
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
