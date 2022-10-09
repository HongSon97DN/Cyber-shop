let itemService = new PhoneAdminService();
let validation = new Validation();


function getItemList() {
    itemService.getItemList().then((result) => {
        showTable(result.data);
    }).catch((error) => {
        console.log(error);
    });
}
getItemList();

function showTable(arrayItem) {
    let content = "";
    let stt = 1;
    arrayItem.map((item) => {
        content += `
        <tr>
            <td style="font-weight: 500">${stt++}</td>
            <td style="font-weight: 500">${item.name}</td>
            <td style="font-weight: 500">${item.price}$</td>
            <td style="text-align: center;">
                <img style="width: 70px;" src="${item.img}" alt="">
            </td>
            <td>${item.desc}</td>
            <td style="text-align: center;">
                <button onclick="getItemDetail('${item.id}')" class="btn btn-info" data-toggle="modal" data-target="#myModal">
                    Edit
                    <i class="fa-regular fa-pen-to-square"></i>
                </button>
                <button onclick="deleteItem('${item.id}')" class="btn btn-danger">
                    Delete
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `
    });
    document.querySelector("#tblDanhSachSP").innerHTML = content;
}

function handleForm() {
    document.querySelector("#myModal .modal-footer").innerHTML =  `
        <button class="btn btn-primary" onclick="addItem()">Add</button>
        `;
    let formELE = document.querySelectorAll("#myModal .form-control");
    for (let i = 0; i < formELE.length; i++) {
        formELE[i].value = "";      
    }
}
document.querySelector("#btnThemSP").onclick = handleForm;

async function addItem() {
    let name = document.getElementById("TenSP").value;
    let price = document.getElementById("GiaSP").value;
    let screen = document.getElementById("screen").value;
    let backCamera = document.getElementById("cameraSau").value;
    let frontCamera = document.getElementById("cameraTruoc").value;
    let img = document.getElementById("HinhSP").value;
    let desc = document.getElementById("moTaSP").value;
    let type = document.getElementById("type").value;
    
    let isValid = true;
    isValid &= validation.checkEmpty(name,"tbTen","Tên sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(price,"tbGia","Giá sản phẩm không được để trống!") && validation.checkNumber(price,"tbGia","Giá sản phẩm chưa đúng định dạng!");

    isValid &= validation.checkEmpty(screen,"tbHinh","Hình ảnh sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(backCamera,"tbCamSau","Cam sau sản phẩm không được để trống!");
    
    isValid &= validation.checkEmpty(frontCamera,"tbCamTruoc","Cam trước sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(img,"tbManHinh","Hình ảnh sản phẩm không được để trống!");
    
    isValid &= validation.checkEmpty(desc,"tbMoTa","Mô tả sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(type,"tbLoai","Loại sản phẩm không được để trống!");

    if (isValid) {
        let item = new PhoneAdmin(name,price,screen,backCamera,frontCamera,img,desc,type);

        try {
            // xử lý thành công
            let response = await fetch('https://62e7707993938a545bd19492.mockapi.io/PhoneProducts',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            let data = await response.json();
            console.log(data);
            document.querySelector("#myModal .close").click();
            getItemList();
            
        } catch (error) {
            console.log(error);
        }
    }
}

function deleteItem(id) {
    itemService.deleteItem(id).then((result) => {
          Swal.fire({
            position: 'top-center',
            icon: 'success',
            title: 'Delete Completed',
            showConfirmButton: false,
            timer: 2000
          })
          getItemList();
    }).catch((error) => {
        console.log(error);
    });
}

function getItemDetail(id) {
    itemService.getItemDetail(id).then((result) => {
        let item = result.data;
        document.getElementById("TenSP").value = item.name;
        document.getElementById("GiaSP").value = item.price
        document.getElementById("screen").value = item.screen;
        document.getElementById("cameraSau").value = item.backCamera;
        document.getElementById("cameraTruoc").value = item.frontCamera;
        document.getElementById("HinhSP").value = item.img;
        document.getElementById("moTaSP").value = item.desc;
        document.getElementById("type").value = item.type;

        document.querySelector("#myModal .modal-footer").innerHTML = `
            <button onclick="updateItem('${result.data.id}')" class="btn btn-primary">Update</button>
        `
    }).catch((error) => {
        console.log(error);
    });
}

function updateItem(id) {
    let name = document.getElementById("TenSP").value;
    let price = document.getElementById("GiaSP").value;
    let screen = document.getElementById("screen").value;
    let backCamera = document.getElementById("cameraSau").value;
    let frontCamera = document.getElementById("cameraTruoc").value;
    let img = document.getElementById("HinhSP").value;
    let desc = document.getElementById("moTaSP").value;
    let type = document.getElementById("type").value;

    let isValid = true;
    isValid &= validation.checkEmpty(name,"tbTen","Tên sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(price,"tbGia","Giá sản phẩm không được để trống!") && validation.checkNumber(price,"tbGia","Giá sản phẩm chưa đúng định dạng!");

    isValid &= validation.checkEmpty(screen,"tbHinh","Hình ảnh sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(backCamera,"tbCamSau","Cam sau sản phẩm không được để trống!");
    
    isValid &= validation.checkEmpty(frontCamera,"tbCamTruoc","Cam trước sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(img,"tbManHinh","Hình ảnh sản phẩm không được để trống!");
    
    isValid &= validation.checkEmpty(desc,"tbMoTa","Mô tả sản phẩm không được để trống!");

    isValid &= validation.checkEmpty(type,"tbLoai","Loại sản phẩm không được để trống!");
    if (isValid) {
        let itemUpdate = new PhoneAdmin(name,price,screen,backCamera,frontCamera,img,desc,type)

        itemService.updateItem(id,itemUpdate).then((result) => {
            document.querySelector("#myModal .close").click();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Update Success!',
                showConfirmButton: false,
                timer: 2000
              })
            getItemList();
        }).catch((error) => {
            console.log(error);
        });
    }
   
}

function searchItemByName() {
    itemService.getItemList().then((result) => {
        let arrayPhone = result.data;
        let arrraySearch = [];
        
        let keyName = document.getElementById("txtSearch").value;
        arrayPhone.map((item) => {
            let indexSearch = item.name.toLowerCase().indexOf(keyName.toLowerCase());
            if (indexSearch != -1) {
                arrraySearch.push(item)
            }
        })
        showTable(arrraySearch)
    }).catch((error) => {
        console.log(error)
    });
}
document.getElementById("btnSearch").onclick = searchItemByName;
document.getElementById("txtSearch").onkeyup = searchItemByName;
