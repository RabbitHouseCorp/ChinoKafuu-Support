const i18next = require('i18next')
const fs = require('fs')
const translationBackend = require('i18next-node-fs-backend')
const { RichEmbed } = require("discord.js")
const moment = require("moment")
const cooldown = new Map()
require("moment-duration-format")
module.exports = class MessageReceive {
    constructor(client) {
        this.client = client
    }

    async run(message) {

        if (message.channel.type === 'dm') return;
        if (message.author.bot) return;

        let server = await this.client.database.Guilds.findById(message.guild.id)
        if (!server) {
          this.client.database.Guilds({
            _id: message.guild.id
          }).save()
        }
        let user = await this.client.database.Users.findById(message.author.id)
        if (!user) {
            this.client.database.Users({
                _id: message.author.id
            }).save()
        }
      

        let t;
        const setFixedT = function (translate) {
            t = translate
        }

        const language = (server && server.lang) || 'pt-BR'
        setFixedT(i18next.getFixedT(language))

        return new Promise(async (resolve, reject) => {
            i18next.use(translationBackend).init({
                ns: ['commands', 'events', 'permissions'],
                preload: await fs.readdirSync('./src/locales/'),
                fallbackLng: 'pt-BR',
                backend: {
                    loadPath: `./src/locales/{{lng}}/{{ns}}.json`
                },
                interpolation: {
                    escapeValue: false
                },
                returnEmptyString: false
            }, async (err, f) => {
                if (f) {
                    if (message.mentions.users.size > 0) {
                        message.mentions.users.forEach(async (member) =>  {
                          if (!member) return
                          let user = await this.client.database.Users.findById(member.id)
                          if (user) {
                              if (user.afk) {
                                  if (!user.afkReason) {
                                      message.reply(`\`${member.tag}\` ${t("commands:afk.no-reason")}`)
                                      return
                                  }

                                  message.reply(`\`${member.tag}\` ${t("commands:afk.with-reason", {reason: user.afkReason})}`)
                              }
                          }
                        })
                    }
                    
                    let member = await this.client.database.Users.findById(message.author.id)
                    
                    if (member) {
                        if (member) {
                            member.afk = false
                            member.afkReason = null
                            member.save()
                        }
                    }

                    if (message.content === message.guild.me.toString()) {
                        message.channel.send(`${t("events:mention.start")} ${message.author}, ${t("events:mention.end", {prefix: server.prefix})}`)
                    }
                    /*if (server.partner) {
                        message.guild.members.filter(member => message.guild.member(member).hasPermission("MANAGE_GUILD")).forEach(member => {
                            if (!member.user.bot) {
                                let role = this.client.guilds.get("468877023926943764").roles.get("481830059628429322")
                                this.client.guilds.get("468877023926943764").members.get(member.id).addRole(role.id)
                            }
                        })
                    }*/
                    
                    if (!message.content.startsWith(server.prefix)) return;
                    const args = message.content.slice(server.prefix.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase()
                    const comando = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
                    
                    if (user.blacklist) {
                        const embed = new RichEmbed()
                        .setColor(this.client.colors.moderation)
                        .setAuthor("Você foi banido", message.author.displayAvatarURL)
                        .setDescription(`Olá ${message.author}, parece que você fez besteira que acabou quebrando os meus termos de uso, devido à isto, você foi banido de me usar.`)
                        .addField("Motivo", user.blacklistReason)
                        .addField("Banido injustamente?", `Se você acha que foi banido injustamente, então entre em contato com a ${this.client.users.get("395788326835322882").tag} ou entre no meu servidor de suporte.`)

                        message.author.send(embed).catch(err => {
                            message.channel.send(embed)
                        })
                        return
                    }

                    if (server.commandNull === true) {
                        if (!comando) return message.chinoReply("error", t("events:command-null"))
                    } else {
                        if (!comando) return
                    }

                    if (comando.config.OnlyDevs) {
                        if (!this.client.config.owners.includes(message.author.id)) return message.chinoReply('error', t('permissions:ONLY_DEVS')) 
                    }
			        if (cooldown.has(message.author.id)) {
                        let time = cooldown.get(message.author.id)
                        return message.chinoReply("error", t("events:cooldown.message", {time: (time - Date.now() > 1000) ? moment.utc(time - Date.now()).format(`ss [${t("events:cooldown.secounds")}]`) : moment.duration(time - Date.now()).format(`[${t("events:cooldown.milliseconds")}]`)}))
                        
                      }
                      cooldown.set(message.author.id, Date.now() + 5000)
                      
                      setTimeout(() => {
                          cooldown.delete(message.author.id)
                      }, 5000)

                    let userPermission = comando.config.UserPermission
                    let clientPermission = comando.config.ClientPermission
                    if (userPermission !== null) {
                        if (!message.member.hasPermission(userPermission)) {
                            let perm = userPermission.map(value => t(`permissions:${value}`)).join(', ')
                            return message.chinoReply("error", `${t('permissions:USER_MISSING_PERMISSION', {perm: perm})}`)
                        }
                    }
                    if (clientPermission !== null) {
                        if (!message.member.hasPermission(clientPermission)) {
                            let perm = clientPermission.map(value => t(`permissions:${value}`)).join(', ')
                            return message.chinoReply("error", `${t('permissions:CLIENT_MISSING_PERMISSION', {perm: perm})}`)
                        }
                    }
                    try {
                        comando.setT(t)
                        new Promise((res, rej) => {
                            message.channel.startTyping()
                            res(comando.run({message, args, server}, t))
                        }).then(() => message.channel.stopTyping()).catch(err => {
                            message.channel.stopTyping()
                            if (err.stack.length > 1800) {
                                err.stack = err.stack.substr(0, 1800)
                                err.stack = `${err.stack}...`
                              }
                              const embed = new RichEmbed()
                              .setColor(this.client.colors.error)
                              .setTitle(`${this.client.emotes.chino_sad} ${t("events:error")} ${this.client.emotes.chino_chibi}`)
                              .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
                  
                              message.channel.send(embed)
                        })
                    } catch (err) {
                        message.channel.stopTyping()
                        console.error(err.stack)
                    }
                }
            })
        })
    }
}
