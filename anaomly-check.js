(function () {
    // Function to check anomalies in the form
    function checkAnomaly(event) {
        event.preventDefault(); // Prevent form submission
        const fields = event.target.elements;
        let isValid = true;

        for (let field of fields) {
            const type = field.getAttribute('data-type');
            if (type) {
                const value = field.value;
                switch (type) {
                    case 'text':
                        if (value.length > field.getAttribute('data-maxlength')) {
                            alert(`Text too long for ${field.id}`);
                            isValid = false;
                        }
                        break;
                    case 'number':
                        const min = parseFloat(field.getAttribute('data-min'));
                        const max = parseFloat(field.getAttribute('data-max'));
                        if (value < min || value > max) {
                            alert(`${field.id} must be between ${min} and ${max}`);
                            isValid = false;
                        }
                        break;
                    case 'email':
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            alert(`Invalid email format for ${field.id}`);
                            isValid = false;
                        }
                        break;
                    case 'ipv4':
                        const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                        if (!ipv4Regex.test(value)) {
                            alert(`Invalid IPv4 format for ${field.id}`);
                            isValid = false;
                        }
                        break;
                    default:
                        break;
                }
            }
        }

        if (isValid) {
            alert("Form is valid and ready for submission!");
            // event.target.submit(); // Uncomment this line to submit the form
        }
    }

    // Attach checkAnomaly function to all forms with the 'checkanomaly' attribute
    document.addEventListener('DOMContentLoaded', function () {
        const forms = document.querySelectorAll('form[checkanomaly]');
        forms.forEach(form => {
            form.addEventListener('submit', checkAnomaly);
        });
    });
})();
