API Basejump: URL Shortener Microservice

User stories:

I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

When I visit that shortened URL, it will redirect me to my original link.

Example creation usage:

https://short1.herokuapp.com/new/https://www.google.com

https://short1.herokuapp.com/new/http://freecodecamp.com/news

Example creation output:

{ "original_url": "http://freecodecamp.com/news", "short_url": "https://short1.herokuapp.com/4" }

Usage:

https://short1.herokuapp.com/4

Will redirect to:

http://freecodecamp.com/news
