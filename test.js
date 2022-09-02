const fs = require("fs");
const chalk = require("chalk");
const readline = require("readline");
const path = require("path");
const templates = {};

fs.readdirSync("./template").forEach((file) => {
	templates[file.split(".")[0]] = fs.readFileSync(path.join("./template", file), "utf8");
});

console.log(templates.motd);

const exampleArtifact = {
	name: "Witch's plume idk",
	id: "12345",
	desc: "A description of this amazing artifact",
	set: "Crimson Witch of Flames",
	type: "Plume of Death",
};

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

console.log(
	templates.artifact
		.replace("%n", chalk.cyan(exampleArtifact.name))
		.replace("%id", chalk.bold(exampleArtifact.id))
		.replace("%s", chalk.rgb(200, 200, 200)(exampleArtifact.set))
		.replace("%t", chalk.rgb(255, 240, 150)(exampleArtifact.type))
		.replace("%d", exampleArtifact.desc)
		.replace("%c1", chalk.bgWhite("A"))
		.replace("%c2", chalk.bgWhite("ENTER"))
);

process.stdin.on("keypress", (str, key) => {
	if (key.ctrl && key.name === "c") process.exit();
});

console.log("Press any key...");
