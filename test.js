'use strict'

const data    = require('vbb-static')
const assert  = require('assert')
const linesAt = require('./index')



new Promise((yay, nay) => {
	const lines = {}
	data.lines('all').on('error', nay).on('end', () => yay(lines))
	.on('data', (line) => {lines[line.id] = line})
}).then((lines) => {

	for (let station in linesAt) {
		const lines = linesAt[station]
		assert(Array.isArray(lines), 'entry is not an array')
		for (let line of lines) {
			assert(typeof line.id, 'number', 'line id is not a number')
			assert(lines[line.id], `line ${line.id} does not exist`)
			assert(line.name, 'line name does not exist or is empty')
			assert(line.type, 'line type does not exist or is empty')
		}
	}

})
