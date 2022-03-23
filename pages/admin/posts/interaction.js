
 displayAll()
// document.location.reload();
   //Reference to delete the document
   var itemList = document.getElementById('items');
   itemList.addEventListener('click', (e)=>{
     removeAndUpdateItem(e);
   });
    // FUNCTION TO DELETE ROW FROM DATABASE AND FROM DOM TREE
    function removeAndUpdateItem(er){
       //FOR DELETING ENTIRE ROW FROM THE TABLE (DOM)
       var targetRowIdToDelete = er.target.parentElement.parentElement.getAttribute("rowid");
      //  const docRef = doc(db, "admin-page", targetRowIdToDelete )
      if(er.target.classList.contains('delete')){
        if(confirm('Warning, Are you sure to DELETE THE WHOLE BLOG?  Press OK to accept')){
          var tr = er.target.parentElement.parentElement;
          //To get the id of the post to delete
          itemList.removeChild(tr);
          console.log(targetRowIdToDelete);
           //to delete the specified blog with id from the (DATABASE)
          //  deleteDoc(docRef)
          fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs/${targetRowIdToDelete}`, {
            method: "DELETE",
            credentials: 'same-origin',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "authorization": localStorage.getItem("token")
            },
            // body: JSON.stringify(textAreaValue)
          })
            .then(response => response.json())
           .then((data)=>{
             document.location.reload();
             console.log("The blog deleted successfully from the database: " + data);
          })
          .catch((err)=>{
            console.log(`there was an error while deleting the blog from database: ${err}`);
          })
        }
      }
      else if(er.target.classList.contains('edit')){
        var title1;
        var body1;
        // getDoc(docRef)
        // 
        fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs/${targetRowIdToDelete}`, {
          method: "GET",
          credentials: 'same-origin',
          mode: 'cors',
          headers: {
              "Content-type": "application/json",
          },
        })
          .then(response => response.json())
         .then((data)=>{
          //  title1 = doc.data().Title;
          //  body1 = doc.data().Body;
          // console.log(doc.data());
          title1 = data.title;
          body1 = data.body;
          console.log(data);
          create_edit_post(title1,body1);
          updatePost(targetRowIdToDelete)
        }
        ) 
    }  
    }

    function updatePost(id){
      const updateArrCom = document.getElementById('posti')
      const bodyContent = document.getElementById('bodying')
      updateArrCom.addEventListener('submit',(e)=>{
        // console.log(bodyContent.value)
        e.preventDefault();
        //  const ref = doc(db, 'admin-page',id)
        //  updateDoc(ref, {
        //   Title: updateArrCom.title.value,
        //   Body: bodyContent.value,
        //   CreatedAt: serverTimestamp()
        //  }).
        // let updatePostData = 
        fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs/${id}`, {
          method: "PUT",
          credentials: 'same-origin',
          mode: 'cors',
          headers: {
              "Content-type": "application/json",
              "authorization": localStorage.getItem("token")
          },
          body: JSON.stringify({
            title: updateArrCom.title.value,
            body: bodyContent.value,
            date: "1/1/2022"
           })
        }).then((response) => {
          response.json();
          document.location.reload();
        })
          .then((response)=>{
            console.log(response.data);
         });
        
      })
    }

    function create_edit_post(title1, body1){
      console.log(body1);
      console.log(title1);
      let formEL = document.createElement('form');
        formEL.id = "posti"
        formEL.setAttribute("method",'post')
        formEL.setAttribute("action",'create')
        // formEL.setAttribute("id",)

        let titleDivEl = document.createElement('div');
        let labelElTitle = document.createElement('label');
        labelElTitle.appendChild(document.createTextNode('Title'))
        titleDivEl.appendChild(labelElTitle);
        let inputEl = document.createElement('input');
        inputEl.setAttribute("type",'text')
        inputEl.setAttribute("name",'title')
        inputEl.setAttribute("class",'field')
        // inputEl.setAttribute("id",'body')
        inputEl.setAttribute("value",title1)
        titleDivEl.appendChild(inputEl)

        let bodyDivEl = document.createElement('div');
        let labelElbody = document.createElement('label');
        labelElbody.appendChild(document.createTextNode('Body'))
        bodyDivEl.appendChild(labelElbody);
        let textArea = document.createElement('textarea')
        textArea.setAttribute("name", "body")
        textArea.id = "bodying"
        textArea.setAttribute("class", "field")
        textArea.appendChild(document.createTextNode(body1))
        bodyDivEl.appendChild(textArea);

        let buttonDivEl = document.createElement('div');
        let submitBtn = document.createElement('button')
        submitBtn.setAttribute("type", "submit")
        submitBtn.setAttribute("class", "btn-big")
        submitBtn.appendChild(document.createTextNode('Update Post'))
        buttonDivEl.appendChild(submitBtn)
  
      formEL.appendChild(titleDivEl);
      formEL.appendChild(bodyDivEl);
      formEL.appendChild(buttonDivEl);
      document.querySelector('.content')
      .prepend(formEL)
      // document.querySelector('.content').insertBefore(formEL, document.querySelector('.content'));
    }

    //   FUNCTION TO ADD ROW BELOW THE TABLE
 function generate_table(title, comNumber, id, dateCreated) {
  // get the reference for the body
  let tableRef = document.getElementById('table').
  getElementsByTagName('tbody')[0];
  let dt = `<td> ${dateCreated}</td>
            <td><b>${title}</b></td>
            <td>${comNumber}</td>
            <td><a href="#" class="edit">Update    </a><a href="#" class="delete">delete</a></td>`;
var newRow = tableRef.insertRow(tableRef.rows.length);
newRow.innerHTML = dt;
newRow.setAttribute("rowid",id);
  }
function displayAll(){
  // onSnapshot(refi, (snapshor)=>{
  //   let data = []
  // snapshor.docs.forEach((doc) => {
  //   data.push({ ...doc.data(), id: doc.id})
  // })
  // let ar = [];
  // for (let g=0; g < data.length; g++){
  //     //Calling the generate table function to add the fetched data
  //     // into the DOM
  //   generate_table(data[g]["Title"],data[g]['commentArr'].length, data[g]["id"], data[g]["CreatedAt"].toDate().toDateString(),
  //    data[g]["CreatedAt"].toDate().toLocaleTimeString())
  //   ar.push(data[g]["Title"]);
  // }

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
      generate_table(data[g]["title"],data[g]["comments"].length, data[g]["_id"],
      data[g]["date"] );
      arr_id.push(data[g]["_id"]);
    }
  })
// document.location.reload();
}



const loginForm = document.querySelector("#logout")
loginForm.addEventListener('click', (e) => {
    e.preventDefault()
  signOut(auth).then (()=>{
    console.log("hello hello amakuru urasohotse rero");
    goToTheLogin();
  })
  .catch((error)=>{
    console.log("the error is .... ", error)
  })
  }
)

function goToTheLogin(){
  window.location.href="../../Finished Files/Log-In/login.html"
}