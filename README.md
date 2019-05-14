# inVenture Frontend

This project is based on **React.js** and written in **TypeScript**, which is a typed superset of JavaScript.


## Installation

```bash
git clone https://github.com/utophii/inventure-frontend
cd inventure-frontend
npm config set @bit:registry https://node.bitsrc.io
npm install  # or `yarn`
```


## Directory Structure

```
- /public
  |- /fonts                 # fonts
  |- _redirects             # netlify redirect rules
  |- favicon.ico            # favicon
  |- index.html             # main html file
  |- manifest.json          # app manifest
  |- ... other files: images
- /src
  |- /colors                # Color class and predefined color schema
  |- /components            # Pages and components
     |- /Buttons            # ButtonLarge, ButtonSmall, BackButton
     |- /Dialog             # Material-ui dialog wrapper and text buttons
     |- /Firebase           # Firebase instance and context provider/consumer
     |- /Icons              # EdgeIcon wrapper
     |- /StartWorkout       # index (/workout/start), Timer, and RestTime(/workout/rest)
     |- /test               # test folder
     |- /Workout            # Workout related pages and components except Lixia's work
        |- AddWorkout, EditWorkout, index, PainSelection, ViewWorkout, WorkoutTable.tsx # Keonwoo's work
        |- profile.css, html, js # Waleed's work in HTML and CSS
        |- WorkoutType and WorkoutOption.tsx # Qilman's work transported into React
     |- App.[tsx|css]       # main app file
     |- BottomNavigator.[tsx|css] # Navigator at the bottom of the page
     |- BottomToolbar.tsx   # wrapper for buttons just above the bottom navigator, like mute and start buttons in view workout page
     |- CardWithPicture.tsx # Basic card component with picture, used in /workout, /profile, /friends/ranking etc.
     |- FirebaseDataPreloader.tsx # fetch data from firebase storage and db
     |- Friends.tsx         # /friends
     |- Link.tsx            # Wrapper for link, in order to change bottom tabs properly
     |- LongContent.tsx     # Lorem ipsum, just for test
     |- Profile.tsx         # /profile
     |- ProfileCard.tsx     # profile card at the top of the /profile page
     |- SectionSelector.tsx # Overview/Trends selector
     |- Slider.[tsx|css]    # slider for number input
  |- /i18n                  # partial work for i18n, translations and localization
  |- /stores                # containing all non-fixed data for the session of app
  |- /styles                # fonts, shadows, ...
  |- constants.ts           # exports transparent image for unloaded images
  |- index.[tsx|css]        # react main file
  |- utils.ts               # several helper functions
- ui
  |- body-type, ranking, workout-type # Qilman's original work in HTML and CSS
```
