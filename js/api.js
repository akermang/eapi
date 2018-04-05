function call(url) {
    return fetch(url);
}

// fetch example
// const promise = call('https://cdn.pixabay.com/photo/2015/04/20/13/10/rock-731140_960_720.jpg')
// promise.then(res => {
//     if(res.ok){
//         return res;
//     } else {
//         throw new Error('error message')
//     }    
// })
// .catch(err => console.log('error: ', err))