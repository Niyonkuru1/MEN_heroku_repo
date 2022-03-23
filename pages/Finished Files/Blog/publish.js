

//Using fetch api
fetch("https://my-brand-men-heroku.herokuapp.com/api/blogs", {
  method: "GET",
  credentials: 'same-origin',
  mode: 'cors',
  headers: {
      "Content-type": "application/json",
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let arr_id = [];
    for (let g=0; g < data.length; g++){
        //Calling the generate table function to add the fetched data
        // into the DOM
      generateBlogCard(data[g]["title"],data[g]["body"], 
      data[g]["date"], data[g]["_id"]);
      arr_id.push(data[g]["_id"]);
    }
    createFooter();
    console.log(arr_id);
    // for (let p=0; p < arr_id.length; p++){
      // var hummer = arr_id;
    let buttoni = document.querySelectorAll(".kanda")
    buttoni.forEach((buttonItem, index)=>{
      buttonItem.addEventListener("click",(e)=>{
        console.log("hello " + index);
        if (e.target.getAttribute("card_id") == arr_id[index]){
          console.log(`Ukanze iyi idi ${arr_id[index]} and same to this ${e.target.getAttribute("card_id")}`)
            fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs/${arr_id[index]}`, {
              method: "GET",
              credentials: 'same-origin',
              mode: 'cors',
              headers: {
                  "Content-type": "application/json",
              },
            })
              .then(response => response.json())
              .then(data => {
            console.log(data)
            let bodi = data.body;
            let titlee = data.title;
            let datee = data.date;
            readMore(bodi, titlee, datee);
        });
        }
        
     })
    })
    let commenti = document.querySelectorAll('.comment')
    commenti.forEach((comItem,index)=>{
      let secondMain = document.getElementById(`com${arr_id[index]}`)
    comItem.addEventListener("click", (e)=>{
      let formEL = document.createElement('form');
      formEL.id = "addComArr"
    formEL.setAttribute("formId", arr_id[index])
    let textArea = document.createElement('textarea')
    textArea.setAttribute("placeholder", "Enter your comment here")
    textArea.setAttribute("name", "area")
    textArea.setAttribute("rows", "7")
    textArea.setAttribute("cols", "50")
    textArea.id = "textarea";
    let submitBtn = document.createElement('button')
    submitBtn.setAttribute("type", "submit")
    submitBtn.appendChild(document.createTextNode('Add your comment'))
    formEL.appendChild(textArea);
    formEL.appendChild(submitBtn);
    secondMain.appendChild(formEL);
    addComment()
    })
    })
  }
  )
  .catch((error) => {
      console.error('Error:', error);
  })
// document.location.reload();
function addComment(){
  const updateArrComment = document.getElementById('addComArr')
  updateArrComment.addEventListener('submit',(e)=>{
    e.preventDefault()
  const ide = e.target.getAttribute('formid')
    console.log("hello form we, with this id:...  " +
     ide)
     let textAreaValue = {newCom: updateArrComment.area.value}
      fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs/addcom/${ide}`, {
  method: "PUT",
  credentials: 'same-origin',
  mode: 'cors',
  headers: {
      "Content-type": "application/json",
  },
  body: JSON.stringify(textAreaValue)
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
      updateArrComment.reset()
       document.location.reload();
     })
  })
}

//   FUNCTION TO ADD THE BLOG DETAILS AFTER HITTING READ MORE
function generateBlogCard(title,body, dateCreated, Id) {
let parentDiv = document.getElementById('parent');
let mainContentDiv = document.createElement('div')
mainContentDiv.id = `${Id}`

let mainPopupDiv = document.createElement('div')
mainPopupDiv.id = `com${Id}`
parentDiv.appendChild(mainPopupDiv);

  let mainDiv = document.getElementById('wrapper-main')
  let containerDiv = document.createElement("div")
  containerDiv.className = "container"
  let imgDiv = document.createElement("div")
  imgDiv.className = "image"
  let image = document.createElement("img")
  image.setAttribute('src','/images/project.png')
  imgDiv.appendChild(image)
  let headDiv = document.createElement("div")
  headDiv.className = "head"
  let headingDiv = document.createElement("div")
  headingDiv.className = "heading"
  headingDiv.appendChild(document.createTextNode(title))
  headDiv.appendChild(headingDiv)
  let dateDiv = document.createElement("div")
  dateDiv.className = "date"
  dateDiv.appendChild(document.createTextNode(dateCreated))
  headDiv.appendChild(dateDiv)
  let paraDiv = document.createElement("p")
  paraDiv.appendChild(document.createTextNode(body))
  headDiv.appendChild(paraDiv)
  let tostyleDiv= document.createElement("div")
  tostyleDiv.className = "toStyleButton"
  let buttonDiv = document.createElement("div")
  buttonDiv.className = "button"
  let anchorElement = document.createElement("a")
  anchorElement.appendChild(document.createTextNode("READ MORE"))
  anchorElement.setAttribute("href",`#${Id}`)
  anchorElement.setAttribute("card_id",Id)
  anchorElement.className = "kanda";

  let comElement = document.createElement("a")
  comElement.appendChild(document.createTextNode("ADD COMMENT"))
  comElement.setAttribute("href",`#com${Id}`)
  comElement.setAttribute("card_id",Id)
  comElement.className = "comment";

  buttonDiv.appendChild(anchorElement)
  buttonDiv.appendChild(comElement)
  tostyleDiv.appendChild(buttonDiv)

  headDiv.appendChild(tostyleDiv)
  containerDiv.appendChild(imgDiv)
  containerDiv.appendChild(headDiv)
  mainDiv.appendChild(containerDiv)
parentDiv.appendChild(mainContentDiv);

// TO CREATE THE FOOTER


    }


function readMore(bodi, titlee, datee){

let stringiPage = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="blog.css">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <title>My Blog</title>
</head>
<!-- <i class="fa-regular fa-bars"></i> -->

<body>
    <div id="parent">
        <div class="navbar">
            <ul>
                <li id="svg">
                    <img src="/images/Logo.svg" alt="">
                </li>
                <li><a href="../Landing-page/index.html">HOME</a></li>
                <li><a href="../About-page/about.html">ABOUT</a></li>
                <li><a href="../Contact-page/contacting.html">CONTACT</a></li>
                <li><a href="../Log-In/login.html">LOG IN</a></li>
            </ul>
        </div>
        <div id="wrapper-main">
            <div class="title">
                <div class="header">
                    <h3>Welcome to my <span>Blog</span></h3>
                </div>
            </div><br>
            <div class="displayContent">
                <div class="title">
                    <h2>${titlee}</h2>
                </div>
                <hr>
                <br>
                <div class="date">
                    <h4> ${datee}
                    </h4>
                </div>
                <div class="author">
                    <h5>
                        Author: NIYONKURU Sylvain.
                    </h5>
                </div>
                <br> <br>
                <div class="body">
                    <p>
                        ${bodi}
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`
document.write(stringiPage);
}


function createFooter(){
  let mainDivu = document.getElementById('wrapper-main')
  let footerDiv = document.createElement("div");
  let Div1 = document.createElement("div");

footerDiv.className = "footerMain"
let fDiv1 = document.createElement("div");
  fDiv1.className = "footer1"
let f1h2 = document.createElement("h2");
f1h2.appendChild(document.createTextNode('Links'))
let ul = document.createElement("ul");
let l1 = document.createElement("li");
l1.appendChild(document.createTextNode('Skills'))
let l2 = document.createElement("li");
l2.appendChild(document.createTextNode('Blogs'))
let l3 = document.createElement("li");
l3.appendChild(document.createTextNode('About me'))
let l4 = document.createElement("li");
l4.appendChild(document.createTextNode('Contact me'))
ul.appendChild(l1)
ul.appendChild(l2)
ul.appendChild(l3)
ul.appendChild(l4)
Div1.appendChild(f1h2)
Div1.appendChild(ul)
fDiv1.appendChild(Div1)
// fDiv1.appendChild(ul);

let fDiv2 = document.createElement("div");
fDiv2.className = "footer1"
let f2h2 = document.createElement("h2");
f2h2.appendChild(document.createTextNode('Subscribe'))
let f2p = document.createElement("p");
f2p.appendChild(document.createTextNode('Lorem ipsum kkkkkkjhghjjhgfgh'))
let f2form = document.createElement('form')
let f2formInput = document.createElement('input')
f2formInput.setAttribute('type','text')
let f2formButton = document.createElement('button')
f2formButton.setAttribute('type','submit')
f2formButton.appendChild(document.createTextNode("Send"))
f2form.appendChild(f2formInput)
f2form.appendChild(f2formButton)

fDiv2.appendChild(f2h2)
fDiv2.appendChild(f2p)
fDiv2.appendChild(f2form)

let fDiv3 = document.createElement("div");
fDiv3.className = "footer1"
let f3h2 = document.createElement("h2");
f3h2.appendChild(document.createTextNode("Follow me on:"))
let f3Img = document.createElement("img"); 
f3Img.setAttribute('src','../../../images/social_media.svg')
fDiv3.appendChild(f3h2)
fDiv3.appendChild(f3Img)

let fDiv4 = document.createElement("div");
fDiv4.className = "footer2"
let f4p = document.createElement("p");
f4p.appendChild(document.
  createTextNode(`Copyright 2022 all right reserved | 
  Made by Sylvain`))
fDiv4.appendChild(f4p)
footerDiv.appendChild(fDiv1)
footerDiv.appendChild(fDiv2)
footerDiv.appendChild(fDiv3)
footerDiv.appendChild(fDiv4)
mainDivu.appendChild(footerDiv);
}


const localstorage_user = JSON.parse(localStorage.getItem('user'))
console.log(localstorage_user)