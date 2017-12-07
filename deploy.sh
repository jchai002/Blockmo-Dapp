yarn build
git add .
git commit -m 'add production build'
git push origin master
bundle exec cap production deploy
