const Command = require("../../structures/command")
const { MessageEmbed } = require('discord.js')
module.exports = class DanceCommand extends Command {
    constructor (client) {
        super (client, {
            name: 'dance',
            category: 'fun',
            aliases: [],
            UserPermission: null,
            ClientPermission: null,
            OnlyDevs: false,
            hidden: false
        })
    }
    async run({message, args, server}, t) {
        let member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        let img = this.client.apis.dance[this.client.apis.dance.length]
        const embed = new MessageEmbed()
        .setColor(this.client.colors.action)
        .setImage(img)
        .setDescription(t('commands:dance', {author: message.author.toString(), member: member.toString()}))

        message.channel.send(embed)
    }
}