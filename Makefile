all: clean build deploy

create:
	aws s3api create-bucket --bucket ${bucketname} --region ${region}
	
start:
	yarn start

clean:
	rm -rf ./build

build:
	yarn build

serve:
	serve -s build

deploy:
	aws s3 sync build/ s3://${bucketname}