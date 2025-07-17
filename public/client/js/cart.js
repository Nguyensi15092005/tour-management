// Lấy data in ra giao diện 
const drawListTour = () => {
  fetch("http://localhost:3005/cart/list-json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: localStorage.getItem("cart"),
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      const html = data.tours.map((item, index) => {
        return `
        <tr>
          <td>${index + 1}</td>
          <td>
            <img src="${item.image}" width="80px" height="60px"/>
          </td>
          <td>
            <a href="/tours/detail/${item.info.slug}">${item.info.title}</a>
          </td>
          <td>${item.price_special.toLocaleString()}</td>
          <td>
            <input 
              type="number"
              name="quantity"
              value=${item.quantity}
              min="1"
              item-id="${item.tourId}"  
              style="width: 60px;"
            />
          </td>
          <td>${item.total.toLocaleString()}</td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              bnt-delete="${item.tourId}"
            >
              Xóa
            </button>
          </td>
        </tr>   
      `
      })
      const listTour = document.querySelector("[list-tour]");
      listTour.innerHTML = html.join("");
      const total = data.tours.reduce((sum, item) => sum + item.total, 0);
      const totalPrice = document.querySelector("[total-price]");
      totalPrice.innerHTML = total.toLocaleString();
      deleteItemCart();
      updateQuantityCart();
    })
}


// hết Lấy data in ra giao diện


// Xóa tour trong dỏ hàng
const deleteItemCart = () => {
  const listBtnDelete = document.querySelectorAll("[bnt-delete]");
  if (listBtnDelete.length > 0) {
    listBtnDelete.forEach(button => {
      button.addEventListener("click", () => {
        const tourId = button.getAttribute("bnt-delete");

        const cart = JSON.parse(localStorage.getItem("cart"));
        const newCart = cart.filter(item => item.tourId != tourId);
        localStorage.setItem("cart", JSON.stringify(newCart));

        drawListTour();

      })
    })
  }
}
// Hết Xóa tour trong dỏ hàng

// Cập nhật số lương trong dỏ hàng
const updateQuantityCart = () => {
  const listInput = document.querySelectorAll("[list-tour] input[item-id]");
  if (listInput.length > 0) {
    listInput.forEach(input => {
      input.addEventListener("change", () => {
        const tourId = input.getAttribute("item-id");
        const quantity = input.value;

        const cart = JSON.parse(localStorage.getItem("cart"));
        const tourUpdate = cart.find(item => item.tourId == tourId);
        if (tourUpdate) {
          tourUpdate.quantity = parseInt(quantity)
        }
        localStorage.setItem("cart", JSON.stringify(cart))

        drawListTour();

      })
    })
  }
}
// Hết Cập nhật số lương trong dỏ hàng

drawListTour();


// Đặt tour
const formOrder = document.querySelector("[form-order]")
if (formOrder) {
  formOrder.addEventListener("submit", (e) => {
    e.preventDefault();
    const fullName = e.target.elements.fullName.value;
    const phone = e.target.elements.phone.value;
    const note = e.target.elements.note.value;
    const data = {
      info: {
        fullName: fullName,
        phone: phone,
        note: note
      },
      cart: JSON.parse(localStorage.getItem("cart"))
    }
    fetch("http://localhost:3005/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200){
          localStorage.removeItem("cart");
          window.location.href = `/order/success?orderCode=${data.orderCode}`
        }
        else{
          alert("Đặt tour thất bại!")
        }
      })
  })
}
// Hết Đặt tour


