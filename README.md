# Tram notifier
Arduino device notifies about when the next tram departs.

First version:
 - [x] Print next departure of the station "Eppelheimer Strasse".
 - [x] Print periodically.
 - [x] Only print departures in the right direction.
 - [ ] Calculate how much time is left until the next tram departs.
 - [x] Show different status before the tram comes. Notification 12-8 minutes before, urgency 8-5 minutes before. Show not-worth-it if there is more than 12 minutes or less than 5 minutes.
 - [ ] Enable wifi connection (instead of cable connection).

## Versions
###  0.1.0
Initial version. Displays the status on three (red/yellow/green) LEDs to notify when to leave the house. Many values are hard-coded: led pins, RNV url, tram station and request interval.
###  0.1.1
Fix display status after a network connection was interrupted.

