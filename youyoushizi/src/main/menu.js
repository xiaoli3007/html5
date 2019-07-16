const {
	app,
	Menu,
	dialog
} = require('electron')

const template = [{
		label: '设置',
		submenu: [{
			role: 'audio',
			label: '阅读声音',
			submenu: [{
					role: 'man',
					label: '男声'
				},
				{
					role: 'women',
					label: '女声'
				},
			]
		}, {
			role: 'toggleFullScreen',
			label: '全屏',
		},]
	},
	{
		label: '帮助',
		role: 'help',
		submenu: [{
			label: '官网',
			click() {
				require('electron').shell.openExternal('http://www.youyoushizi.com')
			}
		}, {
			label: '关于我们',
			click() {
				dialog.showMessageBox({
					title: '优优识字',
					type: 'none',
					detail: '优优识字是一款面向幼儿、中小学生的识字软件',
					buttons: ['OK']
				})
			}
		}]
	}
]

if (process.platform === 'darwin') {
	template.unshift({
		label: app.getName(),
		submenu: [{
				role: 'about'
			},
			{
				type: 'separator'
			},
			{
				role: 'services'
			},
			{
				type: 'separator'
			},
			{
				role: 'hide'
			},
			{
				role: 'hideothers'
			},
			{
				role: 'unhide'
			},
			{
				type: 'separator'
			},
			{
				role: 'quit'
			}
		]
	})

	// Edit menu
	template[1].submenu.push({
		type: 'separator'
	}, {
		label: 'Speech',
		submenu: [{
				role: 'startspeaking'
			},
			{
				role: 'stopspeaking'
			}
		]
	})

	// Window menu
	template[3].submenu = [{
			role: 'close'
		},
		{
			role: 'minimize'
		},
		{
			role: 'zoom'
		},
		{
			type: 'separator'
		},
		{
			role: 'front'
		}
	]
}

const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
