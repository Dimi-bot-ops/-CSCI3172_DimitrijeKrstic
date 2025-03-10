document.addEventListener("DOMContentLoaded", () => {
    let inventory = [
        { name: "Sword", type: "Weapon", price: 10.00, quantity: 5 },
        { name: "Pike", type: "Weapon", price: 20.00, quantity: 3 },
        { name: "Javelin", type: "Weapon", price: 15.00, quantity: 7 },
        { name: "Potion", type: "Healing", price: 25.00, quantity: 10 },
        { name: "Bandage", type: "Healing", price: 30.00, quantity: 2 },
        { name: "Necklase", type: "Luxury", price: 5.00, quantity: 12 },
        { name: "Diamond", type: "Luxury", price: 35.00, quantity: 8 },
        { name: "Map", type: "Navigation", price: 40.00, quantity: 1 },
        { name: "Compass", type: "Navigation", price: 50.00, quantity: 4 },
        { name: "Focus", type: "Amulet", price: 60.00, quantity: 6 }
    ];

    const output = document.getElementById("output");
    const itemSelect = document.getElementById("item-select");

    function updateDropdown() {
        itemSelect.innerHTML = "";
        inventory.forEach((item, index) => {
            let option = document.createElement("option");
            option.value = index;
            option.textContent = item.name;
            itemSelect.appendChild(option);
        });
    }

    window.addItem = function () {
        const name = document.getElementById("item-name").value.trim();
        const type = document.getElementById("item-type").value.trim();
        const price = parseFloat(document.getElementById("item-price").value);
        const quantity = parseInt(document.getElementById("item-quantity").value);

        if (!name || !type || isNaN(price) || isNaN(quantity) || price < 0 || quantity < 0) {
            output.textContent = "Please enter valid item details.";
            return;
        }

      
        const existingItemIndex = inventory.findIndex(item => item.name === name && item.type === type);
        
        if (existingItemIndex !== -1) {
            
            inventory[existingItemIndex].quantity += quantity;
            output.textContent = `${name} quantity increased by ${quantity}.`;
        } else {
           
            inventory.push({ name, type, price, quantity });
            output.textContent = `${name} added to inventory.`;
        }

        updateDropdown();
    }

    window.showInventory = function () {
        if (inventory.length === 0) {
            output.textContent = "Inventory is empty.";
            return;
        }
        output.textContent = JSON.stringify(inventory, null, 2);
    }

    window.removeItem = function () {
        const selectedIndex = itemSelect.value;
        if (selectedIndex === "") {
            output.textContent = "Please select an item to remove.";
            return;
        }
        const removedItem = inventory.splice(selectedIndex, 1);
        updateDropdown();
        output.textContent = `${removedItem[0].name} removed from inventory.`;
    }

    window.checkItem = function () {
        const selectedIndex = itemSelect.value;
        if (selectedIndex === "") {
            output.textContent = "Please select an item to check.";
            return;
        }
        const item = inventory[selectedIndex];
        output.textContent = `Name: ${item.name}, Type: ${item.type}, Price: ${item.price}, Quantity: ${item.quantity}`;
    }

    window.listInventory = function () {
        if (inventory.length === 0) {
            output.textContent = "Inventory is empty.";
            return;
        }
        output.textContent = inventory.map(item => `${item.name} (${item.quantity})`).join(", ");
    }

    window.calculateTotal = function () {
        const totalValue = inventory.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        output.textContent = `Total Inventory Value: $${totalValue.toFixed(2)}`;
    }

    window.searchItem = function () {
        const query = document.getElementById("search-query").value.trim().toLowerCase();
        if (!query) {
            output.textContent = "Please enter a search term.";
            return;
        }
        const foundItems = inventory.filter(item => item.name.toLowerCase().includes(query));
        if (foundItems.length === 0) {
            output.textContent = "No matching items found.";
        } else {
            output.textContent = foundItems.map(item => `${item.name} - ${item.quantity} available`).join(", ");
        }
    }

    updateDropdown();
});
