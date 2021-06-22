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
            {id:0, name: 'Steak Dinner', calories:1200},
            {id:1, name: 'Cookie', calories:400},
            {id:2, name: 'Eggs', calories:300}
        ],
        currentItem: null,
        totalCalories: 0
    }



})();

// UI Controller
const UICtrl = (function(){
    


    
})();

// App Controller
const App = (function(ItemCtrl, UICtrl){
    


    
})(ItemCtrl, UICtrl); // since invoked