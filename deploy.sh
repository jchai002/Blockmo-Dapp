yarn build
git add .
git commit -m 'update production build'
git push origin master
bundle exec cap production deploy
