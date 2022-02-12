async function editFormHandler(event) {
    event.preventDefault();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const res = await fetch(`api/post/${id}`,{
        method: 'PUT',
        body:JSON.stringify({
            title
        }),
        headers: {
         'Content-Type': 'application/json'
        }
    });
    if(res.ok) {
        document.location.replace('/dashboard/');
    } else {
        alert(res.statusText);
    }
  
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);