const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class ServericonCommand extends Command {
	constructor(client) {
		super(client, {
			name: "servericon",
			category: "util",
			aliases: [],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	run({ message, args, server }, t) {

		let guild = this.client.guilds.get(args[0])
		if (!guild) {
			guild = message.guild
		}
		if (!guild.icon) return message.chinoReply("error", t("commands:servericon.no-icon"))
		const img = guild.iconURL({ size: 2048 })
		const embed = new MessageEmbed()
			.setImage(img)
			.setColor(this.client.colors.default)
			.setDescription(`[Download](${img})`)

		message.channel.send(embed)

	}
}