import axios from 'axios'
import { ActivityPartial } from 'eris'
import { Logger } from '../../Logger'
import { ChinoClient } from '../ChinoClient.platform'
import { Config } from '../config'
const status: ActivityPartial[] = [
  { name: 'Trying to give you support.', type: 3 },
  { name: 'Moderating my support server!', type: 3 },
  { name: 'If you need support or have a question, please, go to the #support channel.', type: 3 },
  { name: 'Miracle Girls Festival', type: 0 },
  { name: 'Chimame Chronicle', type: 0 }
]

const logger = new Logger('DiscordPlatform.events.ReadyListener')
export default {
  name: 'ready',
  run: (client: ChinoClient) => {
    logger.log('Online, finally.')
    const guild = client.guilds.get(Config.guild_support.id)

    try {
      Promise.all([setInterval(async () => {
      setInterval(() => {
        const game = status[Math.round(Math.random() * status.length)]
        if (game?.type === 0) {
          client.editStatus('dnd', game)
        } else {
          client.editStatus('online', game)
        }
      }, 15000)]).catch((error) => console.error(error))
    } catch (err) {
      logger.error(err)
    }
  }
}