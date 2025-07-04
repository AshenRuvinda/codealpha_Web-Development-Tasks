function calculateAge() {
    // Get input values
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Clear previous messages
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    // Input validation
    if (!day || !month || !year) {
        errorDiv.innerHTML = 'Please fill in all fields.';
        return;
    }

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2025) {
        errorDiv.innerHTML = 'Please enter valid date values.';
        return;
    }

    // Check for leap year if February 29 is entered
    if (month === 2 && day === 29) {
        const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (!isLeapYear) {
            errorDiv.innerHTML = 'February 29 is only valid in a leap year (e.g., 2020, 2024).';
            return;
        }
    }

    // Create date objects
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);

    // Validate date
    if (birthDate > today) {
        errorDiv.innerHTML = 'Birth date cannot be in the future.';
        return;
    }

    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
        errorDiv.innerHTML = 'Invalid date.';
        return;
    }

    // Calculate age
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    // Adjust for negative months or days
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display result
    resultDiv.innerHTML = `You are ${years} years, ${months} months, and ${days} days old.`;
}