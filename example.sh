#!/bin/sh

input() {
	(
		echo REG
		echo SYM
		echo CHR
		echo BLK
		echo DIR
		echo PIP
		echo SCK
		echo UNK
	) |
		tr '\n' '\0'

	(
		printf '0815 1a13 1025 0e23 0c08 0108 0403 0506'
		printf '0107 0200 0808 0808 0808 0808 1024 01'
	) |
		xxd -r -ps
}

input |
	node ./index.mjs
