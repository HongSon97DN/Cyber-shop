let productList = [];
let phoneService = new PhoneService();
let arrayPhoneCart = [];
let phoneCart = {};

function listPhoneProduct() {
    phoneService.phonetList().then(function (result) {
        productList.push(result.data);
        showPhoneList(result.data);
    }).catch(function (error) {
        console.log(error);
    });
}
listPhoneProduct();

function showPhoneList(productList) {
    let content = "";
    productList.map((phone) => {
        content += `
            <div class="col card-item">
                <div class="cart-item-overlay">
                    <div class="cart-item-text">
                        <h3 class="pt-5">Specifications</h3>
                        <p class="pt-5">
                            <span>FrontCamera:</span>
                            ${phone.frontCamera}
                        </p>
                        <p>
                            <span>BackCamera:</span>
                            ${phone.backCamera}
                        </p>
                    </div>
                    <button onclick="addProductCart(id)" id="${phone.id}" class="add-to-cart">Add to cart</button>
                </div>
                <div class="card-top text-center">
                    <img class="img-fluid"
                        src="${phone.img}"
                        alt="">
                    <h4 class="pt-3">${phone.name}</h4>
                    <p style="font-weight:500;color:green">${phone.price}$</p>
                </div>
                <div class="card-bottom pt-3">
                    <span class="phone-type">${phone.type}</span>
                    <P class="pt-3">
                        <span class="phone-desc">Description</span>
                        ${phone.desc}
                    </P>
                    <div class="card-desc-bottom">
                        <div class="card-star">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="card-stock">
                            <p>In stock</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector("#product-list").innerHTML = content;
}

function showSearch() {
    let phoneList = [];
    let value = document.getElementById("selectSearch").value;
    productList.filter((phone) => {
        if (value === "samsung") {
            for (let i = 0; i < phone.length; i++) {
                if (phone[i].type === "samsung") {
                    phoneList.push(phone[i]);
                }
            }
            showPhoneList(phoneList);
        } else if (value === "iphone") {
            for (let i = 0; i < phone.length; i++) {
                if (phone[i].type === "iphone") {
                    phoneList.push(phone[i]);
                }
            }
            showPhoneList(phoneList);
        } else {
            for (let i = 0; i < phone.length; i++) {
                if (phone[i].type === "samsung" || phone[i].type === "iphone") {
                    phoneList.push(phone[i]);
                }
            }
            showPhoneList(phoneList);
        }
    })
}   

function addProductCart(id) {
    phoneService.showPhone(id).then((result) => {
        if (arrayPhoneCart.some((item) => item.id === id)) {
            arrayPhoneCart.map((phone) => {
                if (phone.id === id) {
                    phone.quantity += 1;
                }
            })
        } else {
            phoneCart = {...result.data, quantity: 1}
            arrayPhoneCart.push(phoneCart);
        }
        showProductCart(arrayPhoneCart);
        totalQuantity();
        totalMoneyCart();
        return arrayPhoneCart;
    }).catch((error) => {
        console.log(error);
    });
}

function showProductCart() {
    let content = "";
    arrayPhoneCart.map((itemCart) => {
        content += `
        <tr>
            <td style="display: flex; align-items: center;">
            <img style="width: 70px;" src="${itemCart.img}" alt="">
            </td>
            <td> 
                ${itemCart.name}
            </td> 
            <td>
                ${(itemCart.price).toLocaleString()}$
            </td>
            <td>
                <button onclick="changeQuantity(${itemCart.id},(-1))" class="btn btn-danger mr-1">-</button>
                <span id="cart-${itemCart.id}">${itemCart.quantity}</span>
                <button onclick="changeQuantity(${itemCart.id},1)" class="btn btn-success ml-1">+</button>
            </td> 
            <td id="total-${itemCart.id}">
                ${(itemCart.price * itemCart.quantity).toLocaleString()}$
            </td>
            <td>
                <button onclick="removeProductCart(${itemCart.id})" style="width:50px;" type="button" class="btn btn-danger text-center"> 
                    <i class="fa-solid fa-trash"></i>               
                </button>
            </td>
        </tr> 
        `
    });
    document.getElementById("phone-cart").innerHTML = content;
}

function changeQuantity(id,sl) {
    let spFind = arrayPhoneCart.find((itemCart) => {
        return itemCart.id == id;
    });
    if (spFind) {
        spFind.quantity = spFind.quantity + sl;
        if (spFind.quantity < 1) {
            spFind.quantity = spFind.quantity - sl;
        }
    }
    arrayPhoneCart.find((itemCart) => {
        if (spFind.id == itemCart.id) {
            itemCart.quantity = spFind.quantity;
            document.getElementById(`total-${id}`).innerHTML = (itemCart.quantity * itemCart.price).toLocaleString()+ "$";
        }
    })
    document.getElementById(`cart-${id}`).innerHTML = spFind.quantity;
    totalQuantity();
    totalMoneyCart();
}

function removeProductCart(id) {
    let indexDelete = arrayPhoneCart.findIndex((itemCart) => {
        return itemCart.id == id;
    })
    if (indexDelete > -1) {
        arrayPhoneCart.splice(indexDelete, 1);
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Delete Completed',
            showConfirmButton: false,
            timer: 1000
        })
    }
    showProductCart(arrayPhoneCart);
}

function totalQuantity() {
    let totalQty = arrayPhoneCart.reduce((quantity,itemCart) => {
        return quantity += itemCart.quantity;
    }, 0);
    document.getElementById("cart-count").innerHTML = totalQty;
}

function totalMoneyCart() {
    let total = 0;
    arrayPhoneCart.map((phone) => {
        total += phone.quantity * phone.price
    })
    document.getElementById("total-money").innerHTML = total.toLocaleString() + "$";
}

function payment() { 
    if (arrayPhoneCart.length > 0) {
        arrayPhoneCart = [];
        showProductCart(arrayPhoneCart);
        totalMoneyCart(0);
        totalQuantity(0);
        Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Thanks for payment',
            showConfirmButton: false,
            timer: 1500
        })
        
    } else if(arrayPhoneCart.length == "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry, Your cart is empty!',
          })
       
    }  
}