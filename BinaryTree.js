let { Node } = require('./Node');

exports.BinaryTree = class BinaryTree {
    constructor(comparator) {
        this.comparator = comparator;
        this.root = null;
    }

    insert(str) {
        let node = new Node(str);

        if (!this.root) {
            this.root = node;
        } else {
            let current = this.root;

            while (current) {
                if (this.comparator(node.str, current.str)) {
                    if (!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else if (this.comparator(current.str, node.str)) {
                    if (!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                } else {
                    throw Error(`This tree already contains '${str}'`);
                }
            }
        }
    }

    remove(str) {
        let that = this;

        let removeNode = function(node, str) {
            if (!node) {
                throw Error(`This tree does not contain '${str}'`);
            }

            if (that.comparator(str, node.str)) {
                node.left = removeNode(node.left, str);
                return node;
            } else if (that.comparator(node.str, str)) {
                node.right = removeNode(node.right, str);
                return node;
            } else {
                if (!node.left && !node.right) {
                    return null;
                }
                if (!node.left) {
                    return node.right;
                }
                if (!node.right) {
                    return node.left;
                }

                let temp = node.right;
                while (temp.left) {
                    temp = temp.left;
                }
                node.str = temp.str;
                node.right = removeNode(node.right, temp.str);
                return node;
            }
        };

        this.root = removeNode(this.root, str);
    }

    exists(str) {
        let current = this.root;

        while (current) {
            if (this.comparator(str, current.str)) {
                current = current.left;
            } else if (this.comparator(current.str, str)) {
                current = current.right;
            } else {
                return true;
            }
        }

        return false;
    }

    height() {
        let findHeight = function(node) {
            if (node == null) {
                return 0;
            }

            let left = findHeight(node.left);
            let right = findHeight(node.right);

            if (left > right) {
                return left + 1;
            } else {
                return right + 1;
            }
        };
        return findHeight(this.root);
    }

    toArray() {
        let traverse = function(node) {
            if (node) {
                traverse(node.left);
                result.push(node.str);
                traverse(node.right);
            }
        };

        let result = [];
        traverse(this.root);
        return result;
    }
};

exports.cmp = function cmp(str1, str2) {
    return str1 < str2;
};
