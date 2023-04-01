/** @param {NS} ns */
export async function main(ns) {
	ns.disableLog("ALL");
	let root = [];
	function traverse(server, from) {
		let node = ns.scan(server);
		root = root.concat(node);
		for (let i = 0; i < node.length; i++) {
			let child = node[i]
			if (child == from) {
				continue;
			}
			let children = ns.scan(server);
			root = root.concat(children);
			if (children.length === 0) {
				continue;
			}
			traverse(child, server);
		}
	}
	traverse("home", "home");
	let all = [...new Set(root)];
	all.splice(all.indexOf("home"), 1);
	all.splice(all.indexOf("darkweb"), 1);
	ns.print("Scanned " + all.length + " Server.\n" + "Server list\n" + all);
	ns.enableLog("ALL");
	let dic = all;
	while (true) {
		for (let i = 0; dic.length > i; i++) {
			if (RegExp(/darkweb/).test(dic[i]) == false) {
				if (ns.hasRootAccess(dic[i]) == false) {
					let list = ns.ls("home");
					if (list.includes("BruteSSH.exe") == true) {
						await ns.brutessh(dic[i]);
						if (ns.getServerNumPortsRequired(dic[i]) == 1) {
							await ns.nuke(dic[i]);
						}
					} if (list.includes("FTPCrack.exe") == true) {
						await ns.ftpcrack(dic[i]);
						if (ns.getServerNumPortsRequired(dic[i]) == 2) {
							await ns.nuke(dic[i]);
						}
					} if (list.includes("relaySMTP.exe") == true) {
						await ns.relaysmtp(dic[i]);
						if (ns.getServerNumPortsRequired(dic[i]) == 3) {
							await ns.nuke(dic[i]);
						}
					} if (list.includes("HTTPWorm.exe") == true) {
						await ns.httpworm(dic[i]);
						if (ns.getServerNumPortsRequired(dic[i]) == 4) {
							await ns.nuke(dic[i]);
						}
					} if (list.includes("SQLInject.exe") == true) {
						await ns.sqlinject(dic[i]);
						if (ns.getServerNumPortsRequired(dic[i]) == 5) {
							await ns.nuke(dic[i]);
						}
					}
					if (ns.getServerNumPortsRequired(dic[i]) == 0) {
						await ns.nuke(dic[i]);
					}
				}
				if (ns.getServerRequiredHackingLevel(dic[i]) <= ns.getHackingLevel() && ns.hasRootAccess(dic[i]) != false && ns.getServerMaxMoney(dic[i]) > 0) {
					if (ns.getServerSecurityLevel(dic[i]) > ns.getServerMinSecurityLevel(dic[i]) + 5 && ns.getWeakenTime(dic[i]) <= 300000) {
						await ns.weaken(dic[i]);
					} else if (ns.getServerMoneyAvailable(dic[i]) < ns.getServerMaxMoney(dic[i]) * 0.75 && ns.getGrowTime(dic[i]) <= 300000) {
						await ns.grow(dic[i]);
					} else {
						try {
							await ns.hack(dic[i]);
						} catch {
							await ns.sleep(100);
						}
					}
				}
			}
		}
	}
}
