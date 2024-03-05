import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

var posts = []
app.get("/", (req, res) => {
    res.render('index.ejs', { posts });
})
app.get('/new', (req, res) => {
    res.render('new-post.ejs');
});

app.post('/new', (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content };
    posts.push(newPost);
    res.redirect('/');
});

app.get('/edit/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    res.render('edit-post.ejs', { id, post });
});

app.post('/edit/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    posts[id] = { title, content };
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    posts.splice(id, 1);
    res.redirect('/');
});

app.listen(port, (req, res) => {
    console.log("Listening on port " + port);
})