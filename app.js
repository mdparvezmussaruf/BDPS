document.addEventListener('DOMContentLoaded', function () {
    const transactionForm = document.getElementById('transactionForm');
    const transactionsTable = document.getElementById('transactionsTable');
    const overviewForm = document.getElementById('overviewForm');
    const overviewResult = document.getElementById('overviewResult');

    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    function saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function displayTransactions() {
        if (!transactionsTable) return;

        transactionsTable.innerHTML = "";
        transactions.forEach(t => {
            const row = `<tr>
                <td>${t.buyer}</td>
                <td>$${t.amount.toFixed(2)}</td>
                <td>${t.direction}</td>
                <td>${new Date(t.date).toLocaleDateString()}</td>
            </tr>`;
            transactionsTable.innerHTML += row;
        });
    }

    if (transactionForm) {
        transactionForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const buyer = document.getElementById('buyer').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const direction = document.getElementById('direction').value;

            if (!buyer || isNaN(amount) || amount <= 0) {
                alert("Please enter valid transaction details.");
                return;
            }

            const transaction = { buyer, amount, direction, date: new Date().toISOString() };
            transactions.push(transaction);
            saveTransactions();
            transactionForm.reset();
        });
    }

    if (overviewForm) {
        overviewForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const buyer = document.getElementById('overviewBuyer').value;
            const month = parseInt(document.getElementById('month').value) - 1;
            const year = parseInt(document.getElementById('year').value);

            const filteredTransactions = transactions.filter(t =>
                t.buyer === buyer &&
                new Date(t.date).getMonth() === month &&
                new Date(t.date).getFullYear() === year
            );

            const totalIn = filteredTransactions.filter(t => t.direction === 'in')
                .reduce((sum, t) => sum + t.amount, 0);
            const totalOut = filteredTransactions.filter(t => t.direction === 'out')
                .reduce((sum, t) => sum + t.amount, 0);
            const due = totalIn - totalOut; // Calculate Due

            overviewResult.innerHTML = `
                <p><strong>Total In:</strong> $${totalIn.toFixed(2)}</p>
                <p><strong>Total Out:</strong> $${totalOut.toFixed(2)}</p>
                <p><strong>Due:</strong> $${due.toFixed(2)}</p>
            `;
        });
    }

    displayTransactions();
});
