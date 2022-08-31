const fuse = require("fuse.js");
const inqu = require("inquirer");
const gm = require("./GM.json");
const chalk = require("chalk");

inqu.registerPrompt("autocomplete", require("inquirer-autocomplete-prompt"));

async function main() {
	let { gmlookup: item } = await inqu.prompt({
		type: "input",
		message: "Search for an item",
		prefix: ">",
		name: "gmlookup",
	});
	const search = new fuse(gm.array);
	search.search(item).forEach((v, i) => {
		if (i > 10) return;
		id = gm.object[v.item];
		console.log(`${chalk.cyanBright(v.item)} ${chalk.bold(id)}`);
	});

	// let { gmlookup: item } = await inqu.prompt({
	// 	type: "autocomplete",
	// 	message: "Search for item",
	// 	prefix: ">",
	// 	name: "gmlookup",
	// 	emptyText: "Unable to find item...",
	// 	source: (answers, input = "") =>
	// 		new Promise((resolve) => {
	// 			try {
	// 				search = new fuse(gm.array);
	// 				resolve(
	// 					search.search(input).map((v) => {
	// 						id = gm.object[v.item];
	// 						return `${chalk.cyanBright(v.item)} ${chalk.bold(id)}`;
	// 					})
	// 				);
	// 			} catch (err) {
	// 				console.log(err);
	// 			}
	// 		}),
	// });

	main();
}

main();
