/** @param {NS} ns */
export async function main(ns) {
	await ns.installBackdoor();
	ns.rm("BackDoorScript.js");
}
