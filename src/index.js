import '#Config/env.js'
import httpServer from '#Config/http.js'
import client from '#Config/whatsapp.js'

const bootstrap = () => {
    client.initialize()
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })
}

bootstrap()
