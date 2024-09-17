document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        // The category list remains the same, but the calculation is now done server-side
    };

    const categorySelect = document.getElementById('category');
    for (const category in categories) {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    }

    document.getElementById('calculate').addEventListener('click', async () => {
        const sides = document.getElementById('sides').value;
        const category = document.getElementById('category').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const width = parseFloat(document.getElementById('width').value);
        const height = parseFloat(document.getElementById('height').value);
        const unit = document.getElementById('unit').value;

        const processCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const processes = [];
        processCheckboxes.forEach(checkbox => {
            processes.push({
                name: checkbox.id,
                price: checkbox.getAttribute('data-price')
            });
        });

        // Prepare data for the backend
        const data = {
            sides,
            category,
            quantity,
            width,
            height,
            unit,
            processes
        };

        try {
            // Send the data to the backend for calculation
            const response = await fetch('/calculator/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            // Display the results
            document.getElementById('total-cost').textContent = result.totalCost;
            document.getElementById('sheets-required').textContent = result.sheetsRequired;
            document.getElementById('items-per-sheet').textContent = result.piecesPerSheet;

        } catch (error) {
            console.error('Error:', error);
        }
    });
});
