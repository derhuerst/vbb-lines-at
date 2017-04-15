'use strict'

const lines = require('vbb-lines')
const sink = require('stream-sink')
const assert  = require('assert')

const linesAt = require('.')

const linesAtVoltastr = [
	{
		type: 'line',
		id: '17472_700',
		name: 'N8',
		mode: 'bus',
		product: 'bus'
	}, {
		type: 'line',
		id: '17525_400',
		name: 'U8',
		mode: 'train',
		product: 'subway'
	}, {
		type: 'line',
		id: '17363_700',
		name: '247',
		mode: 'bus',
		product: 'bus'
	}
]



lines('all')
.pipe(sink('object'))
.then((lines) => {
	lines = lines.reduce((all, line) => {
		all[line.id + ''] = line
		return all
	}, {})

	for (let station in linesAt) {
		const linesAtStation = linesAt[station]
		assert(Array.isArray(linesAtStation), 'entry is not an array')
		for (let line of linesAtStation) {
			assert(typeof line.id, 'number', 'line id is not a number')
			assert(lines[line.id], `line ${line.id} does not exist`)
			assert(line.name, 'line name does not exist or is empty')
			assert(line.type, 'line type does not exist or is empty')
		}
	}

	assert.deepStrictEqual(linesAt['900000007103'], linesAtVoltastr)
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
