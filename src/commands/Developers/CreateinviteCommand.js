const Command = require("../../structures/command")
module.exports = class CreateinviteCommand extends Command {
    constructor(client) {
       super(client, {
           name: 'createinvite',
           category: 'developers',
           aliases: ['criarconvite'],
           UserPermission: null,
           ClientPermission: null,
           OnlyDevs: true,
           hidden: true,
       })
   } 
   async run({message, args, server}, t) {
            
        const guild = args.join(' ')
        if (!guild) return message.channel.send(`<:chino_error:545356006629310495> **|** ${message.author} Indique o ID ou nome do servidor que você deseja pegar o convite.`)
        let guilds = this.client.guilds.get(args[0]) || this.client.guilds.find(g => g.name === guild)
        if (!guilds.member(this.client.user).hasPermission('CREATE_INSTANT_INVITE')) return message.channel.send(`<:chino_sad:557754777136791582> **|** ${message.author} Eu não tenho permissão para criar convites nesse servidor.`)
        let invite = await this.client.guilds.get(guilds.id).channels.random().createInvite()

        message.channel.send(`<:chino_peek:564106497882062890> **|** ${message.author} Aqui está o convite: ${invite}`)
    }
}