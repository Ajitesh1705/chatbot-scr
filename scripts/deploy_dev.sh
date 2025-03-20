NODE_ENV=development
rm -rf build
npm run build:dev
cd build
aws --profile kai-s3-deploy-dev  s3 rm s3://kai-development-chat-ui/ --recursive
aws --profile kai-s3-deploy-dev  s3 cp . s3://kai-development-chat-ui/ --recursive
echo
echo
echo
echo "Deployed successfully."