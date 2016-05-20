'use strict'

const data   = require('vbb-static')
const path   = require('path')
const fs     = require('fs')



const onError = (err) => {
	if (err) {
		console.error(err.stack)
		process.exit(1)
	}
	return err
}
const byId = (s) => new Promise((yay, nay) => {
	const data = {}
	s.on('error', nay).on('end', () => yay(data))
	.on('data', (thing) => {data[thing.id] = thing})
})



byId(data.lines('all')).catch(onError)
.then((lines) => {

	const linesAt = {}
	data.trips('all')
	.on('data', (trip) => {
		const line = lines[trip.lineId]
		if (!line) return console.error(`unknown line id ${trip.lineId}`)

		for (let stop of trip.stations) {
			if (!(stop.s in linesAt)) linesAt[stop.s] = []
			if(!linesAt[stop.s].find((l) => l.id === line.id))
				linesAt[stop.s].push({
					  id:   line.id
					, name: line.name
					, type: line.type
				})
		}
	})
	.on('error', console.error)
	.on('end', () => {
		const dest = path.join(__dirname, 'data.json')
		fs.writeFile(dest, JSON.stringify(linesAt), onError)
	})

}).catch(onError)
