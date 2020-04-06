const Command = require("../../structures/command")
const { MessageEmbed } = require("discord.js")
module.exports = class EvalCommand extends Command {
	constructor(client) {
		super(client, {
			name: "eval",
			category: "developers",
			aliases: ["e"],
			UserPermission: null,
			ClientPermission: ["EMBED_LINKS"],
			OnlyDevs: true
		})
	}
	run({ message, args, server, user }, t) {
		try {
			let util = require("util")
			let code = args.join(" ").replace(/(^`{3}(\w+)?|`{3}$)/g, '')
			let ev = eval(code)
			let str = this.clean(util.inspect(ev, {
				depth: 0
			}))
			str = `${str.replace(new RegExp(`${this.client.token}`, "g"), "undefined")}`
			if (str.length > 1800) {
				str = str.substr(0, 1800)
				str = str + "..."
			}

			message.channel.send(str, { code: "js" })

		} catch (err) {
			if (err.stack.length > 1800) {
				err.stack = err.stack.substr(0, 1800)
				err.stack = `${err.stack}...`
			}
			const embed = new MessageEmbed()
				.setColor(this.client.colors.error)
				.setTitle(`${this.client.emotes.chino_sad} ${t("events:error")} ${this.client.emotes.chino_chibi}`)
				.setDescription(`\`\`\`js\n${err.stack}\`\`\``)

			message.channel.send(embed)
		}
	}
	clean(text) {
		const blankSpace = String.fromCharCode(8203)
		return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
	}
}