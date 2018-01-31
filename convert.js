'use strict'

const fs = require('fs')
const path = require('path')
const stops = require('vbb-stations/full.json')
const lines = require('vbb-lines')
const weights = require('vbb-mode-weights')
const parse = require('vbb-parse-line')
const pick = require('lodash.pick')
const sink = require('stream-sink')
const trips = require('vbb-trips')
const through = require('through2')

// link stops to stations
for (let stationId in stops) {
	const station = stops[stationId]
	for (let stop of station.stops)
		stops[stop.id] = station
}



const computeLinesAt = (linesAt, lines) => (schedule, _, cb) => {
	const line = lines.find((line) => line.id === schedule.route.line)
	if (!line) {
		console.error(`line ${schedule.route.line} of schedule ${schedule.id} does not exist`)
		cb()
		return
	}

	let base = weights[line.product] || .2
	const parsed = parse(line.name)
	if (parsed.type === 'bus' && (parsed.express || parsed.express)) base += .05

	let weight = 0
	for (let variant of line.variants) {
		// todo: number of trips
		weight += base * variant.length
	}

	for (let variant of line.variants) {
		for (let stopId of variant) {
			const station = stops[stopId]
			if (!station) {
				console.error('Unknown stop', stopId, 'of line', line.id)
				continue
			}
			if (!linesAt[station.id]) linesAt[station.id] = []

			if (!linesAt[station.id].some((l) => l.id === line.id)) {
				const lineAt = Object.assign({weight}, line)
				linesAt[station.id].push(lineAt)
			}
		}
	}

	cb()
}



const writeJSON = (data, file) => new Promise((yay, nay) => {
	fs.writeFile(path.join(__dirname, file), JSON.stringify(data), (err) => {
		if (err) nay(err)
		else yay()
	})
})

lines('all')
.pipe(sink('object'))
.then((lines) => new Promise((yay, nay) => {
	const linesAt = {}

	trips.schedules()
	.pipe(through.obj(computeLinesAt(linesAt, lines)))

	.on('data', () => {})
	.once('end', () => yay(linesAt))
	.once('error', (err) => nay(err))
}))
.then((linesAt) => {
	for (let station in linesAt) {
		linesAt[station] = linesAt[station]
		.sort((a, b) => b.weight - a.weight)
		.map((line) => pick(line, ['type', 'id', 'name', 'mode', 'product']))
	}
	return writeJSON(linesAt, 'data.json')
})
.catch((err) => {
	console.error(err)
	process.exit(1)
})
