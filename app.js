class Requests{
    constructor(url){
        this.url =  url;
        this.xhr = new XMLHttpRequest();
        this.objectToWork = {body:'object to work with'};
         
        

    }

    getRequest(event ,getInput){
        if(getInput.value !== ''){
            this.xhr.open('GET' ,this.url+`/comments/${getInput.value}` ,true);
            
                    
            this.xhr.onload = function(){
            if(this.status === 200){
                event.target.parentElement.parentElement.lastElementChild.innerText =`post's name is : ${JSON.parse(this.responseText).name}`;
                event.target.parentElement.parentElement.lastElementChild.style =`position:absolute;bottom:0%;`
            }
            else{
               

            }

            
            }
            this.xhr.send();
        }
    }   
        

        postRequest(event){
                this.xhr.open('POST' ,this.url+'/comments' ,true);
                this.xhr.setRequestHeader('Content-type' ,'application/json');
                self = this;
                this.xhr.onload = function(){
                    
                    if(this.status === 200 || this.status === 201){
            
                        event.target.parentElement.parentElement.lastElementChild.innerText = `appended post body : ${self.objectToWork['body']} `;
                        event.target.parentElement.parentElement.lastElementChild.style = `position:absolute; bottom:0%;`
                        
                    }
                    else{
                       
                    }

                 }

                this.xhr.send(JSON.stringify(this.objectToWork));
                
              

            

        }

        putRequest(event ,putInput){
            if(putInput.value !== ''){
                this.xhr.open('PUT' ,this.url+`/comments/${putInput.value}` ,true);
                this.xhr.setRequestHeader('Content-type' ,'application/json');
                this.xhr.onload=  function(){
                    if(this.status === 200){
                        event.target.parentElement.parentElement.lastElementChild.innerText = `updated post body: ${JSON.parse(this.response).body}`
                        event.target.parentElement.parentElement.lastElementChild.style= `position:absolute;bottom:0%;`;

                    }
                    else{
                        

                    }

                }
            this.xhr.send(JSON.stringify(this.objectToWork));

            }

        }

        deleteRequest(event , deleteInput){
            if(deleteInput.value !== ''){
                this.xhr.open('DELETE' , this.url+`/comments/${deleteInput.value}`);
                this.xhr.onload =  function(){
                    if(this.status === 200){
                        event.target.parentElement.parentElement.lastElementChild.innerText = `post with index ${deleteInput.value} deleted`;
                        event.target.parentElement.parentElement.lastElementChild.style= 'position:absolute;bottom:0%;';

                    }

                }
                this.xhr.send();

            }
        }


    }

const box = document.querySelector('div.box');
box.addEventListener('click' , Submit);

const requests =  new Requests('https://jsonplaceholder.typicode.com' );

function Submit(event){
    if(event.target.parentElement.parentElement.className === 'left-card' &&
    event.target.parentElement.parentElement.parentElement.id === "upper-box" &&
    event.target.className === "doc-svg"){
        const inputText = event.target.previousElementSibling;
        requests.getRequest(event ,inputText);
        event.preventDefault();
    }
    
    else if(event.target.parentElement.parentElement.className === 'right-card' &&
    event.target.parentElement.parentElement.parentElement.id === "upper-box" &&
    event.target.className === "doc-svg"){
        const inputText =event.target.previousElementSibling;
        requests.putRequest(event , inputText);
        event.preventDefault();
    }
    else if(event.target.parentElement.parentElement.className === 'left-card' &&
    event.target.parentElement.parentElement.parentElement.id === "lower-box" &&
    event.target.className === "doc-svg"){
        requests.postRequest(event);
        event.preventDefault();

    }
    else if(event.target.parentElement.parentElement.className === 'right-card' &&
    event.target.parentElement.parentElement.parentElement.id === "lower-box" &&
    event.target.className === "doc-svg"){
        const inputText =   event.target.previousElementSibling;
        requests.deleteRequest(event , inputText);
        event.preventDefault();

    }
}
