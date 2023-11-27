# Assignment 1 - ReactJS app.

Name: [Adam Cahill]

## Overview.

[This is my React CA 1. It is a modfied Movie App from our Labs that includes a couple of new feature along with a variety of search options ]

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]
 
+ Dark Mode
+ Global Search
+ Sign In/Sign out
+ Watch List
+ In Cinema
+ Top Rated
+ Movie Traier in the details page
+ Where to buy and rent from in movie details
+ Pagination(Not Fully Working)


## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

e.g.
+ Discover list of movies - discover/movie
+ Movie details - movie/:id
+ Movie genres = /genre/movie/list
+ Now Playing = /movie/now_playing
+ Top Rated = /movie/top_rated
+ SearchMovies = /search/movie
+ UpComing Movies = /movie/upcoming
+ Watch Providers = /movie/:id/watch/providers
+ Movie Trailers = /movie/:id/videos

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]

+ /blogs - displays all published blogs.
+ /blogs/:id - displays a particular blog.
+ /blogs/:id/comments - detail view of a particular blog and its comments.
+ etc.

[If relevant, state what aspects of your app are protected (i.e. require authentication) and what is public.]

Watchlist - A user must be signed in to view the watch list web page


## Independent learning (If relevant).

Itemize the technologies/techniques you researched independently and adopted in your project,
i.e. aspects not covered in the lectures/labs. Include the source code filenames that illustrate these
(we do not require code excerpts) and provide references to the online resources that helped you (articles/blogs).


For me I found it very difficult to get the pagination to work. I couldnt really find a solid source to help me with it and it took up most of my time.
I got it partially working but it does not allow the user to go back to the previous page and from looking at the console there is some weird data that is getting passed to the the templateMoviePaginationListPage thus the reason why i only decided to add it to the homepage as it is kinda messy. Some of the sources I used as guied was stackoverflow and youtube with none of them really helping me out to much. 

For the google auth I didnt find it to bad but did run out of time so it was not implement as much as i would of liked. The source I used to help me with this was from https://ariangarshi.medium.com/how-to-use-firebase-for-google-authentication-in-a-react-js-in-2022-78171a235404 written by Arian Garshi


Everything else I was kinda able to get through myself as I had a small bit of experience with doing simialar stuff when I use to develop in a game called FiveM that is a client that runs off GTA5 which has alot of ui focused scripts that uses javascript and works together with lua.