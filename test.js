'use strict'

const lines = require('vbb-lines')
const sink = require('stream-sink')
const assert  = require('assert')

const linesAt = require('.')

const voltastr = 'de:11000:900007103'

const linesAtVoltastr = [
	{
		type: 'line',
		id: '17525_400',
		name: 'U8',
		mode: 'train',
		product: 'subway'
	// todo: fix once the VBB GTFS data has been fixed
	// }, {
	// 	type: 'line',
	// 	id: '17472_700',
	// 	name: 'N8',
	// 	mode: 'bus',
	// 	product: 'bus'
	// }, {
	// 	type: 'line',
	// 	id: '17363_700',
	// 	name: '247',
	// 	mode: 'bus',
	// 	product: 'bus'
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

	assert.deepStrictEqual(linesAt[voltastr], linesAtVoltastr)
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
