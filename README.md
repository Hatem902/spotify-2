I fully designed and built this Spotify 2.0 web-app with Next.Js, using the Spotify API.

• Succinct demo-video of this app: https://youtu.be/Mb2SNHR5uNs

• Comprehensive demo-video that showcases extensively all the different Features (Authentication, Responsiveness and more …): https://youtu.be/mwd5kUdRO6s

• The Spotify API (amazing API by the way) : https://developer.spotify.com/documentation/web-api/

• Shots of my Own Design of Spotify 2.0:
https://drive.google.com/drive/folders/1OvYzlXyMdV1DWCspP__mR4-7osbg7iUd?usp=sharing

• The latency in Playback & Volume control in Spotify 2.0 surpasses that of the Real Spotify by only 3% (almost as fast as Real Spotify). This delay is due to Request Debouncing which drastically reduces the maximum number of API calls in a short period of time: a necessary technique to prevent getting Timed-out by the Spotify API.


• The percentage of bugged Playback is as low as 0.2% (Most of these bugs are related to the Spotify API itself).

• Live demo link: https://spotify-2-theta.vercel.app/ 
  N.B: Spotify made a guideline such that you can only link one account at a time to your Spotify build that uses the Spotify API. So only my account can be logged in. I can change the linked account to another account (it must be a Premium Spotify account). And if I do, then the newly linked account can log-in to my app but mine no longer can. Spotify made this guideline to prevent developers from potentially creating harmful competition to Spotify using the Spotify API.


## The different techniques I Implemented throughout this build:

• Fetching Spotify Playlists + Controlling Music playback with the Spotify API + debouncing requests.

• User authentication with Real Spotify & Next-Auth to persist user's logged-in state, using Access & Refresh OAuth JSON Web Tokens (JWT) + Authenticated user access with the Next.js 12 Middleware.

• Utilizing Custom Hooks alongside the React useState & useEffect hooks. 

• Utilizing Environment Variables both locally and post-deployment on Vercel.

• Managing global states with Recoil.

• Utilizing Chakra UI and Framer Motion to make the app look clean and gorgeous (Clean Animations & Responsiveness).

---------------------------------------------------------------

If you want to run the code locally, make sure to make an .env.local file under the spotify-2-0 directory and add in these global variables :

NEXTAUTH_URL= (localhost link : http://localhost:3000 )
NEXT_PUBLIC_CLIENT_SECRET= (your client_secret)
NEXT_PUBLIC_CLIENT_ID= (your client_id)
JWT_SECRET= some_secret_value
