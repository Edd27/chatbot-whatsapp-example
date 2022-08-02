import qrcode from 'qrcode-terminal'
import pkg from 'whatsapp-web.js'
const { Client, LocalAuth, MessageMedia } = pkg

const client = new Client({
    authStrategy: new LocalAuth(),
})

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
    console.log('AUTHENTICATED')
})

client.on('auth_failure', () => {
    console.log('AUTH_FAILURE')
})

client.on('ready', () => {
    console.log('Client is ready')
})

client.on('message', async message => {
    const { body, from } = message
    if (body.length) {
        console.log(`${from} said: ${body}`)
        const chat = message.getChat()
        console.log(chat)
        // await sendMessage(from, 'Hola! en un momento te contestaré')
        // await sendMedia(from, 'baby.png')
    }
})

const sendMedia = async (to, file, caption = '') => {
    const media = MessageMedia.fromFilePath(`./src/img/${file}`)
    await client.sendMessage(to, media, { caption })
}

const sendMessage = async (to, message) => {
    await client.sendMessage(to, message)
}

export default client
