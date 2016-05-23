# Eventwindow: a web app for event management

This project is still in development.
(So is this readme.)

Eventwindow is an open-source web app designed to help small and non-profit organizations host events (like meetings, lectures, and classes),
 by providing a system for scheduling events, assigning and managing resources for those events, and visualizing the needs of upcoming events
 as they approach in time.
 
# What is it exactly?
 
Eventwindow is a RESTful application designed to be easily customized and embedded into existing company intranets or webpages. It consists
of two central components: an event visualizer, which displays information about upcoming events in several different views 
(currently under development) and an event information page, unique to each event, which is used to create, edit, and approve
events and their required resources, such as catering, parking spaces, or A/V equipment (not yet implmented).

This repository includes a backend built with Express and MongoDB, but to embed Eventwindow in a website implementing a different backend, one would simply need to field GET, POST, and DELETE requests
for events (and users, if I'm feeling brave) using their server and database of choice.

(more detailed description of the API to follow.)



