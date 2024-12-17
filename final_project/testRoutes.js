const axios = require('axios');

const api_url = 'http://localhost:5000'

async function getBooks() {
    try {
        const response = await axios.get(`${api_url}/`)
        console.log(response.data)
    } catch (error) {
        console.error("Error in Get books")
    }
}

async function getBooks() {
    try {
        const response = await axios.get(`${api_url}/`)
        console.log(response.data)
    } catch (error) {
        console.error("Error in Get books")
    }
}

async function getBookByISBN( ISBN ){
    try {
        const response = await axios.get(`${api_url}/isbn/${ISBN}`)
        console.log(response.data)
    } catch (error) {
        console.error("Error in Get books by ISBN")
    }
}

async function getBookByAuthor( author ){
    try {
        const response = await axios.get(`${api_url}/author/${author}`)
        console.log(response.data)
    } catch (error) {
        console.error("Error in Get books by author")
    }
}
async function getBookByTitle( title ){
    try {
        const response = await axios.get(`${api_url}/title/${title}`)
        console.log(response.data)
    } catch (error) {
        console.error("Error in Get books by title")
    }
}


getBookByTitle("One Thousand and One Nights");
// getBooks();
// getBookByISBN(3);
// getBookByAuthor("Jane Austen")