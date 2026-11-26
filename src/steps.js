export const steps = [
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
        file: 'app/Models/Post.php',
        lang: 'php',
        caption: 'Valid data goes to the Post model. Eloquent turns this one line into SQL for you.',
        code: `Post::create($data);`
    },
    {
        title: 'A row is saved',
        at: 4,
        row: true,
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