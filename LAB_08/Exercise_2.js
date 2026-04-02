const student = {
  id: 101,
  name: "Priya",
  department: "CSE",
  marks: 92
};

// Object destructuring to extract properties
const { id, name, department, marks } = student;
console.log(id, name, department, marks);

// Create new object using spread operator with dynamic grade
const grade = marks >= 90 ? "A" : marks >= 80 ? "B" : "C";
const updatedStudent = {
  ...student,
  grade
};

console.log(updatedStudent);
