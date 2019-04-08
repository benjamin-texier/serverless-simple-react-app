# Créer une fonction LAMBDA

## Ressources

- [Bucket S3](https://.....com)
- [Application React.JS](https://....cloudfront.net)
- [Send Mail Function](https://.....com/dev/send-mail)
- [Database Functions](https://....com/dev/list)

## Sommaire

- [Créer une fonction LAMBDA](#cr%C3%A9er-une-fonction-lambda)
  - [Ressources](#ressources)
  - [Sommaire](#sommaire)
  - [Configuration avec le provider](#configuration-avec-le-provider)
    - [Configuration avec serverless](#configuration-avec-serverless)
    - [Configuration avec aws configure](#configuration-avec-aws-configure)
    - [Créer son application](#cr%C3%A9er-son-application)
    - [La mettre sur un bucket S3](#la-mettre-sur-un-bucket-s3)
      - [CLI](#cli)
      - [Makefile](#makefile)
      - [Rendre public le bucket](#rendre-public-le-bucket)
      - [Ecriture du code React.JS](#ecriture-du-code-reactjs)
      - [Ajout des URLs dans src/config.js](#ajout-des-urls-dans-srcconfigjs)


## Configuration avec le provider

### Configuration avec serverless

```sh
$> serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
```

### Configuration avec aws configure

```sh
$> aws configure
AWS Access Key ID [****************UKWA]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [****************4E1V]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: eu-west-1
Default output format [None]: ENTER
```

### Créer son application

```sh
$> npm init react-app my-app 
$> code .
```

### La mettre sur un bucket S3

#### CLI

```sh
$> aws s3api create-bucket --bucket ${bucketname} --region ${region}
$> aws s3 sync build/ s3://${bucketname}
```

#### Makefile

```makefile
$> vim Makefile


all: clean build deploy

clean:
	rm -rf ./build

build:
	yarn build

serve:
	serve -s build

deploy:
	aws s3 sync build/ s3://${bucketname}

```

#### Rendre public le bucket

```json
{
    "Version": "2008-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Principal": {
                "AWS": "*"
            },
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${bucketname}/*"
        }
    ]
}
```

#### Ecriture du code React.JS

... de la même façon qu'une application classique

#### Ajout des URLs dans src/config.js