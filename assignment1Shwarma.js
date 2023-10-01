const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    ITEM_SELECTION: Symbol("item_selection"),
    TOPPINGS: Symbol("toppings"),
    DRINKS: Symbol("drinks")
});

module.exports = class ShwarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.selectedItem = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.availableItems = ["wrap", "fries"];
    }

    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.ITEM_SELECTION;
                aReturn.push("Welcome to McDo.");
                aReturn.push("What would you like to order? (wrap or fries)");
                break;
            case OrderState.ITEM_SELECTION:
                if (this.availableItems.includes(sInput.toLowerCase())) {
                    this.stateCur = OrderState.TOPPINGS;
                    this.selectedItem = sInput.toLowerCase();
                    aReturn.push(`You selected ${this.selectedItem}. What toppings would you like?`);
                } else {
                    aReturn.push("Invalid item selection. Please choose wrap or fries.");
                }
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.DRINKS;
                this.sToppings = sInput;
                aReturn.push("Would you like a drink with that? (e.g., coffee)");
                break;
            case OrderState.DRINKS:
                this.isDone(true);
                if (sInput.toLowerCase() !== "no") {
                    this.sDrinks = sInput;
                }
                aReturn.push("Thank you for your order:");
                aReturn.push(`- Item: ${this.selectedItem}`);
                aReturn.push(`- Toppings: ${this.sToppings}`);
                if (this.sDrinks) {
                    aReturn.push(`- Drink: ${this.sDrinks}`);
                }
                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
};
