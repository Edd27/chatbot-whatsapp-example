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
    try {
        const { body, from, isStatus } = message
        if (body.length && !isStatus) {
            const chat = await message.getChat()

            if (!chat.isGroup) {
                console.log(`${from} said: ${body}`)
                if (
                    body.toLowerCase().includes('hola') ||
                    body.toLowerCase().includes('hi') ||
                    body.toLowerCase().includes('hello') ||
                    body.toLowerCase().includes('hey') ||
                    body.toLowerCase().includes('ayudar') ||
                    body.toLowerCase().includes('ayuda')
                ) {
                    await sendMessage(
                        from,
                        'Hola! 👋🏼 en un momento te contestaré 😃'
                    )
                }

                if (
                    body.toLowerCase().includes('gracias') ||
                    body.toLowerCase().includes('thanks') ||
                    body.toLowerCase().includes('thank you')
                ) {
                    await sendMessage(from, 'Por nada 😉')
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
})

const sendMedia = async (to, file, caption = '') => {
    const media = MessageMedia.fromFilePath(`./media/${file}`)
    await client.sendMessage(to, media, { caption })
}

const sendMessage = async (to, message) => {
    await client.sendMessage(to, message)
}

export default client
