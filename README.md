# log-parser
parsing nginx access.log and error.log

#### INSTALL
``` 
git clone https://github.com/dahaaw/log-parser.git
cd log-parser
npm install
npm install -g .
```

#### BASIC USAGE

```
hamdan <log path> [option]
```

#### LOG PATH
path of log file, example:
```
hamdan ./examplelog/access.log [option]
hamdan ./examplelog/error.log [option]
```

#### OPTIONS

```
-t Desired format file (json or txt)  Default: txt
-o Destiation file path   Default: ./result/log[-t]
```
