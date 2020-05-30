const Command = require("../../structures/command")
const moment = require("moment")
const { MessageEmbed } = require("discord.js")
module.exports = class ChannelInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: "channelinfo",
			category: "util",
			aliases: ["chatinfo"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === args.join(" ")) || message.channel

		const embed = new MessageEmbed()
			.setColor(this.client.colors.default)
			.addField(t("commands:channelinfo.mention"), `\`${channel}\``, true)
			.addField(t("commands:channelinfo.id"), `\`${channel.id}\``, true)
			.addField(t("commands:channelinfo.nsfw"), channel.nsfw ? t("commands:channelinfo.true") : t("commands:channelinfo.false"), true)
			.addField(t("commands:channelinfo.guild"), `\`${channel.guild.name}\``, true)
			.addField(t("commands:channelinfo.category"), channel.parent ? channel.parent.name : "This channel is not in any category.", true)
			.addField(t("commands:channelinfo.created-at"), moment.utc(channel.createdAt).format("LLLL"), true)

		message.channel.send(embed)
	}
}
