

displayAll();
var itemList = document.getElementById('items');
itemList.addEventListener('click', (e)=>{
  removeItem(e);
});

function displayAll(){
  fetch("https://my-brand-men-heroku.herokuapp.com/api/messages", {
    method: "GET",
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
        "Content-type": "application/json",
    },
  })
    .then(response => response.json())
    .then(data => {
  // let ar = [];
  for (let g=0; g < data.length; g++){
      //Calling the generate table function to add the fetched data
      // into the DOM
    generate_table(data[g]["name"],data[g]["phone"],data[g]["message"],
      data[g]["_id"], 
    data[g]["date"])
    // ar.push(data[g]["Title"]);
  }
  })
}
    //   FUNCTION TO ADD NEW MESSAGE SENT
    function generate_table(name, phone, message, id, whenCreated) {
      // get the reference for the body
      let tableRef = document.getElementById('table').
      getElementsByTagName('tbody')[0];
      let dt = `<td>${name} </td>
                <td>${phone}</td>
                <td><b>${message}</b></td>
                <td>${whenCreated}</td>
                <td><a href="#" class="delete">delete</a></td>`;
    var newRow = tableRef.insertRow(tableRef.rows.length);
    newRow.innerHTML = dt;
    newRow.setAttribute("rowid",id);
      }
       // FUNCTION TO DELETE ROW FROM DATABASE AND FROM DOM TREE
       function removeItem(er){
          //FOR DELETING ENTIRE ROW FROM THE TABLE (DOM)
          let targetRowIdToDelete = er.target.parentElement.parentElement.getAttribute("rowid");
          // const docRef = doc(db, "comment_section", targetRowIdToDelete )
         if(er.target.classList.contains('delete')){
           if(confirm('Warning, Are you sure to DELETE THE WHOLE MESSAGE?  Press OK to accept')){
             var tr = er.target.parentElement.parentElement;
             //To get the id of the post to delete
             itemList.removeChild(tr);
             console.log(targetRowIdToDelete);
              //to delete the specified blog with id from the (DATABASE)
              // deleteDoc(docRef).then(()=>{
                fetch(`https://my-brand-men-heroku.herokuapp.com/api/messages/${targetRowIdToDelete}`, {
                  method: "DELETE",
                  credentials: 'same-origin',
                  mode: 'cors',
                  headers: {
                      "Content-type": "application/json",
                      "authorization": localStorage.getItem("token")
                  },
                })
                  .then(response => response.json())
                  .then(data => {
                document.location.reload();
                console.log("The blog deleted successfully from the database");
             })
             .catch((err)=>{
               console.log(`there was an error while deleting the blog from database: ${err}`);
             })
           }
         }  
       }

       