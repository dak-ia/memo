/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		let StockMarketScriptName = "auto_Stock_Market.js";
		let HackScriptName = "auto_hack.js";
		let SubHackScriptName = "auto_hack_address_to_home.js";
		let TixApi = ns.stock.purchaseTixApi();
		let MarketData = ns.stock.purchase4SMarketData();
		let MarketDataTixApi = ns.stock.purchase4SMarketDataTixApi();
		if (TixApi == true && MarketData == true && MarketDataTixApi == true) {
			if (ns.isRunning(StockMarketScriptName, "home") == false) {
				let Stock_Market_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(StockMarketScriptName));
				if (Stock_Market_script_thread < 1 && ns.isRunning(HackScriptName, "home") != false) {
					ns.kill(HackScriptName, "home");
				}
				await ns.exec(StockMarketScriptName, "home", 1);
				ns.print("**************************************************");
				ns.print("Start Stock Market on 1 threads");
				ns.print("**************************************************");
				ns.tprint("**************************************************");
				ns.tprint("Start Stock Market on 1 threads");
				ns.tprint("**************************************************");
			}
		}
		let home_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(HackScriptName));
		if (home_script_thread >= 1 && ns.isRunning(HackScriptName, "home") == false) {//もしも未実行で空きがあったら
			await ns.exec(HackScriptName, "home", home_script_thread);
			ns.print("**************************************************");
			ns.print("Start Home Hack on " + home_script_thread + " threads");
			ns.print("**************************************************");
			ns.tprint("**************************************************");
			ns.tprint("Start Home Hack on " + home_script_thread + " threads");
			ns.tprint("**************************************************");
		}
		home_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(HackScriptName));
		if (home_script_thread >= 1 && ns.isRunning(HackScriptName, "home") != false) {//もしも実行中で空きがあったらキルして再度最大で実行
			ns.kill(HackScriptName, "home");
			home_script_thread = Math.floor((ns.getServerMaxRam("home") - ns.getServerUsedRam("home")) / ns.getScriptRam(HackScriptName));
			await ns.exec(HackScriptName, "home", home_script_thread);
			ns.print("**************************************************");
			ns.print("ReStart Home Hack on " + home_script_thread + " threads");
			ns.print("**************************************************");
			ns.tprint("**************************************************");
			ns.tprint("ReStart Home Hack on " + home_script_thread + " threads");
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
		ns.purchaseTor();
		//ダークウェブへのアクセスのため
		let list = ns.ls("home");
		//ホームのファイルリスト取得
		let darkweblist = ns.getDarkwebPrograms();
		//ダークウェブで売っているもの取得
		for (let i = 0; darkweblist.length > i; i++) {
			if (list.includes(darkweblist[i]) != true && ns.getDarkwebProgramCost(darkweblist[i]) <= ns.getServerMoneyAvailable("home")) {
				ns.purchaseProgram(darkweblist[i]);
			}
			//所持ししておらず、所持金が足りたら購入
		}
		for (let i = 0; dic.length > i; i++) {
			if (RegExp(/darkweb/).test(dic[i]) == false && ns.hasRootAccess(dic[i]) == false) {
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
			//所持しているファイルで可能な限りポートを開ける
			if (ns.getServerRequiredHackingLevel(dic[i]) <= ns.getHackingLevel() && ns.hasRootAccess(dic[i]) == true) {
				let target = dic[i];
				let path = [];
				search("home", target, "home");
				path = path.filter(elm => {
					if (elm != "home" && isNaN(elm) == true) {
						return true;
					}
				});
				for (let n = 0; path.length > n; n++) {
					ns.connect(path[n]);
				}
				if (ns.getServerRequiredHackingLevel(ns.getCurrentServer()) <= ns.getHackingLevel() && ns.hasRootAccess(ns.getCurrentServer()) == true) {
					ns.print(path);
					ns.print("//////////////////////////////////////////////////");
					ns.print(ns.getCurrentServer() + " Install BackDoor");
					ns.print("//////////////////////////////////////////////////");
					await ns.installBackdoor();
				}
				ns.connect("home");
				function search(server, target, from) {
					if (server == target) {
						return target;
					}
					let nodes = ns.scan(server);
					for (let i = 0; i < nodes.length; i++) {
						let child = nodes[i];
						if (child == from) {
							continue;
						}
						if (child == target) {
							path.unshift(server);
							return path.unshift(target);
						}
						let children = ns.scan(server)
						if (children.length === 0) {
							continue;
						}
						let foundOn = search(child, target, server)
						if (foundOn != "") {
							path.unshift(server);
							return path.unshift(foundOn);
						}
					}
					return "";
				}
			}
			//レベルが足りてたらバックドアスクリプトを実行してから設置する
			if (ns.hasRootAccess(dic[i]) == true && Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)) >= 1 && ns.isRunning(SubHackScriptName, dic[i]) == false) {//ファイルを各サーバーに配置して実行する
				await ns.scp(SubHackScriptName, dic[i]);
				await ns.exec(SubHackScriptName, dic[i], Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)));
				ns.print("==================================================");
				ns.print("Start Hack to " + dic[i] + " on " + Math.floor(ns.getServerMaxRam(dic[i]) / ns.getScriptRam(SubHackScriptName)) + " threads");
				ns.print("==================================================");
			}
		}
		if (ns.getUpgradeHomeRamCost() < ns.getUpgradeHomeCoresCost() || ns.getUpgradeHomeCoresCost() <= 10011291503906250) {//メモリアップグレードのほうが安かったら
			if (ns.getUpgradeHomeRamCost() <= ns.getServerMoneyAvailable("home")) {//所持金でメモリをアップグレードできるか
				ns.upgradeHomeRam();//足りるので購入
				ns.tprint("Buy RAM");
			}
		} else {//コアアップグレードのほうが安かったら
			if (ns.getUpgradeHomeCoresCost() <= ns.getServerMoneyAvailable("home")) {//所持金でアップグレードできるか
				ns.upgradeHomeCores();//足りるので購入
				ns.tprint("Buy Cores");
			}
		}
		/*for (let i = 0; dic.length > i; i++) {
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
		}*/
		await ns.sleep(1000);
	}
}
