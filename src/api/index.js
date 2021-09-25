import axios from 'axios'

export async function setCharacters(page) {
    const charactersList = []
    let character
    const toReturn = await axios.get(`https://breakingbadapi.com/api/characters?limit=4&offset=${page - 1}`)
        .then(res => { 
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
}