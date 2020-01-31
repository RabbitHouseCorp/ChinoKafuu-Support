const Command = require("../../structures/command")
const NekosLife = require("nekos.life")
const neko = new NekosLife()
const { MessageEmbed } = require("discord.js")
module.exports = class PatCommand extends Command {
	constructor (client) {
		super (client, {
			name: "tickle",
			category: "fun",
			aliases:["cocegas"],
			UserPermission: null,
			ClientPermission: null,
			OnlyDevs: false
		})
	}
	async run({message, args, server}, t) {
		let member = message.mentions.users.first() || this.client.users.get(args[0])
		if (!member) return message.chinoReply("error", t("commands:mention-null"))
		let img = await neko.sfw.tickle()
		const embed = new MessageEmbed()
			.setColor(this.client.colors.action)
			.setDescription(t("commands:tickle", {author: message.author.toString(), member: member.toString()}))
			.setImage(img.url)
        
		message.channel.send(embed)
	}
}