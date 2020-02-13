const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
module.exports = class EatCommand extends Command {
	constructor(client) {
		super(client, {
			name: "eat",
			category: "fun",
			aliases: ["comer"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({ message, args, server }, t) {
		let member = message.mentions.users.first() || this.client.users.cache.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mentioNull"))
		let img = await neko.sfw.feed()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setImage(img.url)
			.setDescription(t("commands:eat", { author: message.author.toString(), member: member.toString() }))

		message.channel.send(embed)
	}
}