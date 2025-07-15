// Lấy data in ra giao diện 
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
          <td>${index +1}</td>
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
    const total= data.tours.reduce((sum, item)=> sum + item.total, 0);
    console.log(total);
    const totalPrice = document.querySelector("[total-price]");
    totalPrice.innerHTML = total.toLocaleString();
  })