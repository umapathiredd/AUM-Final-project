var $ = function (id) {
    return document.getElementById(id);
};

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gpaForm');
    const avgGPAInput = document.getElementById('avgGPA');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Initialize arrays to store entered courses' credits and grades
        const credits = [];
        const grades = [];

        // Loop through courses 1 to 5
        for (let i = 1; i <= 5; i++) {
            const creditInput = $('course' + i + 'Credit');
            const gradeInput = $('course' + i + 'Grade');

            // Check if both credit and grade are entered for the course
            if (creditInput.value.trim() !== "" && gradeInput.value.trim() !== "") {
                credits.push(parseFloat(creditInput.value));
                grades.push(getGradeValue(gradeInput.value));
            }
        }

        // Check if at least 3 courses are entered
        if (credits.length < 3 || grades.length < 3) {
            alert('Please enter valid values for at least three courses.');
            return;
        }

        // Calculate GPA
        const totalCredits = credits.reduce((acc, val) => acc + val, 0);
        const weightedGPA = credits.reduce((acc, val, index) => acc + val * grades[index], 0);
        const averageGPA = weightedGPA / totalCredits;

        // Display result in the average GPA box
        avgGPAInput.value = averageGPA.toFixed(2);
    });

    form.addEventListener('reset', function () {
        // Clear the result and any previous error messages
        avgGPAInput.value = '';
    });

    function getGradeValue(grade) {
        // Convert letter grade to GPA value
        switch (grade.toUpperCase()) {
            case 'A':
                return 4.0;
            case 'B':
                return 3.0;
            case 'C':
                return 2.0;
            case 'D':
                return 1.0;
            case 'F':
                return 0.0;
            default:
                return NaN; // Invalid grade
        }
    }
});
