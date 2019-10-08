// Create a module that represents a sales order item.  It should have the properties, product, price and a function to return the value of the item.

function SalesOrderItem(product, price, quantity) {
    let item = {};
    item.product = product;
    item.price = price ? price : [];
    item.quantity = quantity ? quantity : [];

    item.calcValue = function () {
        let price = item.price
        let quantity = item.quantity
        return price * quantity;

    }
    return item;
}
module.exports = SalesOrderItem;