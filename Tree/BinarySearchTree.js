/*
* @Author: bluedoor
* @Date:   2017-04-04 18:50:50
* @Last Modified by:   bluedoor
* @Last Modified time: 2017-04-04 22:53:08
*/

'use strict';
function BinarySearchTree () {
	function Node (ele) {
		this.element = ele;
		this.left = null;
		this.right = null;
	}
	var root = null;

	this.insert = function (ele) {
		var node = new Node(ele);
		if (root === null) {
			root = node;
		} else {
			insertNode(root, node);
		}

	}
	function insertNode (root, node) {
		if (node.element < root.element) {
			if (root.left === null) {
				root.left = node;
			} else {
				insertNode(root.left,node);
			}
		} else {
			if (root.right === null) {
				root.right = node;
			} else {
				insertNode(root.right,node);
			}
		}
	}

	this.print = function () {
		console.log(root);
	}

// 遍历
	
	// 中序遍历
	this.inOrderTraverse = function (callback) {
		inOrderTraverseNode(root, callback);
	}

	function inOrderTraverseNode (node,callback) {
		if (node !== null) {
			inOrderTraverseNode(node.left, callback);
			callback(node.element);
			inOrderTraverseNode(node.right, callback);
		}
	}

	// 先序遍历
	this.preOrderTraverse = function (callback) {
		preOrderTraverseNode(root, callback);
	}

	function preOrderTraverseNode (node, callback) {
		if (node !== null) {
			callback(node.element);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	}

	// 后序遍历
	this.postOrderTraverse = function (callback) {
		postOrderTraverseNode(root, callback);
	}
	function postOrderTraverseNode (node, callback) {
		if (node !== null) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.element);
		}
	}

	// 获取最左边的值，最右边的值
	this.leftValue = function () {
		return leftNode(root);
	}
	function leftNode (node) {
		if (node) {
			while (node && node.left !== null) {
				node = node.left;
			}
			return node.element;
		} else {
			return null;
		}
	}

	this.rightValue = function () {
		return rightNode(root);
	}
	function rightNode (node) {
		if (node) {
			while (node && node.right !== null) {
				node = node.right;
			}
			return node.element;
		} else {
			return null;
		}
	}
	// 搜索
	this.search = function (ele) {
		return searchNode(root, ele);
	}
	function searchNode (node, ele) {
		if (node === null) {
			return false;
		}
		if (ele < node.element) {
			return searchNode(node.left, ele);
		} else if (ele > node.element) {
			return searchNode(node.right, ele);
		} else {
			return true;
		}
	}

	// 移除
	this.remove = function () {}
}