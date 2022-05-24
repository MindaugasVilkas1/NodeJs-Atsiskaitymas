document.querySelectorAll('.deleteBtn').forEach(item => {
    item.addEventListener('click', e =>{
        console.log(e.target.id)
        let id= e.target.id
        fetch(`http://localhost:3000/api/blog/id/${id}`,{
            method: 'DELETE'
        })
       .then(location.replace('/'))
       
    })
});