let studentsData = []; // Variable to store the original data

fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
  .then(response => response.json())
  .then(data => {
    studentsData = data; // Store original data
    displayStudents(data); // Display all students initially
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });



function filterTable() {
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    const filteredData = studentsData.filter(student => {
      const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
      return (
        fullName.includes(searchInput) ||
        student.first_name.toLowerCase().includes(searchInput) ||
        student.last_name.toLowerCase().includes(searchInput) ||
        student.email.toLowerCase().includes(searchInput)
      );
    });
    displayStudents(filteredData);
  }
  

function displayStudents(data) {
  const tableBody = document.querySelector('#studentTable tbody');
  tableBody.innerHTML = ''; // Clear existing table rows
  data.forEach((student, index) => {
    const fullName = student.first_name + ' ' + student.last_name;
    const passingStatus = student.passing ? 'Passing' : 'Failed';
    const row = `
      <tr>
        <td>${student.id}</td>
        <td><img src="${student.img_src}" alt="${fullName}" style="vertical-align: bottom;width:30px;height:30px; border-radius:50%;border:1px solid black;"> ${fullName}</td>
        <td>${student.gender}</td>
        <td>${student.marks}</td>
        <td>${student.class}</td>
        <td>${passingStatus}</td>
        <td>${student.email}</td>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  });
}

function sortByName(order) {
  const sortedData = [...studentsData].sort((a, b) => {
    const fullNameA = `${a.first_name} ${a.last_name}`;
    const fullNameB = `${b.first_name} ${b.last_name}`;
    return order === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
  });
  displayStudents(sortedData);
}

function sortByMarks() {
  const sortedData = [...studentsData].sort((a, b) => a.marks - b.marks);
  displayStudents(sortedData);
}

function sortByPassing() {
  const sortedData = [...studentsData].sort((a, b) => {
    // Sort by passing status first
    if (a.passing && !b.passing) {
      return -1; // a comes before b
    } else if (!a.passing && b.passing) {
      return 1; // b comes before a
    } else {
      // If passing status is the same, sort by full name
      const fullNameA = `${a.first_name} ${a.last_name}`;
      const fullNameB = `${b.first_name} ${b.last_name}`;
      return fullNameA.localeCompare(fullNameB);
    }
  });
  displayStudents(sortedData);
}


function sortByClass() {
  const sortedData = [...studentsData].sort((a, b) => a.class-b.class);
  displayStudents(sortedData);
}

function sortByGender() {
  const femaleStudents = studentsData.filter(student => student.gender.toLowerCase() === 'female');
  const maleStudents = studentsData.filter(student => student.gender.toLowerCase() === 'male');
  displayGenderTables(femaleStudents, maleStudents);
}

function displayGenderTables(femaleStudents, maleStudents) {
  const femaleTable = generateGenderTable(femaleStudents, 'Female Students');
  const maleTable = generateGenderTable(maleStudents, 'Male Students');
  document.getElementById('femaleStudentsTable').innerHTML = femaleTable;
  document.getElementById('maleStudentsTable').innerHTML = maleTable;
}

function generateGenderTable(students, title) {
  let tableHTML = `<h2 style="margin-left: 2.5vw;">${title}</h2>`;
  tableHTML += `<table  border="1">
                  <thead>
                    <tr>
                      <th>Serial No.</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th>Marks</th>
                      <th>Class</th>
                      <th>Passing</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>`;
  students.forEach((student, index) => {
    const fullName = student.first_name + ' ' + student.last_name;
    const passingStatus = student.passing ? 'Passing' : 'Failed';
    tableHTML += `
      <tr>
        <td>${student.id}</td>
        <td><img src="${student.img_src}" alt="${fullName}" style="vertical-align: bottom;width:30px;height:30px; border-radius:50%;border:1px solid black;"> ${fullName}</td>
        <td>${student.gender}</td>
        <td>${student.marks}</td>
        <td>${student.class}</td>
        <td>${passingStatus}</td>
        <td>${student.email}</td>
      </tr>`;
  });
  tableHTML += `</tbody></table>`;
  return tableHTML;
}
