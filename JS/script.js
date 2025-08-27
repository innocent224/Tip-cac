let currentTipPercentage = 0;
        
        const billInput = document.getElementById('billAmount');
        const numPeopleInput = document.getElementById('numPeople');
        const customTipInput = document.getElementById('customTip');
        const tipButtons = document.querySelectorAll('.tip-btn:not(.custom)');
        const tipPerPersonElement = document.getElementById('tipPerPerson');
        const totalPerPersonElement = document.getElementById('totalPerPerson');
        const resetBtn = document.getElementById('resetBtn');

        // Tip button functionality
        tipButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tipButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                // Set current tip percentage
                currentTipPercentage = parseInt(this.dataset.tip);
                // Clear custom input
                customTipInput.value = '';
                // Calculate
                calculate();
            });
        });

        // Custom tip input functionality
        customTipInput.addEventListener('input', function() {
            // Remove active class from all preset buttons
            tipButtons.forEach(btn => btn.classList.remove('active'));
            // Set current tip percentage
            currentTipPercentage = parseFloat(this.value) || 0;
            // Calculate
            calculate();
        });

        // Bill and people input functionality
        billInput.addEventListener('input', calculate);
        numPeopleInput.addEventListener('input', calculate);

        // Reset functionality
        resetBtn.addEventListener('click', function() {
            billInput.value = '';
            numPeopleInput.value = '';
            customTipInput.value = '';
            currentTipPercentage = 0;
            
            // Remove active class from all buttons
            tipButtons.forEach(btn => btn.classList.remove('active'));
            
            // Reset display
            tipPerPersonElement.textContent = '$0.00';
            totalPerPersonElement.textContent = '$0.00';
        });

        function calculate() {
            const billAmount = parseFloat(billInput.value) || 0;
            const numPeople = parseInt(numPeopleInput.value) || 1;
            const tipPercentage = currentTipPercentage;

            if (billAmount > 0 && numPeople > 0 && tipPercentage >= 0) {
                const tipAmount = (billAmount * tipPercentage) / 100;
                const totalAmount = billAmount + tipAmount;
                
                const tipPerPerson = tipAmount / numPeople;
                const totalPerPerson = totalAmount / numPeople;

                tipPerPersonElement.textContent = `$${tipPerPerson.toFixed(2)}`;
                totalPerPersonElement.textContent = `$${totalPerPerson.toFixed(2)}`;
            } else {
                tipPerPersonElement.textContent = '$0.00';
                totalPerPersonElement.textContent = '$0.00';
            }
        }