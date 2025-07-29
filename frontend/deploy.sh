#!/bin/bash

# Deploy script for S3 Static Website
# Usage: ./deploy.sh [bucket-name] [aws-profile]

BUCKET_NAME=${1:-"your-bucket-name"}
AWS_PROFILE=${2:-"default"}
BUILD_DIR="build"

echo "🚀 Starting deployment to S3..."
echo "Bucket: $BUCKET_NAME"
echo "AWS Profile: $AWS_PROFILE"

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
    echo "❌ Build directory not found. Running build first..."
    npm run build
fi

# Sync static assets with long cache
echo "📦 Uploading static assets..."
aws s3 sync $BUILD_DIR/static s3://$BUCKET_NAME/static \
    --profile $AWS_PROFILE \
    --cache-control "max-age=31536000,public" \
    --delete

# Sync other files (excluding HTML) with medium cache
echo "📦 Uploading other assets..."
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME \
    --profile $AWS_PROFILE \
    --exclude "*.html" \
    --exclude "static/*" \
    --cache-control "max-age=86400,public" \
    --delete

# Sync HTML files with no cache
echo "📦 Uploading HTML files..."
aws s3 sync $BUILD_DIR s3://$BUCKET_NAME \
    --profile $AWS_PROFILE \
    --exclude "*" \
    --include "*.html" \
    --cache-control "max-age=0,no-cache,no-store,must-revalidate" \
    --delete

# Create CloudFront invalidation if distribution ID is provided
if [ ! -z "$3" ]; then
    echo "🔄 Creating CloudFront invalidation..."
    aws cloudfront create-invalidation \
        --profile $AWS_PROFILE \
        --distribution-id $3 \
        --paths "/*"
fi

echo "✅ Deployment completed successfully!"
echo "🌐 Your app should be available at: http://$BUCKET_NAME.s3-website-us-east-1.amazonaws.com"
