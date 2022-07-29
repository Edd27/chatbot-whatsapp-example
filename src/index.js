import '#Config/env.js'
import httpServer from '#Config/http.js'

const bootstrap = () => {
    httpServer.listen(process.env.PORT, () => {
        console.log(`Server listening on port ${process.env.PORT}`)
    })
}

bootstrap()
