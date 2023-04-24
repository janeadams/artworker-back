![Artworker Logo](logos-01.png)

# ArtWorker

Artworker is a React-based social networking platform designed for curators and artists who are passionate about art and who are looking for a convenient way to share their collections and network with other professionals in the industry.

With Artworker, users can easily create accounts and connect with other users to discover and curate a wide range of artworks, from classical paintings to modern sculptures. The platform allows users to create their own virtual galleries and share them with other users, providing a unique and personalized experience for each curator and artist.

Artworker is also designed to help artists promote their artwork to a wider audience, with features such as tagging and sharing options. Curators can follow their favorite artists to discover new and emerging talents and keep up-to-date with their latest works.

In addition to sharing and curating art, Artworker is also designed to help users expand their professional networks. Users can connect with other curators and artists from around the world, share their expertise, and collaborate on projects.

Overall, Artworker is a vibrant community of art lovers, curators, and artists who share a passion for the world of art. Whether you're an established curator, a budding artist, or just a lover of beautiful works of art, Artworker is the perfect platform for you to share, explore, and connect with others who share your interests.

## API Endpoints

| Endpoint                                          | Description                                         |
| -------------------------------------------------- | --------------------------------------------------- |
| `POST /api/users/login`                           | Login user with credentials                         |
| `POST /api/users/logout`                          | Logout user                                         |
| `GET /api/users/profile`                          | Get authenticated user's profile                    |
| `POST /api/users/register`                        | Register a new user                                  |
| `GET /api/users`                                  | Get a list of all users                              |
| `GET /api/users/:id`                              | Get user by ID                                      |
| `DELETE /api/users/:id`                           | Delete user by ID                                   |
| `POST /api/users`                                 | Create a new user                                    |
| `PUT /api/users/:id`                              | Update user by ID                                    |
| `POST /api/users/:id/likes/:artworkId`            | Add a like to an artwork for a user                  |
| `POST /api/users/:id/dislikes/:artworkId`         | Remove a like from an artwork for a user             |
| `GET /api/users/:id/likes`                        | Get a list of liked artworks for a user              |
| `POST /api/users/:followerId/follows/:followedId` | Follow a user                                       |
| `DELETE /api/users/:followerId/follows/:followedId`| Unfollow a user                                    |
| `GET /api/users/:id/followees`                    | Get a list of users that the user follows           |
| `GET /api/users/:id/followers`                    | Get a list of users that follow the user            |
| `GET /api/artworks`                                | Get a list of all artworks                           |
| `GET /api/artworks/:id`                            | Get artwork by ID                                    |
| `DELETE /api/artworks/:id`                         | Delete artwork by ID                                 |
| `POST /api/artworks`                               | Create a new artwork                                 |
| `PUT /api/artworks/:id`                            | Update artwork by ID                                 |

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.