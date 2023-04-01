/** @param {NS} ns */
export async function main(ns) {
	let StockMarketScriptName = "auto_Stock_Market.js";
	let HackScriptName = "auto_hack.js";
	let SubHackScriptName = "auto_hack_address_to_home.js";
	let Stock_Market_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(StockMarketScriptName));
	if (Stock_Market_script_thread >= 1 && ns.isRunning(StockMarketScriptName, "home") == false) {
		await ns.exec(StockMarketScriptName, "home", 1);
		ns.print("**************************************************");
		ns.print("Start Stock Market on 1 threads");
		ns.print("**************************************************");
		ns.tprint("**************************************************");
		ns.tprint("Start Stock Market on 1 threads");
		ns.tprint("**************************************************");
	}
	let home_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(HackScriptName));
	if (home_script_thread >= 1 && ns.isRunning(HackScriptName, "home") == false) {
		await ns.exec(HackScriptName, "home", home_script_thread);
		ns.print("**************************************************");
		ns.print("Start Home Hack on " + home_script_thread + " threads");
		ns.print("**************************************************");
		ns.tprint("**************************************************");
		ns.tprint("Start Home Hack on " + home_script_thread + " threads");
		ns.tprint("**************************************************");
	}
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
			if (RegExp(/darkweb/).test(dic[i]) == false && ns.hasRootAccess(dic[i]) == false) {
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
			if (ns.hasRootAccess(dic[i]) != false && Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)) >= 1 && ns.isRunning(SubHackScriptName, dic[i]) == false) {
				await ns.scp(SubHackScriptName, dic[i]);
				await ns.exec(SubHackScriptName, dic[i], Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)));
				ns.print("==================================================");
				ns.print("Start Hack to " + dic[i] + " on " + Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)) + " threads");
				ns.print("==================================================");
			}
		}
		for (let i = 0; dic.length > i; i++) {
			if (ns.getServerRequiredHackingLevel(dic[i]) <= ns.getHackingLevel() && RegExp(/darkweb/).test(dic[i]) == false && ns.hasRootAccess(dic[i]) != false && ns.getServerMaxMoney(dic[i]) > 0) {
				if (ns.getServerSecurityLevel(dic[i]) > ns.getServerMinSecurityLevel(dic[i]) + 5) {
					ns.print("--------------------------------------------------");
					ns.print("Start weaken to " + dic[i]);
					await ns.weaken(dic[i]);
					ns.print("--------------------------------------------------");
				} else if (ns.getServerMoneyAvailable(dic[i]) < ns.getServerMaxMoney(dic[i]) * 0.75) {
					ns.print("--------------------------------------------------");
					ns.print("Start grow to " + dic[i]);
					await ns.grow(dic[i]);
					ns.print("--------------------------------------------------");
				}
			}
		}
	}
}
