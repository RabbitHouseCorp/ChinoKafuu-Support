const lavalinkManager = require("../lavalink/lavalinkManager")
module.exports = class {
	constructor(client) {
		this.client = client
	}

	async run() {

		let guilds = await this.client.shardManager.getAllSizeObject("guilds")
		let users = await this.client.shardManager.getAllSizeObject("users")
		console.log(`${this.client.user.username} has been connected to Discord`)
		this.client.owner = await this.client.users.fetch("395788326835322882")
		this.client.lavalinkManager = new lavalinkManager(this.client)
		let status = [
			{ name: `se precisar de suporte, use ${this.client.config.prefix}ajuda`, type: "PLAYING" },
			{ name: `descubra os meus comandos usando ${this.client.config.prefix}comandos`, type: "PLAYING" },
			{ name: "com a Cocoa Hoto no Rabbit House 🐰", type: "WATCHING" },
			{ name: "🐦 me siga no twitter: @ChinoKafuuBot", type: "PLAYING" },
			{ name: `eu fui criada por ${this.client.owner.tag}`, type: "PLAYING" },
			{ name: `me adicione usando ${this.client.config.prefix}convite`, type: "LISTENING" },
			{ name: `alegria para ${Number(users).toLocaleString()} usuários!`, type: "STREAMING", url: "https://www.twitch.tv/danielagc" },
			{ name: `entre em meu servidor de suporte usando ${this.client.config.prefix}ajuda`, type: "PLAYING" },
			{ name: "Gochuumon Wa Usagi Desu Ka?", type: "WATCHING" },
			{ name: `se encontrou algum bug, use ${this.client.config.prefix}ajuda e avise a minha equipe de desenvolvimento.`, type: "STREAMING", url: "https://www.twitch.tv/danielagc" },
			{ name: "coelhos são fofos, ninguém discorda disso! 🐰", type: "STREAMING", url: "https://twitch.tv/danielagc" },
			{ name: `muito amor para ${Number(users).toLocaleString()} usuários`, type: "STREAMING", url: "https://twitch.tv/danielagc" },
			{ name: "café é a minha bebida favorita.", type: "PLAYING" }
		]

		setInterval(() => {
			let randomStatus = status[Math.floor(Math.random() * status.length)]
			this.client.user.setPresence({ activity: randomStatus })
		}, 30000)
	}
}