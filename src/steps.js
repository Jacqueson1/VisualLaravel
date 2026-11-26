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
  }
];