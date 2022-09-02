const fuse = require("fuse.js");
const inqu = require("inquirer");
const gm = require("./gm.json");
const chalk = require("chalk");
const fs = require("fs");



async function main() {
	console.log();

	let { gmlookup: item } = await inqu.prompt({
		type: "input",
		message: "Search for an item:",
		prefix: ">",
		name: "gmlookup",
	});
	const search = new fuse(gm, { keys: ["name"] });
	search.search(item).forEach((v, i) => {
		if (i > 10) return;
		item = v.item;
		console.log(`[ ${item.category} ] ${chalk.cyanBright(item.name)} : ${chalk.bold(item.id)}`);
	});

	main();
}

main();

function generateGMJson() {
	const file = fs.readFileSync("./gm.txt", "utf-8");
	const file2 = file.split("\n");
	const gm = [];
	let currentCat;

	file2.forEach((t, i) => {
		// if (i > 100) return;
		if (t.startsWith("//")) {
			let cat = t.split("// ")[1];
			currentCat = cat;
			return;
		}
		let id = t.split(" :")[0];
		let name = t.split(": ")[1];
		gm.push({
			id: id,
			name: name,
			category: currentCat,
		});
	});

	fs.writeFileSync(`./gm1.json`, JSON.stringify(gm));
}
