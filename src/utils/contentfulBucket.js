const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    host: process.env.CONTENTFUL_HOST
})

const getContentById = id => {
    return new Promise(function (resolve, reject) {
        client.getEntry(id)
        .then((entry) => {console.log(entry);resolve(entry);})
        .catch(console.error)        
    })
      
}

export { getContentById }