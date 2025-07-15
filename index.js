function addMaterial() {
    const materialsList = document.getElementById('materials-list');
    const newRow = document.createElement('div');
    newRow.className = 'input-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Material name (e.g., Concrete)" class="material-name">
        <input type="number" placeholder="Quantity" class="material-quantity" min="0" step="0.01">
        <input type="number" placeholder="Unit Cost ($)" class="material-cost" min="0" step="0.01">
        <button class="btn btn-danger" onclick="removeMaterial(this)">Remove</button>
    `;
    materialsList.appendChild(newRow);
}

function removeMaterial(button) {
    const materialsList = document.getElementById('materials-list');
    if (materialsList.children.length > 1) {
        button.parentElement.remove();
    }
}

function addLabor() {
    const laborList = document.getElementById('labor-list');
    const newRow = document.createElement('div');
    newRow.className = 'input-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Labor type (e.g., Electrician)" class="labor-type">
        <input type="number" placeholder="Hours" class="labor-hours" min="0" step="0.1">
        <input type="number" placeholder="Rate/Hour ($)" class="labor-rate" min="0" step="0.01">
        <button class="btn btn-danger" onclick="removeLabor(this)">Remove</button>
    `;
    laborList.appendChild(newRow);
}

function removeLabor(button) {
    const laborList = document.getElementById('labor-list');
    if (laborList.children.length > 1) {
        button.parentElement.remove();
    }
}

function calculateCosts() {
    let materialTotal = 0;
    let laborTotal = 0;
    let detailedBreakdown = '';

    // Calculate materials
    const materialRows = document.querySelectorAll('#materials-list .input-row');
    detailedBreakdown += '<h4>Materials:</h4><ul>';
    
    materialRows.forEach(row => {
        const name = row.querySelector('.material-name').value;
        const quantity = parseFloat(row.querySelector('.material-quantity').value) || 0;
        const cost = parseFloat(row.querySelector('.material-cost').value) || 0;
        const total = quantity * cost;
        
        if (name && quantity > 0 && cost > 0) {
            materialTotal += total;
            detailedBreakdown += `<li>${name}: ${quantity} × $${cost.toFixed(2)} = $${total.toFixed(2)}</li>`;
        }
    });
    detailedBreakdown += '</ul>';

    // Calculate labor
    const laborRows = document.querySelectorAll('#labor-list .input-row');
    detailedBreakdown += '<h4>Labor:</h4><ul>';
    
    laborRows.forEach(row => {
        const type = row.querySelector('.labor-type').value;
        const hours = parseFloat(row.querySelector('.labor-hours').value) || 0;
        const rate = parseFloat(row.querySelector('.labor-rate').value) || 0;
        const total = hours * rate;
        
        if (type && hours > 0 && rate > 0) {
            laborTotal += total;
            detailedBreakdown += `<li>${type}: ${hours} hrs × $${rate.toFixed(2)}/hr = $${total.toFixed(2)}</li>`;
        }
    });
    detailedBreakdown += '</ul>';

    // Calculate totals
    const subtotal = materialTotal + laborTotal;
    const overhead = subtotal * 0.1; // 10% overhead
    const totalCost = subtotal + overhead;

    // Display results
    document.getElementById('materials-total').textContent = `$${materialTotal.toFixed(2)}`;
    document.getElementById('labor-total').textContent = `$${laborTotal.toFixed(2)}`;
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('overhead').textContent = `$${overhead.toFixed(2)}`;
    document.getElementById('total-cost').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('detailed-breakdown').innerHTML = detailedBreakdown;
    document.getElementById('cost-results').style.display = 'block';
}

// Add some sample data for demonstration
window.addEventListener('load', function() {
    // Sample material
    const firstMaterialRow = document.querySelector('#materials-list .input-row');
    firstMaterialRow.querySelector('.material-name').value = 'Concrete';
    firstMaterialRow.querySelector('.material-quantity').value = '10';
    firstMaterialRow.querySelector('.material-cost').value = '150';

    // Sample labor
    const firstLaborRow = document.querySelector('#labor-list .input-row');
    firstLaborRow.querySelector('.labor-type').value = 'General Labor';
    firstLaborRow.querySelector('.labor-hours').value = '40';
    firstLaborRow.querySelector('.labor-rate').value = '25';
});