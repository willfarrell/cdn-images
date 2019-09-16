# CDN Images
Manipulate images on the fly

## Features
- Compress images
- Resize images
- Convert image formats
- `Client-Hints` support

### Conversions
From | SVG | JPEG | PNG | WEBP | GIF | WEBM
-----|-----|------|-----|------|-----|------
SVG  | Yes | Yes  | Yes | Yes  | ??? | ???
JPEG | No  | Yes  | Yes | Yes  | ??? | ???
PNG  | No  | Yes  | Yes | Yes  | ??? | ???
WEBP | No  | Yes  | Yes | Yes  | ??? | ???
GIF  | No  | Yes  | Yes | Yes  | ??? | ???
WEBM | No  | ???  | ??? | ???  | ??? | ??? 

#### TODO
- {JPEG,PNG,WEBP,GIF} => GIF
  - https://github.com/lovell/sharp/issues/245
  - https://github.com/lovell/sharp/issues/1372
  - https://www.npmjs.com/package/gifsicle-stream
- GIF => WEBM
- MP4 => GIF

## API
`/img/${fileName}.${srcExt}`

- `fm`: Output Image Format `{svg,jpeg,png,webp,gif}`. Default: `${srcExt}`
- `w`: Width
- `h`: Height
- `bg`: Background Color w/ alpha. Default: `rgba(0,0,0,1)`
- `grayscale`: Cast image to grayscale. Default: `false`
- `fit`: What resize operation to do {`cover`,`contain`,`fill`,`inside`,`outside`}

### TODO
- `c`: Color manipulation to apply `rgba` or `grayscale`. Default `none`
- `pos`: Where to center the image for the `fit` operation {`n`,`ne`,`e`,`se`,`s`,`sw`,`w`,`nw`, `face`, `center`}. Default `center`
- `pad`: Adds padding around image `n,e,s,w` in `px`. Default: `0,0,0,0`
- `trim`: Remove boring pixels from edges. Default: `false`

### APIs
- https://docs.imgix.com/apis/url
- https://sirv.com/demos/dynamic-imaging/

## Deployment
### Prerequisites
- node v10.x
- Codeship jet cli

### Deploying

1. Setup your AWS infra with `S3` and `CloudFront`
1. `jet steps --stage=develop`
1. Connect your new API Gateway to an origin path on you CloudFront

## Built With
- [sharp](https://sharp.pixelplumbing.com/en/stable/)
- [svgo](https://github.com/svg/svgo)
- [middy.js](https://middy.js.org)
- serverless
- terraform

## Wishlist
- GIF support
- Boost performance, switch to Fargate?
- position to face
  - opencv4nodejs

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/willfarrell/cdn-images/tags). 

## Authors

* **will Farrell** - *Initial work* - [willfarrell](https://github.com/willfarrell)

See also the list of [contributors](https://github.com/willfarrell/cdn-images/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
