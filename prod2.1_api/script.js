const dd1=document.getElementById('dropdown-1')
const dd2=document.getElementById('dresses-dropdown')
const dd3=document.getElementById('hamburger-dropdown')
var flag1=0
var flag2=0
var flag3=0

function openDropdown(){
    if(flag1==0){
    dd1.classList.add('show')
    flag1=1
}
else{
    dd1.classList.remove('show')
    flag1=0
}
}

function openDropdown1(){
    if(flag2==0){
    dd2.classList.add('show2')
    flag2=1
}
else{
    dd2.classList.remove('show2')
    flag2=0
}
}

function openham(){
    if(flag3==0){
    dd3.classList.add('show3')
    flag3=1
}
else{
    dd3.classList.remove('show3')
    flag3=0
}
}



var hsImgList = document.querySelectorAll('.header-slider-images .hs-container')

var hsIndex = 0

hsImgList[hsIndex].classList.add('active')


function removeSlide(i){
    hsImgList[i].classList.remove('active')
}

function showSlide(i){
    hsImgList[i].classList.add('active')
}

function nextSlide(){
    removeSlide(hsIndex)
    hsIndex = (++hsIndex)%hsImgList.length
    showSlide(hsIndex)
}

function prevSlide(){
    removeSlide(hsIndex)
    hsIndex = (--hsIndex + hsImgList.length)%hsImgList.length
    showSlide(hsIndex)
}



const slides = document.querySelectorAll('.slide'); 
let currentIndex = 0;

 slides.forEach(
    (slide,index)=>{
        slide.style.left=`${index*150}px`
    }
)

const slideimage = () => {
    currentIndex++;


    if (currentIndex >= 8) {
        currentIndex = 0;
    }

    slides.forEach((slide, index) => {
       
        slide.style.transform = `translateX(-${currentIndex * 150}px)`;

        
    });
};

const myinterval = setInterval(slideimage, 1000);








function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.getElementById('submitBtn').addEventListener('click', function() {
    const email = document.getElementById('emailInput').value;
    const statusDiv = document.getElementById('emailStatus');
    if (validateEmail(email)) {
        statusDiv.textContent = 'Email is valid!';
        statusDiv.style.color = 'green';
        console.log('Valid email:', email);
    } else {
        statusDiv.textContent = 'Please enter a valid email address.';
        statusDiv.style.color = 'red';
    }
});



document.getElementById('newsletterSubmitBtn').addEventListener('click', function() {
    const name = document.getElementById('nameInput').value.trim();
    const email = document.getElementById('newsletterEmailInput').value.trim(); 
    const statusDiv = document.getElementById('newsletterStatus');

    if (name === '') {
        statusDiv.textContent = 'Please enter your name.';
        statusDiv.style.color = 'red';
        return;
    }

    if (!validateEmail(email)) {
        statusDiv.textContent = 'Please enter a valid email address.';
        statusDiv.style.color = 'red';
        return;
    }

    statusDiv.textContent = 'Thank you for subscribing to our newsletter!';
    statusDiv.style.color = 'green';
    console.log('Newsletter - Name:', name, 'Email:', email);
});






var backToTop = document.querySelector('.back-to-top')

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
})

window.addEventListener('scroll', () => {
  if (scrollY > 1){
    backToTop.classList.add('appear')
  }
  else{
    backToTop.classList.remove('appear')
  }
})







//js for page
const containers = document.querySelectorAll('.img-cont2');

const rendercards=async()=>{
    let uri='http://localhost:3000/prod-card';
    const res =await fetch(uri);
    const cards =await res.json();
    console.log(cards)

    let template='';
    cards.slice(0,8).forEach(card =>{
        template+=` <div class="img-card2">
                <div class="img-box"><img src=${card.image} alt=""></div>
                <div>
                    <h6>${card.name}</h6>
                    <div class="price">
                        <span> $${card.price}.00</span> <span><del>$${card.original_price}.00</del></span>
                    </div>
                </div>
                <div class="add-cart">
                    <a href="detail.html"><i class="fas fa-eye"></i> View Detail</a>
                    <a href="detail.html"><i class="fas fa-shopping-cart"></i> Add To Cart</a>
                </div>
            </div>`
    })
    containers.forEach(container => {
            container.innerHTML = template;
        });

}

window.addEventListener('DOMContentLoaded',()=> rendercards());
