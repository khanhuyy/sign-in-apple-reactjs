const app = require('express')()

const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://appleid.apple.com/auth/keys'
});
function getAppleSigningKey(kid){
    return new Promise((resolve) => {
        client.getSigningKey(kid, (err, key) => {
            if (err) {
                console.log(console.error)
                resolve(null)

            }
            const signingKey = key.getPublicKey()
            resolve(signingKey)
        })
    })
}

app.use(bodyParser.json())

app.use(cors())

function verifyJWT(json, publicKey) {
    return new Promise((resolve) => {
        jwt.verify(json, publicKey, (err, payload) => {
            if (err) {
                console.error(err)
                return resolve(null)
            }
            resolve(payload)
        })
    })
}

app.post('/login', async (req, res) => {
    console.log(req)

    const { provider, response } = req.body

    if (provider === 'apple') {
        const {identityToken, user} = response.response

        const json = jwt.decode(identityToken)

        const kid = json?.header?.kid

        const appleKey = await getAppleSigningKey(kid)
        if (!appleKey) {
            console.error('Something went wrong')
            return
        }

        const payload = await verifyJWT(json, appleKey)
        if(!payload) {
            console.log('Sign in with apple succeeded!', payload)
        }
    }

    res.json({ status: 'ok' , request: req.body})
})

app.listen(12321, () => {
    console.log('Server ready');
})
