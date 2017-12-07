npm run build
rsync -r build_webpack/ docs/
rsync build/contracts/Blockmo.json docs/
git add .
git commit -m "Adding frontend files to Github Pages"
git push
