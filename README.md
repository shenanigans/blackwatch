Blackwatch Military Academy
===========================
*A lovingly hand-crafted website about [Overwatch](https://playoverwatch.com)*

A preview of the site can be found [here](http://blackwatch.hopto.org/).

Please Donate!
-------------
There are no plans to host advertisements or monetize this site in any other way. The plan is to pay
for hosting costs with small individual donations from the community. If you're excited by this
project and want to support it, simply [click here.](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=PN6C2AZTS2FP8&lc=US&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted)
Anything you can give will be *enormously* appreciated.

How To Contribute
-----------------
In order to author changes to the site, you'll need a few tools to get its template engine running.
I'm assuming you have a Windows machine, since you play Overwatch. You will need to download and
install the following:

 * [git-scm](https://git-scm.com/downloads) which comes with the hand-dandy mingw console environment (if in doubt, use default install options)
 * [node.js](https://nodejs.org/en/)

Open the folder you wish to work in. We will be creating a directory called `blackwatch` at this
location that contains all the project files. Right click in an empty part of the window and select
"git bash here". Then enter the following two commands:

```bash
git clone https://github.com/shenanigans/blackwatch
cd blackwatch
```

This will download the entire project into a new directory called `blackwatch`, then step the
"current working directory" pointer of your console into that directory. Now to finish setting
everything up, just type

```bash
npm install
```

Congrats! All the tools are now ready to go. When you're ready to begin working on the site, simply
run these two commands:

```bash
./dev_server.js &
./compile.js
```


LICENSE
-------
The MIT License (MIT)

Copyright (c) 2017 Kevin "Schmidty" Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
