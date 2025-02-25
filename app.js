document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transactionForm');
    const overviewForm = document.getElementById('overviewForm');
    const overviewResult = document.getElementById('overviewResult');
    
    let transactions = [];

    transactionForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const buyer = document.getElementById('buyer').value;
        const seller = document.getElementById('seller').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const direction = document.getElementById('direction').value;
        
        const transaction = {
            buyer,
            seller,
            amount,
            direction,
            date: new Date()
        };
        
        transactions.push(transaction);
        alert('Transaction added successfully');
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
            t.date.getMonth() === month && 
            t.date.getFullYear() === year
        );
        
        const totalIn = filteredTransactions.filter(t => t.direction === 'in').reduce((sum, t) => sum + t.amount, 0);
        const totalOut = filteredTransactions.filter(t => t.direction === 'out').reduce((sum, t) => sum + t.amount, 0);
        
        overviewResult.innerHTML = `
            <p>Total In: ${totalIn}</p>
            <p>Total Out: ${totalOut}</p>
        `;
    });
});