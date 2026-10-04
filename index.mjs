import { stdin } from "node:process";
import { buffer } from "node:stream/consumers";

import * as flexbuffers from "flatbuffers/mjs/flexbuffers.js";

const stdin2buffer = () => buffer(stdin);

const buf2obj = (buf) => flexbuffers.toObject(buf);

const stdin2obj = () => {
	const pnbuf = stdin2buffer();
	const pbuf = pnbuf.then((nbuf) => nbuf.buffer);
	return pbuf.then(buf2obj);
};

const obj2stdout = (obj) => () => console.info(obj);

const io_main = () => {
	return Promise.resolve().then((_) => {
		const pobj = stdin2obj();
		return pobj.then((obj) => {
			obj2stdout(obj)();
		});
	});
};

io_main().catch(console.error);
