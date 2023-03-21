// Validation for Input
function validateForm() {
    // Get references to the form elements
    var nameInput = document.getElementById("name");
    var priceInput = document.getElementById("price");
    var descriptionInput = document.getElementById("description");
    var image = document.getElementById("inputGroupFile01");
  
    // Get the values from the input fields
    var name = nameInput.value.trim();
    var price = priceInput.value.trim();
  
    // Validate name input
    if (name === "") {
  
      document.getElementById("name-error-msg").innerHTML = " Please enter your name";
      // alert("Please enter your name");
      return false;
    }else{
      document.getElementById("name-error-msg").innerHTML = "";
    }
  
    // Validate price input
    if (price === "") {
      document.getElementById("price-error-msg").innerHTML = " Please enter the price";
      // alert("Please enter the price");
      return false;
    }else
    {
      document.getElementById("price-error-msg").innerHTML = "";
    }
  
    if (isNaN(price) || price.startsWith("0")) {
      document.getElementById("price-error-msg").innerHTML = " Please enter a valid price number that does not start with zero";
      // alert("Please enter a valid price number that does not start with zero");
      return false;
    }
    else
    {
      document.getElementById("price-error-msg").innerHTML = "";
    }
  
   
    if (descriptionInput.value.length > 50) {
      document.getElementById("disc-error-msg").innerHTML = " Description can be maximum 50 characters";
      // alert("Description can be maximum 50 characters");
      return false;
    } else if(descriptionInput.value == "" ){
      document.getElementById("disc-error-msg").innerHTML = " Please enter the Discription";
      return false;
    } else
    {
      document.getElementById("disc-error-msg").innerHTML = "";
    }
  
    // Validate image input
    if (image.files.length === 0) {
      document.getElementById("image-error-msg").innerHTML = " Please attach an image";
      // alert("Please attach an image");
      return false;
    }else
    {
      document.getElementById("image-error-msg").innerHTML = ""
    }
  
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(image.files[0].name)) {
      document.getElementById("image-error-msg").innerHTML = " Please attach a valid image file (jpg, jpeg, png, or gif)";
      // alert("Please attach a valid image file (jpg, jpeg, png, or gif)");
      image.value = "";
      return false;
    }else
    {
      document.getElementById("image-error-msg").innerHTML = ""
    }
  
    // Check the file size of the uploaded image
    var fileSize = image.files[0].size / 1024; // in KB
    if (fileSize > 750) {
      document.getElementById("image-error-msg").innerHTML = " Please attach an image that is smaller than 750KB";
      // alert("Please attach an image that is smaller than 750KB");
      image.value = "";
      return false;
    }
    else
    {
      document.getElementById("image-error-msg").innerHTML = "";
    }
    return true;
  }

  function showData() {
    let productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
    let html = "";
    if (productList.length === 0) {
      // Display an image if the productList array is empty
      html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products">
            </div>
          </div>
        </div>
      </div>`;
    } else {
      productList.forEach(function (element, index) {
        // Generate HTML for each product card
        html += 
        `<div>
        <div class='row gx-2'>
        <div class='col'>
        <div class='p-3'>
        <div class='card d-flex card-all'>
        <div class='card-body'style=" height: 11rem; width: 16rem;">
        <h5 class='card-title text-center'><strong>Item No.-</strong> ${element.id} </h5>
        <img src="${element.image}" class="card-img-top" alt='Image' style=" height: 7rem; width: 14rem;">
        </div>
        <ul class='list-group list-group-flush'>
        <li class='list-group-item'><strong>Product -</strong>  ${element.name}  </li>
        <li class='list-group-item h-25'><strong>Description -</strong>  ${element.description}  </li>
        <li class='list-group-item'><strong>Price -</strong>  $${element.price}</li>
        </ul>
        <div class='card-body text-center'>
       
         <button onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2' class='btn btn-success' style="width: 49%">Edit</button>
       
         <button onclick='deleteData("${index}")' type='button' class='btn btn-danger' style="width: 49%">Delete</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`;
      });
    }
    document.querySelector("#curd-table").innerHTML = html;
  }
  
  // Load all data when document or page load
  showData();

  // Function to add Data
function AddData() {
    if (validateForm() == true) {
      let name = document.getElementById("name").value;
      let price = document.getElementById("price").value;
      let description = document.getElementById("description").value;
      let image = document.getElementById("inputGroupFile01");
      const reader = new FileReader();
  
      let productList;
      if (localStorage.getItem("productList") == null) {
        productList = [];
      } else {
        productList = JSON.parse(localStorage.getItem("productList"));
      }
  
      // generate new ID by incrementing the highest existing ID
      let id = 1;
      if (productList.length > 0) {
        let ids = productList.map((product) => product.id);
        id = Math.max(...ids) + 1;
      }
  
      reader.readAsDataURL(image.files[0]);
      reader.addEventListener("load", () => {
        productList.push({
          id: id,
          name: name,
          description: description,
          price: price,
          image: reader.result,
        });
        localStorage.setItem("productList", JSON.stringify(productList));
        location.reload();
        showData();
      });
  
      document.getElementById("name").value = "";
      document.getElementById("price").value = "";
      document.getElementById("description").value = "";
      document.getElementById("inputGroupFile01").value = "";
      document.getElementById("close-btn").click();
      alert("Data Added Successfully");
    }
  }

// Function to Delete Data
function deleteData(index) {
    var productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
  
    // Display a confirmation message to the user
    if (confirm("Are you sure you want to delete this item?")) {
      productList.splice(index, 1);
      localStorage.setItem("productList", JSON.stringify(productList));
      showData();
      location.reload(); // Reload the current page
    }
  }

// Function to update/Edit the data in local storage
function editData(index) {
    var productList;
    if (localStorage.getItem("productList") == null) {
      productList = [];
    } else {
      productList = JSON.parse(localStorage.getItem("productList"));
    }
  
    document.getElementById("id-edit").value = productList[index].id;
    document.getElementById("name-edit").value = productList[index].name;
    document.getElementById("price-edit").value = productList[index].price;
    document.getElementById("description-edit").value = 
      productList[index].description;
  
    var imagePreview = document.getElementById("image-div");
    imagePreview.src = productList[index].image;
    document.getElementById("image-div").innerHTML =
      "<img src=" + productList[index].image + " width='100%' height='100%'>";
  
    var imageEdit = document.getElementById("image-edit");
    imageEdit.onchange = function (event) {
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function () {
        productList[index].image = reader.result;
        imagePreview.src = reader.result;
      };
      reader.readAsDataURL(file);
    };
  
    document.querySelector("#update").onclick = function () {
      productList[index].id = document.getElementById("id-edit").value;
      productList[index].name = document.getElementById("name-edit").value;
      productList[index].price = document.getElementById("price-edit").value;
      productList[index].description =
        document.getElementById("description-edit").value;
  
      localStorage.setItem("productList", JSON.stringify(productList));
      location.reload();
      showData();
      document.getElementById("id-edit").value = "";
      document.getElementById("name-edit").value = "";
      document.getElementById("price-edit").value = "";
      document.getElementById("description-edit").value = "";
      document.getElementById("close-btn").click();
      alert("Data Updated Successfully");
    };
  }

//for Search the data
function searchBar() {
    const searchvalue = document.querySelector("#serachProductText").value;
    console.log(searchvalue);
    let sortedItem = [];
    let sortedProduct = JSON.parse(localStorage.getItem("productList")) ?? [];
    let regex = new RegExp(searchvalue, "i");
    for (let element of sortedProduct) {
      const item = element;
      if (regex.test(item.name)) {
        sortedItem.push(element);
      }
    }
    console.log(sortedItem);
    searchProduct(sortedItem);
  }
  
  function searchProduct(sortedItem) {
    let html = "";
    console.log("searchProduct", sortedItem);
    if (sortedItem.length === 0) {
      // Display an image if the productList array is empty
      html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/search-not-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products" style="width: 18rem; height: 18rem;">
              <p class="text-center">No Similar Items Found..!</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
      sortedItem.forEach(function (element, index) {
        html += 
        `<div>
        <div class='row gx-2'>
        <div class='col'>
        <div class='p-3'>
        <div class='card d-flex card-all'>
        <div class='card-body'style=" height: 11rem; width: 16rem;">
        <h5 class='card-title text-center'><strong>Item No.-</strong> ${element.id} </h5>
        <img src="${element.image}" class="card-img-top" alt='Image' style=" height: 7rem; width: 14rem;">
        </div>
        <ul class='list-group list-group-flush'>
        <li class='list-group-item'><strong>Product -</strong>  ${element.name}  </li>
        <li class='list-group-item h-25'><strong>Description -</strong> ${element.description}  </li>
        <li class='list-group-item'><strong>Price -</strong>  $${element.price}</li>
        </ul>
        <div class='card-body text-center'>
         <button onclick='editData("${index}")' type='button' data-bs-toggle='modal' data-bs-target='#exampleModal-2' class='btn btn-success' style="width: 49%">Edit</button>
         <button onclick='deleteData("${index}")' type='button' class='btn btn-danger' style="width: 49%">Delete</button>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>`;
      });
    }
    document.querySelector("#curd-table").classList.add("d-none");
    document.querySelector("#sort-table").innerHTML = html;
  }