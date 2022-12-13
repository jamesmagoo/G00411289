## Mobile Applications Development - Project
#### Higher Diploma - Software Development - ATU
##### Innovation Documentation - G00411289 - James McGauran
***
### Share Button 
```home.ts, line 69, shareQuote()```

This share button allows the user to share the quote using Ionic framework 3’s ‘SocialSharing’ API. This will not be available unless on an actual device. In this case, the share button uses the browser’s built in Navigator API. If sharing is not possible, the button will at least copy the quote & author to the user's clipboard. 

### Refresh Button
```home.ts, line 60, refreshQuote()```

This button allows the user to re-generate the quote displayed by hitting the endpoint again.

### Environments
```src/environments/environment.ts & src/providers/players.ts,line 19```

The app uses Angular environments to allow for future configuration of keys, end-points, passwords etc. for different development environments such as production, staging etc. 

Docs: https://angular.io/guide/build
### Aesthetics
For application aesthetics for the UI & UX, the ATU logo has been added to the navbar as well as CSS styling to all pages. 
