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
			if (RegExp(/darkweb/).test(dic[i]) == false && ns.hasRootAccess(dic[i]) != false && ns.getServerMaxMoney(dic[i]) != 0) {
				if (ns.getServerSecurityLevel(dic[i]) > ns.getServerMinSecurityLevel(dic[i]) + 5) {
					await ns.weaken(dic[i]);
				} else if (ns.getServerMoneyAvailable(dic[i]) < ns.getServerMaxMoney(dic[i]) * 0.75) {
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
