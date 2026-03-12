let studentName = "Arun";
let mark1 = 85;
let mark2 = 90;
let mark3 = 88;

const calculateTotal = (m1, m2, m3) => m1 + m2 + m3;
const calculateAverage = (m1, m2, m3) => calculateTotal(m1, m2, m3) / 3;

let totalMarks = calculateTotal(mark1, mark2, mark3);
let averageMarks = calculateAverage(mark1, mark2, mark3);

console.log(`Student Name: ${studentName}`);
console.log(`Total Marks: ${totalMarks}`);
console.log(`Average Marks: ${averageMarks.toFixed(2)}`);