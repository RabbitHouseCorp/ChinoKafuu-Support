const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            category: 'mod',
            aliases: ['banir'],
            UserPermission: ["BAN_MEMBERS"],
            ClientPermission: ["BAN_MEMBERS"],
            OnlyDevs: false,
            hidden: false,
        })
    }
    run({message, args, server}, t) {

        const member = message.mentions.users.first() || this.client.users.get(args[0])
        if (!member) return message.chinoReply('error', t('commands:mention-null'))
        let reason = args.slice(1).join(' ')
        if (!reason) {
            reason = t("commands:no-reason")
        }
        
        if (member.id == message.author.id) return message.chinoReply('error', t('commands:ban.banAuthor'))
        if (!message.guild.member(member).bannable) return message.chinoReply('error', t('commands:ban.bannable'))
        if (message.member.roles.highest.position < message.guild.member(member).roles.highest.position) return message.chinoReply("error", t("commands:punishment.unpunished"))

        const embed = new MessageEmbed()
        .setTitle(t('commands:ban.banned', {member: member.tag}))
        .setColor(this.client.colors.moderation)
        .setThumbnail(member.displayAvatarURL())
        .addField(t('commands:punishment.embed.memberName'), member.tag, true)
        .addField(t('commands:punishment.embed.memberID'), member.id, true)
        .addField(t('commands:punishment.embed.staffName'), message.author.tag, true)
        .addField(t('commands:punishment.embed.reason'), reason, true)

        message.guild.member(member).ban({
            days: 7,
            reason: reason
        }).then(() => {
            message.channel.send(embed)

            if (server.punishModule) {
                message.guild.channels.get(server.punishChannel).send(embed).catch(err => {
                    message.channel.send(t("events:channel-not-found"))
                })
            }
        })
    }
}