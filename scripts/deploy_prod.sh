NODE_ENV=production
rm -rf build
npm run build
cd build
aws --profile kai-s3-deploy-prod s3 rm s3://kai-production-chat-ui/ --recursive
aws --profile kai-s3-deploy-prod s3 cp . s3://kai-production-chat-ui/ --recursive
echo
echo
echo
echo "Deployed successfully."