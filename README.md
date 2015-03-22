#TrackwordApp Static Website
Content, build scripts and deployment process

#Setup
1. Install node

2. Install grunt cli globally
```
npm install -g grunt-cli
```

3. Install dependencies

	In project folder:

	```
	npm install
	```

#Build 
##For development (default)
```
grunt
```

##For production
```
grunt prod
```

#Deploy to S3
##Check files to sync (dry run)
```
aws s3 sync target s3://trackwordapp.com --exclude "*/*" --exclude "*.html" --delete --dryrun

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.html" --delete --content-type "text/html" --content-encoding gzip --cache-control max-age=1200 --dryrun

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.css" --delete --content-type "text/css" --content-encoding gzip --cache-control max-age=7776000 --dryrun

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.js" --delete --content-type "application/javascript" --content-encoding gzip --cache-control max-age=7776000 --dryrun

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.ico" --delete --cache-control max-age=86400 --dryrun

aws s3 sync target s3://trackwordapp.com --delete --cache-control max-age=7776000 --dryrun
```

##Perform sync
```
aws s3 sync target s3://trackwordapp.com --exclude "*/*" --exclude "*.html" --delete

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.html" --delete --content-type "text/html" --content-encoding gzip --cache-control max-age=1200

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.css" --delete --content-type "text/css" --content-encoding gzip --cache-control max-age=7776000

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.js" --delete --content-type "application/javascript" --content-encoding gzip --cache-control max-age=7776000

aws s3 sync target s3://trackwordapp.com --exclude "*" --include "*.ico" --delete --cache-control max-age=86400 --dryrun

aws s3 sync target s3://trackwordapp.com --delete --cache-control max-age=7776000
```