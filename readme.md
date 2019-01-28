# vbb-lines-at

**Which lines run at a station?** The data is computed from [open](https://daten.berlin.de/datensaetze/vbb-fahrplandaten-gtfs) [GTFS](https://developers.google.com/transit/gtfs/) [data](https://vbb-gtfs.jannisr.de/).

[![npm version](https://img.shields.io/npm/v/vbb-lines-at.svg)](https://www.npmjs.com/package/vbb-lines-at)
[![build status](https://img.shields.io/travis/derhuerst/vbb-lines-at.svg)](https://travis-ci.org/derhuerst/vbb-lines-at)
[![dependency status](https://img.shields.io/david/derhuerst/vbb-lines-at.svg)](https://david-dm.org/derhuerst/vbb-lines-at)
[![dev dependency status](https://img.shields.io/david/dev/derhuerst/vbb-lines-at.svg)](https://david-dm.org/derhuerst/vbb-lines-at#info=devDependencies)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-lines-at.svg)
[![gitter channel](https://badges.gitter.im/derhuerst/vbb-rest.svg)](https://gitter.im/derhuerst/vbb-rest)
[![support me on Patreon](https://img.shields.io/badge/support%20me-on%20patreon-fa7664.svg)](https://patreon.com/derhuerst)


## Installing

```shell
npm install vbb-lines-at
```


## Usage

```js
require('vbb-lines-at')['900000007103'] // U Voltastr.
```

It will return `lines` in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).

```js
[
	{
		type: 'line',
		id: '17525_400',
		name: 'U8',
		mode: 'train',
		product: 'subway'
	}, {
		type: 'line',
		id: '17472_700',
		name: 'N8',
		mode: 'bus',
		product: 'bus'
	}, {
		type: 'line',
		id: '17363_700',
		name: '247',
		mode: 'bus',
		product: 'bus'
	}
]
```


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/vbb-lines-at/issues).
