export default class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }

    addNode(value) {
        value = parseInt(value)
        if (isNaN(value)) return
        if (value < this.value) this.left ? this.left.addNode(value) : this.left = new Node(value)
        else if (value > this.value) this.right ? this.right.addNode(value) : this.right = new Node(value)
    }

    inOrder() {
        if (this.left) this.left.inOrder()
        console.log(this.value)
        if (this.right) this.right.inOrder()
    }

    preOrder() {
        console.log(this.value)
        if (this.left) this.left.preOrder()
        if (this.right) this.right.preOrder()
    }

    postOrder() {
        if (this.left) this.left.postOrder()
        if (this.right) this.right.postOrder()
        console.log(this.value)
    }

    _searchNode(parent, child, value) {
        if (!child) return null

        if (child.value === value) return { parent, child }
        return value < child.value ? this._searchNode(child, child.left, value) : this._searchNode(child, child.right, value)
    }

    _findInorderSuccessor() {
        return this.left ? this.left._findInorderSuccessor() : this
    }

    deleteNode(value) {
        const { parent, child } = this._searchNode(null, this, value)
        if (!child) return

        //Delete a Leaf Node
        if (!child.left && !child.right) {
            parent.left.value === value ? parent.left = null : parent.right = null
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