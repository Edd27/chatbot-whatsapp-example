import qrcode from 'qrcode-terminal'
import pkg from 'whatsapp-web.js'
/* import fs from 'fs' */
/* import exceljs from 'exceljs'
import moment from 'moment' */

const { Client, LocalAuth /* MessageMedia */ } = pkg

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
                // saveHistory(from, body)
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

/* const sendMedia = async (to, file, caption = '') => {
    const media = MessageMedia.fromFilePath(`./media/${file}`)
    await client.sendMessage(to, media, { caption })
} */

const sendMessage = async (to, message) => {
    await client.sendMessage(to, message)
}

/* const saveHistory = (number, message) => {
    const pathChat = `./chats/${number}.xlsx`
    const workbook = new exceljs.Workbook()
    const today = moment().format('DD-MM-YYYY hh:mm')

    if (fs.existsSync(pathChat)) {
        workbook.xlsx.readFile(pathChat).then(() => {
            const worksheet = workbook.getWorksheet(1)
            const lastRow = worksheet.lastRow
            const getRowInsert = worksheet.getRow(++lastRow._number)
            getRowInsert.getCell('A').value = today
            getRowInsert.getCell('B').value = message
            getRowInsert.commit()
            workbook.xlsx
                .writeFile(pathChat)
                .then(() => {
                    console.log('History saved')
                })
                .catch(err => console.log(err))
        })
    } else {
        const worksheet = workbook.addWorksheet('Chats')
        worksheet.columns = [
            { header: 'Date', key: 'date' },
            { header: 'Message', key: 'message' },
        ]
        worksheet.addRow({ date: today, message })
        workbook.xlsx
            .writeFile(pathChat)
            .then(() => {
                console.log('History saved')
            })
            .catch(err => console.log(err))
    }
} */

export default client
