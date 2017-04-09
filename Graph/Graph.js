/*
* @Author: bluehezi
* @Date:   2017-04-08 21:52:45
* @Last Modified by:   bluehezi
* @Last Modified time: 2017-04-09 13:49:11
*/

'use strict';
function Graph (Dictionary, Queue, Stack) {
	var vertices = [];
	var adjList = new Dictionary();	

	this.addVertex = function (v) {
		vertices.push(v);
		adjList.set(v,[]);
	}

	this.addEdge = function (v, w) {
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	}

	this.toString  = function () {
		var str = '';
		for (var i = 0; i < vertices.length; i++) {
			str += vertices[i] + ' -> ';
			var neighbors = adjList.get(vertices[i]);
			for (var j = 0; j < neighbors.length; j++) {
				str += neighbors[j] + ' ';
			}
			str += '\n';
		}
		return str;
	}

	/**
	 * 广度优先搜索算法 Breadth-First-Search
	 * @param  {[type]}   V        [广度优先搜索算法需要从一个顶点开始]
	 * @param  {Function} callback [回调函数]
	 * @return {[type]}            [undefined]
	 */
	this.bfs = function (V, callback) {
		var colors = initializeColor(),
			queue = new Queue();
			queue.enqueue(V);

			while (!queue.isEmpty()) {
				var vt = queue.dequeue(),
					neighbors = adjList.get(vt);

				for (var i = 0; i < neighbors.length; i++) {
					if (colors[neighbors[i]] === 'white') {
						queue.enqueue(neighbors[i]);
						colors[neighbors[i]] = 'grey';
					}
				}
				if (callback) {
					callback(vt);
				}
				colors[vt] = 'black';
			}
	}


	/**
	 * 利用广度优先搜索算法找最小路径
	 * @param {[type]} V [广度优先搜索算法需要从一个顶点开始]
	 */
	this.BFS = function (V) {
		var colors = initializeColor(),
			queue = new Queue(),
			d = [],  // 路径数
			pred = []; // 每个节点的前溯节点
		queue.enqueue(V);
		for (var i = 0; i < vertices.length; i++) {
			d[vertices[i]] = 0;
			pred[vertices[i]] = null;
		}

		while (!queue.isEmpty()) {
			var vt = queue.dequeue(),
				neighbors = adjList.get(vt);

			for (var i = 0; i < neighbors.length; i++) {
				var w = neighbors[i];
				if (colors[w] === 'white') {
					colors[w] = 'grey';
					pred[w] = vt;
					d[w] = d[vt] + 1;
					queue.enqueue(w);
				}
			}
			colors[vt] = 'black';
		}
		return {
			distance: d,
			predecessors: pred
		};
	}

	this.shortPathV = function (v) {
		var fromVertex = v;
		var shortestPathA = this.BFS(fromVertex);
		for (var i = 0; i < vertices.length; i++) {
			if (fromVertex === vertices[i]) {
				continue;
			}
			var toVertex = vertices[i],
				path = new Stack();

			for (var vt = toVertex; vt !== fromVertex; vt = shortestPathA.predecessors[vt]) {
				path.push(vt);
			}
			path.push(fromVertex);

			var s = path.pop();
			while (!path.isEmpty()) {
				s += '-' + path.pop(); 
			}
			console.log(s);
		}
	}

	// 搜索算法需要用颜色反映节点状态
	//  white ： 表示该顶点还没有被访问
	//  grey : 表示该顶点被访问过但没有被搜索过
	//  black : 表示该定点被访问过且完全被搜索过 
	function initializeColor () {
		var colors = [];
		for (var i = 0; i < vertices.length; i++) {
			colors[vertices[i]] = 'white';
		}
		return colors;
	}



}
