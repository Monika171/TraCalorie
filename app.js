// Storage Controller


// Item Controller
const ItemCtrl = (function(){
    // console.log('Item controller');
    // create an item and then add it to the state or datastructure
    // Item Contructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data structure / State
    const data = {
        items: [
            // {id:0, name: 'Steak Dinner', calories:1200},
            // {id:1, name: 'Cookie', calories:400},
            // {id:2, name: 'Eggs', calories:300}
        ],
        currentItem: null,
        totalCalories: 0
    }

    // whatever in 'return' is public
    return {
        getItems: function(){
          return data.items;  
        },
        addItem: function(name, calories){
            let ID;
            // Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item
            newItem = new Item(ID, name, calories);

            // Add to items array
            data.items.push(newItem);

            return newItem;
            // console.log(name, calories)
        },

        getTotalCalories: function(){
            let total = 0;

            // loop through items and add cals
            data.items.forEach(function(item){
                total += item.calories;
            });

            // Set total cal in data structure
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        },

        logData: function() {
            return data;
        }
    }
})();

// UI Controller
const UICtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalCalories: '.total-calories'
    }

    

    // Public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item){
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories}</em>
                <a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a>
            </li>`
            });

            // Insert list items
            // since #item-list could be changed at any time, we do not have to go around this javascript file and change each individual one
            // Therefore, we create a object called 'UISelectors' and any class or id that will be used inside a selector, we put in there.
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function(item){

            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories}</em>
            <a href="#" class="secondary-content"><i class="edit-item fas fa-pencil-alt"></i></a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },

        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },

        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },

        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        },

        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none';
            document.querySelector(UISelectors.deleteBtn).style.display = 'none';
            document.querySelector(UISelectors.backBtn).style.display = 'none';
            document.querySelector(UISelectors.addBtn).style.display = 'inline';
        },

        getSelectors: function() {
            return UISelectors;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
    
    // logs when Application logs
    // console.log(ItemCtrl.logData());
    // but its better to return init (initialiser for the app), anything we need to run right away when the application loads, that is what it will include eg: to make sure 'edit' state is clear like nothing in there

    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // An event to add an item
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemUpdateSubmit);
    }

    // Add item submit
    const itemAddSubmit = function(e){
        // console.log('Add');
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            
            // Add total calories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear fields
            UICtrl.clearInput();
        }
        
        // console.log(input);
        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function(e){

        // since this loaded after the page loaded, we have to use event delegation
        if(e.target.classList.contains('edit-item')) {
            console.log('edit-item');
        }

        e.preventDefault();
    }

    // Public Methods
    return {
        init: function() {       
                // console.log('Initializing App...');

                // Clear edit state / set initial set
                UICtrl.clearEditState();

                // Fetch items from data structure
                const items = ItemCtrl.getItems();

                // Check if any items
                if(items.length === 0){
                    UICtrl.hideList();
                } else {
                    // Populate list with items
                UICtrl.populateItemList(items);
                }

                // Get total calories
                const totalCalories = ItemCtrl.getTotalCalories();
                
                // Add total calories to UI
                UICtrl.showTotalCalories(totalCalories);
                               
                // console.log(items);

                // Load event listeners
                loadEventListeners();
        }
    }
  
})(ItemCtrl, UICtrl); // since invoked

App.init();