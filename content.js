const browserObject = typeof chrome !== 'undefined' ? chrome : typeof browser !== 'undefined' ? browser : null

const getRuntimeURL = (file) => {
	if (!browserObject) return file

	return browserObject.runtime.getURL(file)
}

const setCustomCursorOnVideoPlayer = () => {
	const videoPlayer = document.querySelector('.video-player')

	if (!videoPlayer) return

	// cursor image should be 32x32 pixels
	videoPlayer.style.cursor = `url('${getRuntimeURL('images/strawberry_emoji.png')}'), auto`
}

const setCustomStreamChatHeader = () => {
	const streamChatHeader = document.querySelector('#chat-room-header-label')

	if (!streamChatHeader) return

	streamChatHeader.innerHTML = 'Berry Chat 🍓'
}

// watch whenever a new message is posted. if so, check the username. if it matches set add a badge image to the message
const watchNewMessages = () => {
	const chatMessages = document.querySelector('.chat-scrollable-area__message-container, main.seventv-chat-list')

	if (!chatMessages) return

	const chatters = [
		{
			name: 'Berry_Ninja',
			badge: 'strawberry_emoji.png',
			title: 'Streamer Berry',
		},
		{
			name: 'Babysanta_',
			badge: 'strawberry_emoji.png',
			title: 'Santa Berry',
		},
		{
			name: 'Rubijuana',
			badge: 'strawberry_emoji.png',
			title: 'Mega Mod Berry',
		},
		{
			name: 'tinyzucchini',
			badge: 'strawberry_emoji.png',
			title: 'Hacker Berry',
		},
		{
			name: 'Kanalrattenpool',
			badge: 'strawberry_emoji.png',
			title: 'Official Meme Berry',
		},
		{
			name: 'sophie29__',
			badge: 'strawberry_emoji.png',
			title: 'Waffle Berry',
		},
		{
			name: 'sinthoras0402',
			badge: 'strawberry_emoji.png',
			title: 'DM Berry',
		},
		{
			name: 'Keru_der_Otaku',
			badge: 'strawberry_emoji.png',
			title: 'Gamer Guide Berry',
		},
		{
			name: 'rex_eisblut',
			badge: 'strawberry_emoji.png',
			title: 'Rare Berry',
		},
		{
			name: 'lexisnightdawn',
			badge: 'strawberry_emoji.png',
			title: 'Berry',
		},
		{
			name: 'ahornalpaka',
			badge: 'strawberry_emoji.png',
			title: 'Berry',
		},
		{
			name: 'daniel__eder',
			badge: 'strawberry_emoji.png',
			title: 'Berry',
		},
	]

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			mutation.addedNodes.forEach((addedNode) => {
				if (!addedNode.querySelector) return

				const badgeContainer = addedNode.querySelector(
					'.chat-line__username-container > span:first-child:not(.chat-line__username), .seventv-chat-user-badge-list'
				)

				if (!badgeContainer) return

				const usernameWrapper = addedNode.querySelector('.chat-author__display-name, .seventv-chat-user-username')

				if (!usernameWrapper) return

				const username = usernameWrapper.innerText.trim()

				const chatter = chatters.find((chatter) => chatter.name === username)

				if (!chatter) return

				const badge = document.createElement('img')
				badge.src = getRuntimeURL(`images/${chatter.badge}`)
				badge.style.width = '20px'
				badge.style.height = '20px'
				badge.style.marginRight = '5px'
				badge.title = chatter.title
				badge.alt = chatter.title

				badgeContainer.prepend(badge)
			})
		})
	})

	observer.observe(chatMessages, {
		childList: true,
		subtree: true,
	})
}

const watchFor7TVLoaded = async () => {
	// wait until 7TV is loaded (max. 5 times)
	let i = 0

	while (!window.seventv) {
		if (i > 5) return

		await new Promise((resolve) => setTimeout(resolve, 1000))

		i++
	}

	if (!window.seventv) return

	// watch for new messages
	watchNewMessages()
}

const init = async () => {
	// wait some time until everything is loaded
	await new Promise((resolve) => setTimeout(resolve, 5000))

	setCustomStreamChatHeader()
	setCustomCursorOnVideoPlayer()
	watchNewMessages()
	watchFor7TVLoaded()
}

init()
