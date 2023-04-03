## Spotify 2.0
I fully designed and developed a Spotify web-app with Next.Js, using the Spotify API

## The different techniques Implemented throughout this build

• Fetching Spotify Playlists + Controlling Music playback with the Spotify API + Debouncing requests.

• User authentication with Real Spotify & Next-Auth to persist user's logged-in state, using Access & Refresh OAuth JSON Web Tokens (JWT) + Authenticated user access with the Next.js 12 Middleware.

• Utilizing Custom Hooks alongside the React useState & useEffect hooks. 

• Utilizing Environment Variables both locally and post-deployment on Vercel.

• Managing global states with Recoil.

• Framer Motion for clean animations.

---------------------------------------------------------------

## Demo

• [Succinct demo-video](https://youtu.be/Mb2SNHR5uNs) :

[![Succinct demo-video link](https://img.youtube.com/vi/Mb2SNHR5uNs/maxresdefault.jpg)](https://www.youtube.com/watch?v=Mb2SNHR5uNs)




• [Comprehensive demo-video](https://youtu.be/mwd5kUdRO6s) that showcases extensively all the different Features (Authentication, Responsiveness and more …) 

• [Shots of my Own Design of Spotify 2.0:](https://www.behance.net/gallery/157371967/My-Design-of-Spotify)

[![Succinct demo-video link](https://user-images.githubusercontent.com/81896805/229578491-3bd35cb7-33c5-4f8d-b66e-797d7672beee.png)](https://www.behance.net/gallery/157371967/My-Design-of-Spotify)


• [The Spotify API](https://developer.spotify.com/documentation/web-api/) (amazing API by the way)

• The latency in Playback & Volume control in Spotify 2.0 surpasses that of the Real Spotify by only 3% (almost as fast as Real Spotify). This delay is due to Request Debouncing which drastically reduces the maximum number of API calls in a short period of time: a necessary technique to prevent getting Timed-out by the Spotify API.


• The percentage of bugged Playback is as low as 0.2% (Most of these bugs are related to the Spotify API itself).

• [Website](https://spotify-2-theta.vercel.app/)
  N.B: Spotify made a guideline such that you can only link one account at a time to your Spotify build that uses the Spotify API. So only my account can be logged in. I can change the linked account to another account (it must be a Premium Spotify account). And if I do, then the newly linked account can log-in to my app but mine no longer can. Spotify made this guideline to prevent developers from potentially creating harmful competition to Spotify using the Spotify API.


  
---------------------------------------------------------------

To run the code locally, make sure to make an .env.local file under the spotify-2-0 directory and to add in these global variables :

NEXTAUTH_URL= (localhost link : http://localhost:3000 )
NEXT_PUBLIC_CLIENT_SECRET= (your client_secret)
NEXT_PUBLIC_CLIENT_ID= (your client_id)
JWT_SECRET= some_secret_value
