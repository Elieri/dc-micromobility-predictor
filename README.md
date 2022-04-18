# MUSA 611 Final Project: D.C. Micromobility Predictor

This project draws from my Master of Urban Spatial Analytics capstone project, in which I scrape real-time shared dockless scooter and ebike location data with the aim of predicting time to activation -- that is, how much longer a parked vehicle is likely to remain inactive -- using survival modeling. The repo for that project can be found [here](https://github.com/CPLN-680-Spring-2022/ericson_elisabeth_micromobility).

## Project Proposal

When I lived in D.C., I liked to use shared dockless vehicles to explore parts of the city that I couldn't easily walk to, or when I was running late for work and didn't want to wait for the bus. Because I didn't live on the National Mall or right downtown, I couldn't always count on finding a convenient scooter or ebike in my neighborhood -- and even if an app showed a scooter a short walk away, I'd sometimes get there only to find someone else snagged it before me. 

For my capstone project, I'm scraping real-time vehicle location data and developing a machine learning model to predict how much longer an individual dockless vehicle will be available. For this project, I'm proposing an interactive web app that will allow a user to view real-time availability predictions for inactive vehicles nearby.

### Features

- On navigating to the site, the user will see a zoomed-out map of all currently available D.C. area dockless e-bikes and scooters, color coded by provider.

- The user will be able to select which providers' vehicles to show on the map, which will filter and update accordingly. (Alternatively, the user could be prompted to select which providers to show _before_ displaying the zoomed-out map.)

- The user will be prompted to provide a location, whether by clicking directly on the map, by granting permission to share their current location with the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API), or by typing in an address to be autocompleted by something like the [Mapbox Geocoding API](https://docs.mapbox.com/playground/geocoding/).

- The site will validate that the entered location is within the service area of the D.C. vehicle providers, and will prompt the user to enter a different location if it's not.

- If the location is valid, the map will zoom to show the closest vehicles to those coordinates. That might mean showing the closest _n_ vehicles or a fixed extent representing (some subjective measure of) a reasonable walking distance, but may have to vary depending on how dense the area is and how many vehicles are nearby.

- When the user selects one of the vehicles, the site will use my capstone project model to generate a real-time prediction for how much longer the vehicle is likely to be available, use something like the [Mapbox Directions API](https://docs.mapbox.com/api/navigation/directions/) to estimate the walking time from the user's location to the vehicle, and display a tooltip showing whether the vehicle is likely to still be available by the time the user has walked there.

- Another possible feature could be to allow the user to enter a custom departure or arrival time, rather than assuming an immediate departure.

### Concerns

- Vehicle coordinates are not necessarily stable; due to GPS error, a static vehicle may jitter on the map. Vehicle IDs are not necessarily stable; depending on vendor privacy policies, a static vehicle may receive a new randomized ID every 30 minutes.

- What happens if a vehicle is activated and disappears from the inactive vehicles dataset while a user is looking at the map, or at the tooltip for that vehicle?

- This honestly seems like a lot, and I don't know how to do most of it. I'm sure I could figure most of it out eventually, but I am less sure I can do so in the next two weeks.