import { ClientOptions } from 'eris'

export type ConfigOptions = {
  options: ClientOptions
  guild_support: any
}

export const Config: ConfigOptions = {
  options: {
    defaultImageFormat: 'png',
    defaultImageSize: 2048,
    getAllUsers: true,
    intents: 34799,
    restMode: true,
    maxReconnectAttempts: Infinity,
    ws: {
      perMessageDeflate: true
    },
    allowedMentions: {
      everyone: false,
      roles: false,
      users: true,
      repliedUser: true
    },
    autoreconnect: true
  },
  guild_support: {
    id: '468877023926943764',
    notifyRole: '482366922822909982',
    muteRole: '703018773216755752',
    staffRole: '554039524309860362',
    eventLog: '468880753195745291',
    memberRole: '468884032399081473',
    infoChannel: '483056680980971531',
    welcomeChannel: '468878407711719435',
    leaveChannel: '468878407711719435',
    modLog: '468881393787863052',
    botRole: '481833458306514944',
    botMain: '481282441294905344',
    booster: {
      boosterRole: '639201662937858049',
      channelID: '604358550541565983',
      donateRoleID: '481829963767480360',
      value: 20000
    }
  }
}
