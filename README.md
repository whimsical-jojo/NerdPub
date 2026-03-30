This is the final project for the Generation Italy Java Developer Course. It's a website for a ficticious Pub chain where the user can also book and play boardgames. 
Because I am a huge nerd and I've been given too much creative liberty but at the same time not enough. 

KNOWN ISSUES / BUGS TO FIX:

- Updating the Username on the profile page throws exceptions in the back end and behaves oddly in the front end due to the username being used for some checks and
in the UserDetails. The Username still gets updated in the db, at least. 
- Using an expired JWT also makes a mess in the back end instead of being ignored and treated as unauthorized, and the temporary fix is clearing localStorage and
simply reloading the page.
- Some UI inconsistencies due to Material having different colors.
- Some things are written in Italian and some in English
- The project is still not as cool and technically complex as I wanted it to be.

TODO: 
- Add Admin page lkjhgfjydrtyuiop';lkjhgfdsertyuijklm,
- Add check on the number of places on the front end, so that it shows 5/6 for example instead of just the total "6"
- Cry in a corner
- Make sure only the Admin can ban users and change people's roles and such. Or make Roles final.
- Add way way more training data
- Add a Staff role which is connected to a single pub, so that global admins are not needed to add tables to pubs lmao
- Add a cool little map feature that lets users choose a pub by position
- Images for the games
- Send actual emails (wow) for account creation
- Hit my head against a practically physically tangible wall of random Angular errors I didn't know existed
- Try to explain myself while I present an unfinished mess of a project
- Pat myself on the back
- Finish this alone after the course is done
