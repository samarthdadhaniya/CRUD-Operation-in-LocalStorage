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