/**
 * @projectName - CRUD Operation in LocalStorage
 * 
 * @description - CRUD operation in LocalStorage with search and sort functionality is a JavaScript program 
 *                that allows users to create, read, update, and delete items from a productList stored in 
 *                LocalStorage. It also includes search and sort functionality to easily find and organize 
 *                products. Users can add, edit, and delete product details, including name, price, description, 
 *                and image. The program generates an HTML code for each product card and displays them on the 
 *                webpage. This program provides an efficient way to manage and manipulate data in LocalStorage.
 * 
 * @devloper - samarth dadhaniya
 * 
 * @github - https://github.com/samarthdadhaniya/CRUD-Operation-in-LocalStorage
 */

/** 
 * @function validateForm
 *  
 * @description Function validates form input for name, price, description, 
 *              and image attachment, returning true if valid and false 
 *              with error message if not.
 * 
 * @param none
*/
function validateForm() {
    // Get references to the form elements
    let nameInput = document.getElementById("name");
    let priceInput = document.getElementById("price");
    let descriptionInput = document.getElementById("description");
    let image = document.getElementById("inputGroupFile01");

    // Get the values from the input fields and remove extra white spaces.
    let name = nameInput.value.trim();
    let price = priceInput.value.trim();

    // Validate name input
    if (name === "") {
        document.getElementById("name-error-msg").innerHTML = " Please enter your name";
        return false;
    } else {
        document.getElementById("name-error-msg").innerHTML = "";
    }

    // Validate price input
    if (price === "") {
        document.getElementById("price-error-msg").innerHTML = " Please enter the price";
        return false;
    } else {
        document.getElementById("price-error-msg").innerHTML = "";
    }

    if (isNaN(price) || price.startsWith("0")) {
        document.getElementById("price-error-msg").innerHTML = " Please enter a valid price number that not start with zero";
        return false;
    }
    else {
        document.getElementById("price-error-msg").innerHTML = "";
    }


    // Validate description input
    if (descriptionInput.value.length > 50) {
        document.getElementById("disc-error-msg").innerHTML = " Description can be maximum 50 characters";
        return false;
    } else if (descriptionInput.value == "") {
        document.getElementById("disc-error-msg").innerHTML = " Please enter the Discription";
        return false;
    } else {
        document.getElementById("disc-error-msg").innerHTML = "";
    }

    // Validate image input
    if (image.files.length === 0) {
        document.getElementById("image-error-msg").innerHTML = " Please attach an image";
        return false;
    } else {
        document.getElementById("image-error-msg").innerHTML = ""
    }

    // regular expression for image format
    let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if (!allowedExtensions.exec(image.files[0].name)) {
        document.getElementById("image-error-msg").innerHTML = " Please attach a valid image file (jpg, jpeg, png, or gif)";
        image.value = "";
        return false;
    } else {
        document.getElementById("image-error-msg").innerHTML = ""
    }

    // Check the file size of the uploaded image
    let fileSize = image.files[0].size / 1024; // in KB
    if (fileSize > 750) {
        document.getElementById("image-error-msg").innerHTML = " Please attach an image that is smaller than 750KB";
        image.value = "";
        return false;
    }
    else {
        document.getElementById("image-error-msg").innerHTML = "";
    }
    return true;
}

/**
 * @function showData
 * 
 * @description The function is retrieves the productList from localStorage, 
 *              generates HTML code for each product card, and displays them 
 *              on the webpage. It also handles empty productList and provides 
 *              options to edit and delete each product.
 * 
 * @param none
 */
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

/**
 * @function AddData
 * 
 * @description The function is adds a new product to the localStorage using 
 *              form data, generates a new ID, and reloads the page to display 
 *              the updated data. It also clears the form and displays an alert message.
 * 
 * @param none
 */
function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let price = document.getElementById("price").value;
        let description = document.getElementById("description").value;
        let image = document.getElementById("inputGroupFile01");
        let reader = new FileReader();

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

        /**
         * @function anonymous-Function (Arrow Function)
         * 
         * @description The function reads the data URL of an image file, and 
         *              adds product details to the productList and stores it 
         *              in localStorage.
         * 
         * @param none
         */
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

/**
 * @function deleteData
 * 
 * @description This function deletes an item from an array called 'productList' 
 *              and updates local storage. It also displays a confirmation message 
 *              to the user before deleting the item.
 * 
 * @param index
 */
function deleteData(index) {
    let productList;
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

/**
 * @function editData
 * 
 * @description -This function edits the details of a product at a specific index. It 
 *               reads the data from local storage and updates the HTML elements with 
 *               the corresponding values. It also adds event handlers for an image and 
 *               a button to update the data.
 * 
 * @param index
 */
function editData(index) {
    let productList;
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

    let imagePreview = document.getElementById("image-div");
    imagePreview.src = productList[index].image;
    document.getElementById("image-div").innerHTML =
        "<img src=" + productList[index].image + " width='100%' height='100%'>";

    /**
     * @function anonymous-Function (Arrow Function)
     * 
     * @description this function is used When the user selects an image file using the file dialog 
     *              input element, the function reads the contents of the selected file and updates 
     *              the image property of a iten object at a specific index in an array called productList.
     * 
     * @param event
     */
    let imageEdit = document.getElementById("image-edit");
    imageEdit.onchange = function (event) {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.onload = function () {
            productList[index].image = reader.result;
            imagePreview.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    /**
     * @function anonymous-Function (Arrow Function)
     * 
     * @description The code defines an event handler function for the onclick event of an 
     *              HTML element with an id of "update". When the user clicks on this element, 
     *              the function performs a series of actions related to updating a item's details,
     *              and store updated details into localstorage.
     * 
     * @param none
     */
    document.querySelector("#update").onclick = function () {
        productList[index].id = document.getElementById("id-edit").value;
        productList[index].name = document.getElementById("name-edit").value;
        productList[index].price = document.getElementById("price-edit").value;
        productList[index].description = document.getElementById("description-edit").value;
        // this line is used to convert the array to a JSON string before it is saved to local storage.
        localStorage.setItem("productList", JSON.stringify(productList));
        // The is method, which refreshes the page with the updated data.
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

/**
 * @function searchBar
 * 
 * @description This function is designed to search for products in a Arraylist 
 *              based on user input. It first gets the search value from an input 
 *              field with an id of "searchProductText". It then give an array of 
 *              item from the local storage using the key "productList".
 * 
 * @param none
 */
function searchBar() {
    let searchvalue = document.querySelector("#serachProductText").value;
    console.log(searchvalue);
    let sortedItem = [];
    let sortedProduct = JSON.parse(localStorage.getItem("productList")) ?? [];
    let regex = new RegExp(searchvalue, "i");
    for (let element of sortedProduct) {
        let item = element;
        if (regex.test(item.name)) {
            sortedItem.push(element);
        }
    }
    console.log(sortedItem);
    searchProduct(sortedItem);
}

/**
 * @function searchProduct
 * 
 * @description This function is generates HTML code to display search 
 *              results for items. If there are no results, it displays an 
 *              image and a error message. Otherwise, it generates a card 
 *              for each product that matches the search query,
 * 
 * @param sortedItem (a array format)
*/
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

/**
 * @function anonymous-Function (Arrow Function)
 * 
 * @description When the user selects an option from the dropdown menu of
 *              sorting, the value of the selected option is stored in the sortBy variable. 
 *              Then, the filterProduct function is called with sortBy as its 
 *              argument to perform the sorting action based on the selected value.
 * 
 * @param change (it take any event as a parameter)
 */
let selectElem = document.querySelector("#sort-select");
selectElem.addEventListener("change", (event) => {
    let sortBy = event.target.value;
    filterProduct(sortBy); // perform the sorting action based on the selected value
    if (sortBy == "refresh-btn") {
        location.reload(); // refresh the page
    }
});

/** 
 * @function filterProduct
 * 
 * @description Overall, this function seems to be designed to sort an array of 
 *              products based on different criteria like (with name, id, price) 
 *              and return the sorted data. 
 * 
 * @param sortvalue
*/
function filterProduct(sortvalue) {
    let sortedProduct = JSON.parse(localStorage.getItem("sortedProduct")) ?? [];
    let productList = JSON.parse(localStorage.getItem("productList")) ?? [];
    sortedProduct = productList;
    localStorage.setItem("sortedProduct", JSON.stringify(sortedProduct));

    /**
     * @description This code block is a conditional statement that checks 
     *              the value of the sortvalue parameter to determine the 
     *              sorting criteria to be used for the product list.
     */
    if (sortvalue == "desc") {
        let desc = true;
        sortedProduct = sortedProduct.sort((a, b) =>
            desc ? b.id - a.id : a.id - b.id
        );
        desc = !desc;
        console.log("descending", sortedProduct);
        return filteredData(sortedProduct);
    }
    else if (sortvalue == "asc") {
        let desc = false;
        sortedProduct = sortedProduct.sort((a, b) =>
            desc ? b.id - a.id : a.id - b.id
        );
        console.log("Asc", sortedProduct);
        return filteredData(sortedProduct);
    } else if (sortvalue == "name") {
        sortedProduct = sortedProduct = sortedProduct.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        console.log("name", sortedProduct);
        return filteredData(sortedProduct);
    } else if (sortvalue == "price") {
        sortedProduct = sortedProduct.sort((a, b) => b.price - a.price);
        console.log("Price", sortedProduct);
        return filteredData(sortedProduct);
    } else {
        return false;
    }
}

/**
 * @function filteredData
 * 
 * @description This is a function is takes array as a parameter. The function 
 *              generates HTML code to display the sorted products in a card format.
 * 
 * @param sortedProduct (as a Array format)
 */
function filteredData(sortedProduct) {
    let html = "";
    console.log("filterData", sortedProduct);
    if (sortedProduct.length === 0) {
        // This Below HTML Code Display when product list's array is Empty.
        html += `<div class="card-body">
        <div class="row gx-2">
          <div class="col">
            <div class="p-3">
              <img src="img/no-data-found.png" class="img-fluid rounded mx-auto d-block" alt="No Products">
              <p class="text-center">No products to display</p>
            </div>
          </div>
        </div>
      </div>`;
    } else {
        sortedProduct.forEach(function (element, index) {
            // This Below HTML code is generate Card For Sorted Items.
            html += `<div>
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
        <li class='list-group-item'>Price -</strong>  $${element.price}</li>
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