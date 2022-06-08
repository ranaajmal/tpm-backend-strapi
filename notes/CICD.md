# CICD
git add .
git commit -m ""
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
git add README.md
git commit -m ""
git branch -M master

# Heroku:
git remote add origin https://github.com/ranaajmal/api4students-strapi-backend.git
git push -u origin master