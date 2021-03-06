class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        } else if (key < this.key) {
            /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
                this.left.insert(key, value);
            }
        }
        // Similarly, if the new key is greater than the node's key
        //  then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        } else if (key < this.key && this.left) {
            /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            } else if (this.left) {
                /* If the node only has a left child, 
               then you replace the node with its left child */
                this._replaceWith(this.left);
            } else if (this.right) {
                /* And similarly if the node only has a right child 
               then you replace it with its right child */
                this._replaceWith(this.right);
            } else {
                /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }
}

//3. Create a BST Class
let BST = new BinarySearchTree();
BST.insert(3);
BST.insert(1);
BST.insert(4);
BST.insert(7);
BST.insert(9);
BST.insert(2);
BST.insert(5);
BST.insert(6);
BST.insert(2);

//letters have a numeric value. you can call in javascript
//“A”.charCodeAt() to tell you the numeric value.
// console.log('E'.charCodeAt())
// console.log('A'.charCodeAt())
// console.log('S'.charCodeAt())
// console.log('Y'.charCodeAt())
// console.log('Q'.charCodeAt())
// console.log('U'.charCodeAt())
// console.log('E'.charCodeAt())
// console.log('S'.charCodeAt())
// console.log('T'.charCodeAt())
// console.log('I'.charCodeAt())
// console.log('O'.charCodeAt())
// console.log('N'.charCodeAt())

let otherBST = new BinarySearchTree();
otherBST.insert(69, 'E');
otherBST.insert(65, 'A');
otherBST.insert(83, 'S');
otherBST.insert(89, 'Y');
otherBST.insert(81, 'Q');
otherBST.insert(85, 'U');
otherBST.insert(69, 'E');
otherBST.insert(83, 'S');
otherBST.insert(84, 'T');
otherBST.insert(73, 'I');
otherBST.insert(79, 'O');
otherBST.insert(78, 'N');

function tree(t) {
    if (!t) {
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right);
}
//console.log(BST);
//console.log(otherBST);


//5. Height of a BST
function BSTHeight(tree) {
    if (!tree) {
        return 0;
    } else {
        let left = BSTHeight(tree.left);
        let right = BSTHeight(tree.right);

        if (left > right) {
            return left + 1;
        } else return right + 1;
    }
}
//console.log(BSTHeight(otherBST));
//console.log(BSTHeight(BST));


// 6. Is it a BST?
//BST needs:
////left subtree keys will be less than root node key
////right subtree keys will be more than root node key
////both subtrees must also be BST
function isaValidBST(node, min = null, max = null) {
    if (!node) return true;
    if (max !== null && node.key >= max) {
        return false;
    }
    if (min !== null && node.key <= min) {
        return false;
    }
    const leftSide = isaValidBST(node.left, min, node.key);
    const rightSide = isaValidBST(node.right, node.key, max);

    return leftSide && rightSide;
}
//console.log(isaValidBST(BST));
//true
//console.log(isaValidBST(otherBST))
//false - has duplicates


//7. 3rd largest node
function thirdLargestNode(tree, maxValues = []) {
    if (!tree) {
        return '';
    }

    if (tree.right) {
        maxValues.push(tree.right);
        thirdLargestNode(tree.right, maxValues);
    } else if (maxValues.length < 3 && tree.left) {
        maxValues.push(tree.left);
        thirdLargestNode(tree.left, maxValues);
    } else return maxValues;

    return maxValues[0];
}
//console.log(thirdLargestNode(BST));


//8. Balanced BST
function isBalanced(tree) {
    if (!tree) {
        return 0;
    } else {
        let left = BSTHeight(tree.left);
        let right = BSTHeight(tree.right);

        if (left - right > 1 || left - right < -1) {
            return false;
        } else return true;
    }
}
//console.log(isBalanced(BST))


// 9. Are they the same BSTs?
function sameBSTs(aL1, aL2) 
    { 
    // Base cases 
    if (aL1.length !== aL2.length) 
        return false; 
    if (aL1.length === 0) 
        return true; 
    if (aL1[0] !== aL2[0]) 
        return false; 

    // Construct two lists from each input array. The first 
    // list contains values smaller than first value, i.e., 
    // left subtree. And second list contains right subtree. 
    let aLLeft1 = []; 
    let aLRight1 = []; 
    let aLLeft2 = []; 
    let aLRight2 = []; 

    for (let i = 1; i < aL1.length; i++)  
        { 
            if (aL1[i] < aL1[0]) 
                aLLeft1.push(aL1[i]); 
            else
                aLRight1.push(aL1[i]); 

            if (aL2[i] < aL2[0]) 
                aLLeft2.push(aL2[i]); 
            else
                aLRight2.push(aL2[i]); 
    } 

    // Recursively compare left and right subtrees. 
    return sameBSTs(aLLeft1, aLLeft2) && sameBSTs(aLRight1, aLRight2); 
} 

console.log(sameBSTs([3, 5, 4, 6, 1, 0, 2], [3, 1, 5, 2, 4, 6, 0]));
console.log(sameBSTs([3, 2, 5, 4, 6, 1, 0], [3, 1, 5, 2, 4, 6, 0]));

//true, false