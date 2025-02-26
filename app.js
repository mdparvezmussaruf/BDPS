document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transactionForm');
    const overviewForm = document.getElementById('overviewForm');
    const transactionsTable = document.getElementById('transactionsTable');
    const overviewResult = document.getElementById('overviewResult');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function displayTransactions() {
        transactionsTable.innerHTML = "";
        transactions.forEach(t => {
            const row = `<tr>
                <td>${t.buyer}</td>
                <td>${t.seller}</td>
                <td>$${t.amount.toFixed(2)}</td>
                <td>${t.direction}</td>
                <td>${new Date(t.date).toLocaleDateString()}</td>
            </tr>`;
            transactionsTable.innerHTML += row;
        });
    }

    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const buyer = document.getElementById('buyer').value;
        const seller = document.getElementById('seller').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const direction = document.getElementById('direction').value;

        if (!buyer || !seller || isNaN(amount) || amount <= 0) {
            alert("Please enter valid transaction details.");
            return;
        }

        const transaction = {
            buyer,
            seller,
            amount,
            direction,
            date: new Date().toISOString()
        };

        transactions.push(transaction);
        saveTransactions();
        displayTransactions();
        transactionForm.reset();
    });

    overviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const buyer = document.getElementById('overviewBuyer').value;
        const seller = document.getElementById('overviewSeller').value;
        const month = parseInt(document.getElementById('month').value) - 1;
        const year = parseInt(document.getElementById('year').value);

        const filteredTransactions = transactions.filter(t => 
            t.buyer === buyer && 
            t.seller === seller && 
            new Date(t.date).getMonth() === month && 
            new Date(t.date).getFullYear() === year
        );

        const totalIn = filteredTransactions.filter(t => t.direction === 'in')
                          .reduce((sum, t) => sum + t.amount, 0);
        const totalOut = filteredTransactions.filter(t => t.direction === 'out')
                           .reduce((sum, t) => sum + t.amount, 0);

        overviewResult.innerHTML = `
            <p><strong>Total In:</strong> $${totalIn.toFixed(2)}</p>
            <p><strong>Total Out:</strong> $${totalOut.toFixed(2)}</p>
        `;
    });

    displayTransactions();
});
