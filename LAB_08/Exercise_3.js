class Course {
  constructor(courseName, instructor) {
    this.courseName = courseName;
    this.instructor = instructor;
  }
  
  displayCourse() {
    console.log(`Course: ${this.courseName}, Instructor: ${this.instructor}`);
  }
}

let course1 = new Course("Web Technologies", "Dr. Kumar");
course1.displayCourse();

let enrollCourse = new Promise((resolve, reject) => {
  let seatsAvailable = true;  // Simulate seat availability
  if (seatsAvailable) {
    resolve("Enrollment Successful");
  } else {
    reject("Course Full");
  }
});

enrollCourse
  .then(msg => console.log(msg))
  .catch(err => console.log(err));

