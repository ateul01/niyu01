document.getElementById('update-prices').addEventListener('click', async () => {
    const updatedPrices = {
        "170 gsm": {
            "single": parseFloat(document.getElementById('170gsm-single').value),
            "double": parseFloat(document.getElementById('170gsm-double').value)
        },
        // Add more price categories as needed
    };

    try {
        const response = await fetch('/admin/update-prices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPrices)
        });

        const result = await response.json();
        alert(result.message);

    } catch (error) {
        console.error('Error:', error);
    }
});
