'use strict'

const fs = require('fs')
const path = require('path')
const sink = require('stream-sink')
const stops = require('vbb-stations/full.json')
const lines = require('vbb-lines')

// link stops to stations
for (let stationId in stops) {
	const station = stops[stationId]
	for (let stop of station.stops)
		stops[stop.id] = station
}



const computeLinesAt = (lines) => {
	const linesAt = {}
	for (let line of lines) {
		for (let variant of line.variants) {
			for (let stopId of variant) {
				const station = stops[stopId]
				if (!station) {
					console.error('Unknown stop', stopId)
					continue
				}
				if (!linesAt[station.id]) linesAt[station.id] = []

				if (!linesAt[station.id].some((l) => l.id === line.id))
					linesAt[station.id].push({
						id: line.id, name: line.name, type: line.type
					})
			}
		}
	}
	return linesAt
}



const writeJSON = (data, file) => new Promise((yay, nay) => {
	fs.writeFile(path.join(__dirname, file), JSON.stringify(data), (err) => {
		if (err) nay(err)
		else yay()
	})
})

lines('all')
.pipe(sink('object'))
.then(computeLinesAt)
.then((linesAt) => writeJSON(linesAt, 'data.json'))
.catch((err) => {
	console.error(err)
	process.exit(1)
})
