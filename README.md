# FitBuddy by inVenture (CS374 team design project)


<p align="center">
  <img width="512" height="256" src="https://i.imgur.com/LVRcCIj.png">
</p>
<p align="center"><b>FitBuddy</b> is a web-based software that helps you to do the workout in a proper and entertaining way.</p>
<br>
<br>

This project is based on **React.js** and written in **TypeScript**, which is a typed superset of JavaScript.

## Working Product
[URL to the product hosted by Netlify](https://inventure-kaist.netlify.com)


## Final Video
[URL to a short video introducing the product hosted by Youtube](https://www.youtube.com/watch?v=1q5I0CXh9KY)


## Reports

* [Design Project 1](https://hackmd.io/wliGf1vxQUKs9a2AyHPRuw)
* [Design Project 2](https://hackmd.io/9iN1IJifT1C-obLjEBqbvQ)
* [Design Project 3](https://hackmd.io/X4x2BRiPSI2jciVsdcQF2Q)
* [Design Project 4](https://hackmd.io/pzr_99hiROOJDebGDbMh4A)
* There was no report for the Design Project 5
* [Design Project 6](https://hackmd.io/0Ts9aN3mSYGs0CLxARp1Gg)
* [Design Project 7](https://hackmd.io/-Vw09J9CSwCGU4xnp9SX-A)
* [Design Project 8](https://hackmd.io/YqnkKH_BS8eQ4tZHMexKFQ)

## Installation

```bash
git clone https://github.com/utophii/inventure-frontend
cd inventure-frontend
npm config set @bit:registry https://node.bitsrc.io
yarn  # or `npm install`
```

## Dependencies
See [package.json](package.json).

## Directory Structure

```
- /public
  |- /fonts                                                 # fonts
  |- _redirects                                             # netlify redirect rules
  |- favicon.ico                                            # favicon
  |- index.html                                             # main html file
  |- manifest.json                                          # app manifest
  |- ... other files: images
- /src
  |- /colors                                                # Color class and predefined color schema
  |- /components                                            # Pages and components
     |- /Buttons                                            # ButtonLarge, ButtonSmall, BackButton
     |- /Dialog                                             # Material-ui dialog wrapper and text buttons
     |- /Firebase                                           # Firebase instance and context provider/consumer
     |- /Icons                                              # EdgeIcon wrapper
     |- /StartWorkout                                       # index (/workout/start), Timer, and
                                                              RestTime(/workout/rest)
     |- /test                                               # test folder
     |- /Workout                                            # Workout related pages and components except
                                                              Lixia's works
        |- AddWorkout, EditWorkout, index, PainSelection,
           ViewWorkout, WorkoutTable.tsx                    # Keonwoo's works
        |- profile.css, html, js                            # Waleed's works in HTML and CSS
        |- WorkoutType and WorkoutOption.tsx                # Qilman's works transported into React
     |- App.[tsx|css]                                       # main app file
     |- BottomNavigator.[tsx|css]                           # Navigator at the bottom of the page
     |- BottomToolbar.tsx                                   # wrapper for buttons just above the bottom navigator,
                                                              like mute/start buttons in view workout page
     |- CardWithPicture.tsx                                 # Basic card component with picture, used in /workout,
                                                              /profile, /friends/ranking etc.
     |- FirebaseDataPreloader.tsx                           # fetch data from firebase storage and db
     |- Friends.tsx                                         # /friends
     |- Link.tsx                                            # Wrapper for link, in order to change bottom tabs properly
     |- LongContent.tsx                                     # Lorem ipsum, just for test
     |- Profile.tsx                                         # /profile
     |- ProfileCard.tsx                                     # profile card at the top of the /profile page
     |- SectionSelector.tsx                                 # Overview/Trends selector
     |- Slider.[tsx|css]                                    # slider for number input
  |- /i18n                                                  # partial work for i18n, translations and localization
  |- /stores                                                # containing all non-fixed data for the session of app
  |- /styles                                                # fonts, shadows, ...
  |- constants.ts                                           # exports transparent image for unloaded images
  |- index.[tsx|css]                                        # react main file
  |- utils.ts                                               # several helper functions
- ui
  |- body-type, ranking, workout-type                       # Qilman's original work in HTML and CSS
```
