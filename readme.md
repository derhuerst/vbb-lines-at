# vbb-lines-at

**Which lines run at a station?** The data is computed from [open](https://daten.berlin.de/datensaetze/vbb-fahrplandaten-gtfs) [GTFS](https://developers.google.com/transit/gtfs/) [data](https://vbb-gtfs.jannisr.de/).

[![npm version](https://img.shields.io/npm/v/vbb-lines-at.svg)](https://www.npmjs.com/package/vbb-lines-at)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/vbb-lines-at.svg)
[![support me via GitHub Sponsors](https://img.shields.io/badge/support%20me-donate-fa7664.svg)](https://github.com/sponsors/derhuerst)
[![chat with me on Twitter](https://img.shields.io/badge/chat%20with%20me-on%20Twitter-1da1f2.svg)](https://twitter.com/derhuerst)


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
