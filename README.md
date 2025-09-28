### Api Endpoints

| Module      | Method | Endpoint                  | Body / Params                                                                    | Description                        |
| ----------- | ------ | ------------------------- | -------------------------------------------------------------------------------- | ---------------------------------- |
| **User**    | POST   | `/api/v1/user/create`     | `{ name, email, password, role? }`                                               | Create a new user                  |
|             | PATCH  | `/api/v1/user/:id`        | `{ name?, password?, role? }`                                                    | Update a user by ID                |
| **Blog**    | POST   | `/api/v1/blog/create`     | `{ title, content, published, authorId }`                                        | Create a new blog                  |
|             | GET    | `/api/v1/blog/`           | Query params: `page`, `limit`                                                    | Get all blogs with pagination      |
|             | GET    | `/api/v1/blog/:id`        | `id`                                                                             | Get a single blog by ID            |
|             | PATCH  | `/api/v1/blog/:id`        | `{ title?, content?, published? }`                                               | Update a blog by ID                |
|             | DELETE | `/api/v1/blog/:id`        | `id`                                                                             | Delete a blog by ID                |
| **Project** | POST   | `/api/v1/project/create`  | `{ title, description, thumbnail, projectLink, liveSite, features[], authorId }` | Create a new project               |
|             | GET    | `/api/v1/project/:id`     | `id`                                                                             | Get a single project by ID         |
|             | GET    | `/api/v1/project/`        | Query params: `page`, `limit`                                                    | Get all projects                   |
|             | PUT    | `/api/v1/project/:id`     | `{ title?, description?, thumbnail?, projectLink?, liveSite?, features? }`       | Update a project by ID             |
|             | DELETE | `/api/v1/project/:id`     | `id`                                                                             | Delete a project by ID             |
| **About**   | POST   | `/api/v1/about/create`    | `{ authorId, name, email, phone, bio, skills[], linkedin?, github?, twitter? }`  | Create About Me section            |
|             | GET    | `/api/v1/about/:authorId` | `authorId`                                                                       | Get About Me section by user ID    |
|             | PATCH  | `/api/v1/about/:authorId` | `{ name?, email?, phone?, bio?, skills?, linkedin?, github?, twitter? }`         | Update About Me section by user ID |
|             | DELETE | `/api/v1/about/:authorId` | `authorId`                                                                       | Delete About Me section by user ID |
