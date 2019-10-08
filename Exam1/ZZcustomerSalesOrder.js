//Create a module that represents a sales order that has the properties customer, 
//sales tax rate and an array of items.  It should have a function to return the
//value of the items (sum the item price times quantity) and a function 
//that returns total value (sum of the value of the items plus the sales tax).

function CustomerOrder(customer, taxRate) {
    let customerOrder = [];
    customerOrder.customer = customer;
    customerOrder.taxRate = taxRate;
    customerOrder.item = new Array();

    customerOrder.addItem = function(customerOrderItem){
        customerOrder.push(customerOrderItem);
    }

    customerOrder.calcValue = function(){
        let value = 0;
        customerOrder.forEach(item =>{
            value = value + item.calcValue();
        })
        return value;
    }

    customerOrder.totalValue = function(){
        let total = customerOrder.calcValue();
        return total + (total * taxRate);
    }
    return customerOrder;
}
module.exports = CustomerOrder;
