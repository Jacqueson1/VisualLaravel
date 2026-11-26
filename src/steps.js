const createSteps = [
  {
    title: 'What is CRUD?',
    at: 0,
    file: 'CRUD',
    lang: 'php',
    caption: 'Almost every app does four things with data: Create, Read, Update, Delete. Laravel maps each one to an HTTP verb. We will follow one Create request.',
    code: `// Create  -> POST
// Read    -> GET
// Update  -> PUT / PATCH
// Delete  -> DELETE`
  },
  {
    title: 'The browser sends a request',
    at: 0,
    set: { method: 'POST', url: '/posts' },
    file: 'resources/views/posts/create.blade.php',
    lang: 'xml',
    caption: 'You fill in a form and press Save. The browser sends a POST request to /posts.',
    code: `<form method="POST" action="/posts">
  @csrf
  <input name="title">
  <button>Save</button>
</form>`
  },
  {
    title: 'The route matches',
    at: 1,
    file: 'routes/web.php',
    lang: 'php',
    caption: 'Laravel finds a POST route on /posts and knows which controller method to call.',
    code: `Route::post('/posts', [PostController::class, 'store']);`
  },
  {
    title: 'The controller receives it',
    at: 2,
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'The store method runs. It gets the request object, which holds everything the user sent.',
    code: `public function store(Request $request)
{
    // $request->title is what the user typed
}`
  },
  {
    title: 'Validation can reject it',
    at: 2,
    fail: true,
    set: { validation: 'failed' },
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'If the title is empty, validate() stops here. The request goes back to the form with errors and never reaches the database.',
    code: `$data = $request->validate([
    'title' => 'required|max:255',
]);`
  },
  {
    title: 'The model talks to the database',
    at: 3,
    set: { validation: 'passed' },
    file: 'app/Models/Post.php',
    lang: 'php',
    caption: 'Valid data goes to the Post model. Eloquent turns this one line into SQL for you.',
    code: `Post::create($data);`
  },
  {
    title: 'A row is saved',
    at: 4,
    row: true,
    set: { queries: '1' },
    file: 'SQL that Eloquent runs',
    lang: 'sql',
    caption: 'The database inserts a new row into the posts table.',
    code: `INSERT INTO posts (title, created_at, updated_at)
VALUES ('My first post', NOW(), NOW());`
  },
  {
    title: 'Redirect back to a page',
    at: 5,
    row: true,
    set: { status: '302' },
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'The controller redirects the browser to the posts list, which now shows the new post.',
    code: `return redirect('/posts');`
  },
  {
    title: 'Recap',
    at: 0,
    file: 'The whole Create flow',
    lang: 'php',
    caption: 'Request, route, controller, validation, model, database, redirect. Read, Update and Delete follow the same path with different verbs.',
    code: `POST /posts
  -> Route
  -> PostController@store
  -> validate()
  -> Post::create()
  -> INSERT
  -> redirect('/posts')`
  }
];

const readSteps = [
  {
    title: 'What is Read?',
    at: 0,
    file: 'CRUD',
    lang: 'php',
    caption: 'Read means fetching data without changing it. Laravel uses GET for it. We will follow a request for the list of posts.',
    code: `// Read -> GET /posts   (list)
// Read -> GET /posts/1 (one post)`
  },
  {
    title: 'The browser asks for the page',
    at: 0,
    set: { method: 'GET', url: '/posts' },
    file: 'resources/views/layout.blade.php',
    lang: 'xml',
    caption: 'You click a link. The browser sends a GET request to /posts. There is no form and no data to send.',
    code: `<a href="/posts">All posts</a>`
  },
  {
    title: 'The route matches',
    at: 1,
    file: 'routes/web.php',
    lang: 'php',
    caption: 'This time Laravel looks for a GET route on /posts. It points to the index method.',
    code: `Route::get('/posts', [PostController::class, 'index']);`
  },
  {
    title: 'The controller runs index',
    at: 2,
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'index() has one job: collect the data the page needs, then hand it to a view.',
    code: `public function index()
{
    // fetch posts, then show them
}`
  },
  {
    title: 'The model fetches the posts',
    at: 3,
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'The Post model asks the database for all posts, newest first.',
    code: `$posts = Post::latest()->get();`
  },
  {
    title: 'The database runs a SELECT',
    at: 4,
    set: { queries: '1' },
    stream: { from: 4, to: 5, count: 5 },
    file: 'SQL that Eloquent runs',
    lang: 'sql',
    caption: 'Nothing is changed. The database only reads rows and returns them.',
    code: `SELECT * FROM posts
ORDER BY created_at DESC;`
  },
  {
    title: 'The view receives the data',
    at: 5,
    file: 'app/Http/Controllers/PostController.php',
    lang: 'php',
    caption: 'The controller passes the posts to a Blade view.',
    code: `return view('posts.index', compact('posts'));`
  },
  {
    title: 'The view renders the list',
    at: 5,
    set: { status: '200' },
    file: 'resources/views/posts/index.blade.php',
    lang: 'xml',
    caption: 'Blade loops over the posts and builds the HTML. That HTML is the response the browser shows.',
    code: `@foreach ($posts as $post)
  <h2>{{ $post->title }}</h2>
@endforeach`
  },
  {
    title: 'Recap',
    at: 0,
    file: 'The whole Read flow',
    lang: 'php',
    caption: 'GET request, route, controller, model, SELECT, view. Compared with Create: no validation and no INSERT.',
    code: `GET /posts
  -> Route
  -> PostController@index
  -> Post::latest()->get()
  -> SELECT
  -> view('posts.index')`
  }
];

export const lessons = [
  {
    id: 'create',
    name: 'Create',
    title: 'How Laravel creates a post',
    tagline: 'Follow one request from the browser to the database.',
    chips: [
      { key: 'method', label: 'Method' },
      { key: 'url', label: 'URL' },
      { key: 'validation', label: 'Validation' },
      { key: 'queries', label: 'DB queries' },
      { key: 'status', label: 'Status' }
    ],
    steps: createSteps
  },
  {
    id: 'read',
    name: 'Read',
    title: 'How Laravel reads posts',
    tagline: 'Follow a GET request and see the data come back.',
    chips: [
      { key: 'method', label: 'Method' },
      { key: 'url', label: 'URL' },
      { key: 'queries', label: 'DB queries' },
      { key: 'status', label: 'Status' }
    ],
    steps: readSteps
  }
];