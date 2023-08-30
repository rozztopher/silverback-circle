const express = require("express");
const app = express()
var cors = require('cors');
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
const {
    MerkleTree
} = require('merkletreejs');
const keccak256 = require('keccak256');
const whitelist = require('./whitelist.json');

function buf2hex(buffer) {

    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join("");
}

app.post("/getmarkelTree", (req, res) => {
    try {
        let {add} = req.body;
        console.log("add", add);
        const leaves = whitelist.map(x => keccak256(x))
        const tree = new MerkleTree(leaves, keccak256)
        const root = tree.getRoot()
        let hexroot = '0x' + buf2hex(root);
        hexroot = hexroot;
        const leaf = keccak256(add)
        const hexproof = tree.getProof(leaf).map(x => "0x" + buf2hex(x.data))
        const positions = tree.getProof(leaf).map(x => x.position === 'right' ? 1 : 0)

        res.status(200).json({
            status:"confirm",
            data:[
                {hexroot:hexroot},
                {hexproof:hexproof},
                {positions:positions}
            ]
        })

    } catch (e) {
        console.log("error while get markel tree", e);
    }
})


var PORT = process.env.PORT || 5005;

let server = app.listen(PORT, () => {
    console.log("Markel Tree server running on", PORT);
});
//@info server will be closed in case of any unhandledRejection
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
    server.close(() => process.exit(1));
});