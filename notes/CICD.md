# CICD
git add .
git commit -m "first commit"
git push origin master
git push heroku master

# #########################################################
# Heroku:
$ heroku login
$ cd my-project/
$ git init
$ heroku git:remote -a api4students

git add .
git commit -m ""
git push heroku master
# #########################################################
# Github:
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/ranaajmal/api4students-strapi-backend.git
git push -u origin master