const SUBJECTS = [
    { name: 'PATHFIT 3', units: 2 },
    { name: 'CC-103', units: 3 },
    { name: 'IT-PF01', units: 3 },
    { name: 'IT-WS02', units: 3 },
    { name: 'IT-MS01', units: 3 },
    { name: 'ART APP', units: 3 },
    { name: 'ETHICS', units: 3 },
    { name: 'FIL 3', units: 3 }
];

const GRADES = [
    1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00
];

const subjectsContainer = document.getElementById('subjects');
const gwaDisplay = document.getElementById('gwa');
const weightedSumDisplay = document.getElementById('weightedSum');

const formatNumber = (number) => number.toFixed(2);

const createGradeOptions = () => {
    const defaultOption = '<option value="">Select Grade</option>';
    const gradeOptions = GRADES.map(grade => 
        `<option value="${grade}">${formatNumber(grade)}</option>`
    ).join('');
    return defaultOption + gradeOptions;
};

const createSubjectRow = (subject) => {
    const row = document.createElement('div');
    row.className = 'grid grid-cols-6 gap-4 items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-150';

    const label = document.createElement('div');
    label.className = 'col-span-3 font-medium text-gray-700';
    label.textContent = subject.name;

    const units = document.createElement('div');
    units.className = 'text-center text-gray-600 font-medium';
    units.textContent = subject.units;

    const selectContainer = document.createElement('div');
    selectContainer.className = 'col-span-2';

    const select = document.createElement('select');
    select.className = 'w-full p-2 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition-all duration-150';
    select.innerHTML = createGradeOptions();
    select.addEventListener('change', calculateGWA);

    selectContainer.appendChild(select);
    row.appendChild(label);
    row.appendChild(units);
    row.appendChild(selectContainer);
    return row;
};

const calculateGWA = () => {
    const selects = document.querySelectorAll('select');
    let weightedSum = 0;
    let selectedSubjectsCount = 0;

    selects.forEach((select, index) => {
        if (select.value) {
            const grade = parseFloat(select.value);
            const units = SUBJECTS[index].units;
            weightedSum += grade * units;
            selectedSubjectsCount++;
        }
    });

    const totalUnits = 23;
    const gwa = selectedSubjectsCount === SUBJECTS.length 
        ? weightedSum / totalUnits 
        : 0;

    updateDisplay(gwa, weightedSum);
};

const updateDisplay = (gwa, weightedSum) => {
    gwaDisplay.textContent = formatNumber(gwa);
    weightedSumDisplay.textContent = formatNumber(weightedSum);
};

const initializeCalculator = () => {
    SUBJECTS.forEach(subject => {
        const subjectRow = createSubjectRow(subject);
        subjectsContainer.appendChild(subjectRow);
    });
};

document.addEventListener('DOMContentLoaded', initializeCalculator);