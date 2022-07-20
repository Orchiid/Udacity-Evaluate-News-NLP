// scss file here
import './styles/base.scss'
import './styles/resets.scss'
import './styles/header.scss'
import './styles/form.scss'
import './styles/footer.scss'
let key= '';
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const getUrl = document.querySelector('#article-url');
const server = " http://127.0.0.1:8082";
const info= document.querySelector('#text');
const agreement = document.querySelector('#agreement');
const subjectivity = document.querySelector('#subjectivity');
const confidence = document.querySelector('#confidence');
const irony = document.querySelector('#irony');
const polarity = document.querySelector('#polarity');
import { getData } from './js/getData';
import { verifyURL } from './js/verifyURL';
const submit = document.querySelector('#submit');


// add event listener to it when the click to call handleSubmit function
window.addEventListener('DOMContentLoaded',() => {
    submit.addEventListener('click', (e) => {
        e.preventDefault();
        const newUrl = server + "/newUrl"
        const sendUrl = server + "/sendUrl"
        const fetch = server + "/fetchUrl"
        addUrl(fetch)
        .then((data) => {
            getNewUrl(data)
            const apiUrl= `${baseURL}?key=${data.key}&url=${getUrl.value}'&lang=en`
            if (verifyURL(getUrl.value) === true) {
                getData(apiUrl)
                .then((data)=>{
                    projectData(data)
                    .then((info)=>{
                        postData(newUrl, info)
                        .then((data) => {
                            sortData(sendUrl)
                            .then((data) => {
                                updateData(data);
                            })
                    })
                })
                
            })
            }else{
                alert('Please enter a valid URL');
            }
        })
})})



// fetch the API_KEY from the server
async function addUrl(url) {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    };

}
async function getNewUrl(data) {
    const response = await data;
    if (response.key) {
        key = response.key
        console.log(key)
        } else {
            console.log('Has not been posted')
            }
}

//Function to GET Web API Data
async function postData(url = '', data = {}) {
    try {
        const info = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(data)
        });
        return info;
    } catch (error) {
        console.log(error);
    }
}


async function projectData(data) {
    try {
            const fact = {
                agreement: data.agreement,
                confidence: data.confidence,
                irony: data.irony,
                polarity:data.score_tag,
                info: data.sentence_list[0].text,
                subjectivity: data.subjectivity,
            };
            console.log(fact);
            return fact;
        
    } catch (error) {
        console.log(error);
    }
}


async function sortData(url) {
    const data = await fetch(url);
    try {
        const response = await data.json();
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    };

}

// update data in the browser
async function updateData(data) {
    const response = await data;
    if (response.info) {
        info.innerHTML = response.info;
        agreement.innerHTML = response.agreement;
        subjectivity.innerHTML = response.subjectivity;
        confidence.innerHTML = response.confidence;
        irony.innerHTML = response.irony;
        polarity.innerHTML = response.polarity;

        } else {
            console.log('Has not been posted')
            }
}
