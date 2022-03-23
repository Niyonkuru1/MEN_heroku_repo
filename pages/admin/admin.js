
   
  // ADDING the datas into database
  const addPost = document.querySelector("#posti")
  addPost.addEventListener("submit", (e) => {
      e.preventDefault()
    fetch(`https://my-brand-men-heroku.herokuapp.com/api/blogs`, {
      method: "POST",
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
          "Content-type": "application/json",
          "authorization": localStorage.getItem("token")
      },
      body: JSON.stringify({
        title:  addPost.title.value,
        body: addPost.body.value,
        date: "1/1/2022"
       })
    })
    .then((response) => response.json())
        .then((data)=>{
          console.log(data);
        })
    })

