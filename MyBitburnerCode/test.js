/**
* @param {NS} ns
**/
export async function main(ns) {
	/*let start_server = ns.scan(ns.getHostname());
	start_server.splice(start_server.indexOf("darkweb"), 1);
	let all_server = [...start_server];
	for (let i = 0; i < start_server.length; i++) {
		let server1 = ns.scan(start_server[i]);
		if (server1.length > 0) {
			all_server = all_server.concat(server1);
			for (let j = 0; j < server1.length; j++) {
				let server2 = ns.scan(server1[j]);
				if (server2.length > 0) {
					all_server = all_server.concat(server2);
					for (let k = 0; k < server2.length; k++) {
						let server3 = ns.scan(server2[k]);
						if (server3.length > 0) {
							all_server = all_server.concat(server3);
							for (let l = 0; l < server3.length; l++) {
								let server4 = ns.scan(server3[l]);
								if (server4.length > 0) {
									all_server = all_server.concat(server4);
									for (let m = 0; m < server4.length; m++) {
										let server5 = ns.scan(server4[m]);
										if (server5.length > 0) {
											all_server = all_server.concat(server5);
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	let all = [...new Set(all_server)];
	all.splice(all.indexOf("home"), 1);
	ns.disableLog("ALL");
	for (let i = 0; i < all.length; i++) {
		let m = ns.getServerMaxMoney(all[i]);
		ns.print("Server:" + all[i] + "     MaxMoney:" + m);
	}
	ns.enableLog("ALL");
	await ns.sleep(100000);*/





	//Uses a DFS to find the path to the specified server and then prints the path
	//to Terminal.

	//The target server's HOSTNAME must be a string passed in as an argument to the script.
	//It is CASE-SENSITIVE.
	//If an invalid hostname is passed the script will probably just run forever.

	/*let target = ns.args[0];

	let visited = [];
	let stack = [];
	let parentTracker = [];
	let origin = ns.getHostname();
	stack.push(origin);

	while (stack.length > 0) {
		let node = stack.pop();
		ns.print("DFS processing server " + node);
		if (visited.includes(node)) {
			//Do nothing. Essentially a "continue" but that doesn't exist yet
		} else {
			if (node == target) { break; }
			visited.push(node);
			let nextNodes = ns.scan(node);
			for (let i = 0; i < nextNodes.length; ++i) {
				stack.push(nextNodes[i]);

				//Keep track of the nodes "parent" so we can re-create the path
				//Ignore entries that start at the origin
				if (nextNodes[i] != origin) {
					let pair = [nextNodes[i], node];
					parentTracker.push(pair);
				}
			}
		}
	}

	ns.print("Target found. About to re-create path");
	ns.print("parentTracker size: " + parentTracker.length);
	let path = [];
	let i = target;
	while (i != ns.getHostname()) {
		path.push(i);
		ns.print("Re-creating path at " + i);

		//Search through the parentTracker array to find this nodes parent
		for (let j = 0; j < parentTracker.length; ++j) {
			let pair = parentTracker[j];
			if (pair[0] == i) {
				i = pair[1];
				break;
			}
		}
	}

	path.reverse();
	ns.tprint(path);//Uses a DFS to find the path to the specified server and then prints the path
	//to Terminal.

	//The target server's HOSTNAME must be a string passed in as an argument to the script.
	//It is CASE-SENSITIVE.
	//If an invalid hostname is passed the script will probably just run forever.

	target = args[0];

	visited = [];
	stack = [];
	parentTracker = [];
	origin = ns.getHostname();
	stack.push(origin);

	while (stack.length > 0) {
		node = stack.pop();
		ns.print("DFS processing server " + node);
		if (visited.includes(node)) {
			//Do nothing. Essentially a "continue" but that doesn't exist yet
		} else {
			if (node == target) { break; }
			visited.push(node);
			nextNodes = ns.scan(node);
			for (let i = 0; i < nextNodes.length; ++i) {
				stack.push(nextNodes[i]);

				//Keep track of the nodes "parent" so we can re-create the path
				//Ignore entries that start at the origin
				if (nextNodes[i] != origin) {
					pair = [nextNodes[i], node];
					parentTracker.push(pair);
				}
			}
		}
	}

	ns.print("Target found. About to re-create path");
	ns.print("parentTracker size: " + parentTracker.length);
	path = [];
	i = target;
	while (i != ns.getHostname()) {
		path.push(i);
		ns.print("Re-creating path at " + i);

		//Search through the parentTracker array to find this nodes parent
		for (let j = 0; j < parentTracker.length; ++j) {
			pair = parentTracker[j];
			if (pair[0] == i) {
				i = pair[1];
				break;
			}
		}
	}

	path.reverse();
	ns.tprint(path);*/


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
	ns.tprint("Scanned " + all.length + " Server.\n" + "Server list\n" + all);
	ns.print("Scanned " + all.length + " Server.\n" + "Server list\n" + all);
	ns.enableLog("ALL");
}
