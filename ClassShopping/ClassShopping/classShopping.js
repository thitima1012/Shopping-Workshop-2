
class WebUser {
  customer = null;
  shoppingCart = null;
  constructor(login_id, password, state) {
    this.login_id = login_id; // กำหนด login_id สำหรับผู้ใช้
    this.password = password; // กำหนด password สำหรับผู้ใช้
    this.state = state; // กำหนดสถานะของผู้ใช้ (NEW, ACTIVE, BLOCKED, BANNED)
  }
  setCustomer(customer){
      this.customer = customer; // กำหนดข้อมูลลูกค้าของผู้ใช้
  }
  setShoppingCart(shoppingCart){
      this.shoppingCart = shoppingCart; // กำหนดตะกร้าสินค้าของผู้ใช้
  }
}

class Customer {
  account = null;
  constructor(id, address, phone, email){
      this.id = id; // กำหนด id ของลูกค้า
      this.address = address; // กำหนดที่อยู่ของลูกค้า
      this.phone = phone; // กำหนดเบอร์โทรศัพท์ของลูกค้า
      this.email = email; // กำหนดอีเมลของลูกค้า
  }
  setAccount(account) {
      this.account = account; // กำหนดบัญชีของลูกค้า
  }
}

class Account{
  shoppingCart = null;
  payments = [];
  orders = [];
  constructor(id, billing_address, is_closed, open, closed){
      this.id = id; // กำหนด id ของบัญชี
      this.billing_address = billing_address; // กำหนดที่อยู่สำหรับการเรียกเก็บเงิน
      this.is_closed = is_closed; // กำหนดสถานะของบัญชี (ปิด/เปิด)
      this.open = open; // กำหนดวันที่เปิดบัญชี
      this.closed = closed; // กำหนดวันที่ปิดบัญชี
  }
  setShoppingCart(shoppingCart){
      this.shoppingCart = shoppingCart; // กำหนดตะกร้าสินค้าของบัญชี
  }
  addPayment(payment){
      this.payments.push(payment); // เพิ่มข้อมูลการชำระเงินลงในบัญชี
  }
  addOrder(order){
      this.orders.push(order); // เพิ่มข้อมูลคำสั่งซื้อลงในบัญชี
  }
  printOrderDetail(){
      let total = 0;
      for (let i = 0; i < this.orders.length; i++) {
          console.log("คำสั่งซื้อที่ : " + (i + 1));
          this.orders[i].printDetail(); // แสดงรายละเอียดของคำสั่งซื้อ
          total += this.orders[i].total;
      }
      console.log("รวมทั้งหมด : " + total + " บาท"); // แสดงรวมราคาทั้งหมดของคำสั่งซื้อ
      console.log("------------------------------------------");
      console.log("มีสินค้าในตะกร้าทั้งหมด : " + this.shoppingCart.lineItems.length + " รายการ"); // แสดงจำนวนสินค้าในตะกร้า
  }
}

class Order{
  payment = null;
  lineItems = [];
  total = 0;
  shipped = "";
  constructor(number, ordered, status, ship_to){
      this.number = number; // กำหนดเลขที่คำสั่งซื้อ
      this.ordered = ordered; // กำหนดวันที่สั่งซื้อ
      this.status = status; // กำหนดสถานะของคำสั่งซื้อ
      this.ship_to = ship_to; // กำหนดสถานที่จัดส่ง
  }
  addLineItem(lineItem) {
      this.lineItems.push(lineItem); // เพิ่มรายการสินค้าในคำสั่งซื้อ
  }
  setPayment(payment){
      this.payment = payment; // กำหนดข้อมูลการชำระเงินของคำสั่งซื้อ
  }
  setTotal() {
      let total = 0;
      for (let i = 0; i < this.lineItems.length; i++) {
        total += this.lineItems[i].quantity * this.lineItems[i].price; // คำนวณราคารวมของคำสั่งซื้อ
      }
      this.total = total;
  }
  setShippedDate(date){
      this.shipped = date; // กำหนดวันที่จัดส่งของคำสั่งซื้อ
  }
  printDetail() {
      for (let i = 0; i < this.lineItems.length; i++) {
              console.log("รายการที่ " + (i + 1) + " " + this.lineItems[i].getDetail()); // แสดงรายละเอียดของรายการสินค้าในคำสั่งซื้อ
      }
      this.setTotal();
      console.log("ราคารวม : " + this.total + " บาท"); // แสดงราคารวมของคำสั่งซื้อ
      console.log("ชำระวันที่ : " + this.payment.paid + " เป็นจำนวนเงิน : " + this.payment.total + " บาท"); // แสดงข้อมูลการชำระเงินของคำสั่งซื้อ
  }
}

class ShoppingCart{
  lineItems = [];
  constructor(created){
      this.created = created; // กำหนดวันที่สร้างตะกร้าสินค้า
  }
  addLineItem(lineItem) {
      this.lineItems.push(lineItem); // เพิ่มรายการสินค้าในตะกร้า
  }
  calcTotal() {
      let total = 0;
      for (let i = 0; i < this.lineItems.length; i++) {
        total += this.lineItems[i].quantity * this.lineItems[i].price; // คำนวณราคารวมของตะกร้าสินค้า
      }
      return total;
  }
  printShoppingCart() {
      for (let i = 0; i < this.lineItems.length; i++) {
        console.log("รายการที่ " + (i + 1) + " " + this.lineItems[i].getDetail()); // แสดงรายละเอียดของรายการสินค้าในตะกร้า
      }
      console.log("ราคารวมสินค้าในตระกร้าทั้งหมด : " + this.calcTotal() + " บาท"); // แสดงราคารวมของสินค้าในตะกร้า
  }
}

class LineItem{
  product = null;
  constructor(quantity, price){
      this.quantity = quantity; // กำหนดจำนวนและราคาของรายการสินค้า
      this.price = price;
  }
  setProduct(product){
      this.product = product; // กำหนดสินค้าในรายการ
  }
  calcSubTotal() {
      return this.quantity * this.price; // คำนวณราคารวมของรายการสินค้า
  }
  getDetail() {
      return (
        this.product.name +
        " จำนวน " +
        this.quantity +
        " รายการ " +
        " ราคา " +
        this.calcSubTotal() +
        " บาท"
      ); // แสดงรายละเอียดของรายการสินค้า
  }
}

class Product{
  constructor(id, name, supplier){
      this.id = id; // กำหนด id, ชื่อ, และผู้ผลิตของสินค้า
      this.name = name;
      this.supplier = supplier;
  }
}

class Payment{
  constructor(id, paid, total, details){
      this.id = id; // กำหนด id ของการชำระเงิน
      this.paid = paid; // กำหนดวันที่ชำระเงิน
      this.total = total; // กำหนดจำนวนเงินที่ชำระ
      this.details = details; // กำหนดรายละเอียดเพิ่มเติมของการชำระเงิน
  }
}

//Enumeration (enum)
class UserState{
  static NEW = new UserState("new");
  static ACTIVE = new UserState("active");
  static BLOCKED = new UserState("block");
  static BANNED = new UserState("banned");
  constructor(name){
      this.name = name; // กำหนดชื่อสถานะของผู้ใช้
  }
}

class OrderStatus{
  static NEW = new OrderStatus("new");
  static HOLD = new OrderStatus("hold");
  static SHIPPED = new OrderStatus("shipped");
  static DELIVERED = new OrderStatus("delivered");
  static CLOSED = new OrderStatus("closed");
  constructor(name){
      this.name = name; // กำหนดชื่อสถานะของคำสั่งซื้อ
  }
}

const main = () => {
  // สร้างผู้ใช้
  const user1 = new WebUser("user1", "123456", UserState.NEW);
  const user2 = new WebUser("user2", "123456", UserState.ACTIVE);

  // สร้างบัญชีผู้ใช้
  const account1 = new Account("Min", "ABCD", false, "05/01/2567", "");

  // สร้างสินค้า
  const Product1 = new Product("1", "ปากกา", "Jaruwan");
  const Product2 = new Product("2", "ดินสอ", "Arthitaya");
  const Product3 = new Product("3", "ยางลบ", "Supanee");
  const Product4 = new Product("4", "ไม้บรรทัด", "Mintra");
  const Product5 = new Product("5", "กล่องดินสอ", "Pimpakarn");

  // สร้างคำสั่งซื้อ
  const order1 = new Order("01", "09/01/2567", "NEWYORK", OrderStatus.CLOSED);
  const order2 = new Order("02", "10/01/2567", "LONDON", OrderStatus.CLOSED);

  // สร้างรายการสินค้า
  const lineItem1 = new LineItem(2, 10);
  const lineItem2 = new LineItem(3, 30);
  const lineItem3 = new LineItem(1, 10);
  const lineItem4 = new LineItem(2, 20);
  const lineItem5 = new LineItem(2, 20);

  // เพิ่มสินค้าในรายการสั่งซื้อ
  lineItem1.setProduct(Product1);
  lineItem2.setProduct(Product2);
  lineItem3.setProduct(Product3);
  lineItem4.setProduct(Product4);
  lineItem5.setProduct(Product5);

  // เพิ่มรายการสินค้าในออเดอร์
  order1.addLineItem(lineItem1);
  order1.addLineItem(lineItem5);
  order1.addLineItem(lineItem2);
  order2.addLineItem(lineItem3);
  order2.addLineItem(lineItem4);

  // กำหนดราคารวมของคำสั่งซื้อ
  order1.setTotal();
  order2.setTotal();

  // กำหนดวันที่จัดส่งของคำสั่ง
  order1.setShippedDate("13/01/2567");

  // สร้างรายการชำระเงิน
  const payment1 = new Payment("p01", "22/01/2567", order1.total, "ส่งที่หอ");
  const payment2 = new Payment("p02", "22/01/2567", order2.total, "ส่งที่หอ");

  // เพิ่มคำสั่งซื้อในบัญชีผู้ใช้
  account1.addOrder(order1);
  account1.addOrder(order2);

  // กำหนดการชำระเงินในคำสั่งซื้อ
  order1.setPayment(payment1);
  order2.setPayment(payment2);

  // สร้างตะกร้าสินค้า
  const shoppingCart1 = new ShoppingCart("20/02/2567");
  shoppingCart1.addLineItem(lineItem1);
  shoppingCart1.addLineItem(lineItem2);

  // กำหนดตะกร้าสินค้าให้กับบัญชีผู้ใช้
  account1.setShoppingCart(shoppingCart1);

  // แสดงข้อมูลผู้ใช้
  console.log("ชื่อ : " + account1.id);
  console.log("จำนวนคำสั่งซื้อ : " + account1.orders.length);

  // แสดงรายละเอียดของคำสั่งซื้อและสินค้าในตะกร้า
  account1.printOrderDetail();
  account1.shoppingCart.printShoppingCart();
  console.log("------------------------------------------");
}

main();