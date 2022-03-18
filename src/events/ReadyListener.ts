import { ChinoClient } from '../ChinoClient'
import axios from 'axios'
import { Logger } from '../structures/utils/Logger'
import { Config } from '../config'
import { ActivityPartial } from 'eris'

export default {
  name: 'ready',
  run: (client: ChinoClient) => {
    Logger.log('Online, finally.')
    const guild = client.guilds.get(Config.guild_support.id)
    const banner = [
      'https://cdn.discordapp.com/attachments/481807707066859530/751192861365764126/Screenshot_20200731-202613_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192867678060676/Screenshot_20200731-202639_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192873562669166/Screenshot_20200731-202743_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192879334162452/Screenshot_20200731-202804_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192885956706394/Screenshot_20200731-210716_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192889421463622/Screenshot_20200801-233101_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192899294855238/Screenshot_20200801-235637_Goyabu.jpg',
      'https://cdn.discordapp.com/attachments/481807707066859530/751192907985322005/Screenshot_20200802-003003_Goyabu.jpg'
    ]
    setInterval(async () => {
      if (!guild.features.includes('BANNER')) return
      const buffer = await axios.get(banner[Math.floor(Math.random() * banner.length)], { responseType: 'arraybuffer' }).then(d => Buffer.from(d.data, 'binary').toString('base64'))
      const base64Banner = `data:image/${banner[Math.floor(Math.random() * banner.length)].substr(banner[Math.floor(Math.random() * banner.length)].length - 3)};base64,${buffer}`
      guild.edit({
        banner: base64Banner
      })
    }, 900000)
    const status: ActivityPartial[] = [
      {
        name: 'Trying to give support you.',
        type: 3
      },
      {
        name: 'DM me if you need help!',
        type: 3
      },
      {
        name: 'If you need support or have a question, please, DM me.',
        type: 3
      },
      {
        name: 'Miracle Girls Festival',
        type: 0
      },
      {
        name: 'Chimame Chronicle',
        type: 0
      }]

    setInterval(() => {
      const game = status[Math.round(Math.random() * status.length)]
      if (game.type === 0) {
        client.editStatus('idle', game) 
      } else {
        client.editStatus('online', game)
      }
    }, 15000)
  }
}