class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

export default class BST {
    constructor(value) { this.root = new Node(value) }

    addNode(value) {
        value = parseInt(value)
        if (isNaN(value)) return

        if (value < this.root.value) this.root.left ? this.root.left.addNode(value) : this.root.left = new BST(value)
        else if (value > this.root.value) this.root.right ? this.root.right.addNode(value) : this.root.right = new BST(value)
    }

    inOrder() {
        if (this.root?.left) this.root.left.inOrder()
        console.log(this.root.value)
        if (this.root?.right) this.root.right.inOrder()
    }

    preOrder() {
        console.log(this.root.value)
        if (this.root.left) this.root.left.preOrder()
        if (this.root.right) this.root.right.preOrder()
    }

    postOrder() {
        if (this.root.left) this.root.left.postOrder()
        if (this.root.right) this.root.right.postOrder()
        console.log(this.root.value)
    }

    _searchNode(parent, child, value) {
        if (!child) return { parent: null, child: null }
        if (child.value === value) return { parent, child }
        return value < child.value ? this._searchNode(child, child.left?.root, value) : this._searchNode(child, child.right?.root, value)
    }

    _findInorderSuccessor() { 
        return this.root.left ? this.root.left._findInorderSuccessor() : this.root
    }

    deleteNode(value) {
        const { parent, child } = this._searchNode(null, this.root, value)
        
        if (!child) return

        //Delete a Leaf Node
        if (!child.left && !child.right) {
            parent.left?.root?.value === value ? parent.left = null : parent.right = null
            return
        }

        //Delete a double child Node
        if (child.left && child.right) {
            const successor = child.right._findInorderSuccessor()
            child.value = successor.value
            successor.value++ //change value so it doesn't match with parent
            this.deleteNode(successor.value)
            return
        }

        //Delete a single child Node
        if (!child.left || !child.right)
            parent.value < child.value ? parent.right = child.left || child.right : parent.left = child.left || child.right
    }

    updateNode(value, updatedValue) {
        this.deleteNode(value)
        this.addNode(updatedValue)
    }
}