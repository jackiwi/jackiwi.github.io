// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img = $('.myImg');//document.getElementById('myImg');
var modalImg = $("#imgModal");//document.getElementById("/images/digillus/25.png");
var captionText = document.getElementById("caption");
$('.myImg').click(function(){
  modal.style.display = "block";
  var newSrc = this.src;
  modalImg.attr('src', newSrc);
  captionText.innerHTML = this.alt;
});
/*img.onclick = function(){
  modal.style.display = "block";
  modalImg.src = this.src;
}*/

// Get the <span> element that closes the modal
var span = document.querySelector(".modal-content");

// When the user clicks on <span> (x), close the modal
modal.onclick = function() {
  modal.style.display = "none";
}

// Detect all clicks on the document
document.addEventListener("click", function(event) {
  // If user clicks inside the element, do nothing
  //if (event.target.closest(".span")) return;
    // If user clicks outside the element, hide it!
    //modal.style.display = "none";
});
