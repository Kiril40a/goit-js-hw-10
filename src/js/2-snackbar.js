import iziToast from "izitoast";

document.querySelector('.form').addEventListener("submit", (e) => {
    e.preventDefault();
    let delay = document.querySelector("input[name=delay]").value;
    let result = document.querySelector('input[name=state]:checked').value;
    
    const promise = new Promise((resolve, reject) => {  
        setTimeout(() => {  
            if (result === 'fulfilled') {  
                resolve(delay);  
            } else {  
                reject(delay);  
            }  
        }, delay);  
    });  

     promise  
        .then(delay => {  
            // console.log(`✅ Fulfilled promise in ${delay}ms`);  
            iziToast.show({
            title: 'Hey',
            message: `✅ Fulfilled promise in ${delay}ms`
        });
        })  
        .catch(delay => {  
            // console.error(`❌ Rejected promise in ${delay}ms`);
            iziToast.show({
            title: 'Hey',
            message: `❌ Rejected promise in ${delay}ms`
        });
        })
})