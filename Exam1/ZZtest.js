const SalesOrderItem = require('./ZZsalesOrderItem');
const CustomerOrder = require('./ZZcustomerSalesOrder');


let myItem1 = new SalesOrderItem('Widget',2.5,10);
let myItem2 = new SalesOrderItem('Gidget',1.0,20);

console.log(myItem1.calcValue());
console.log(myItem2.calcValue());

let myCustomerOrder = new CustomerOrder('A', 0.10);
myCustomerOrder.addItem(myItem1);
myCustomerOrder.addItem(myItem2);

console.log(myCustomerOrder.totalValue())
console.log(myCustomerOrder.calcValue())