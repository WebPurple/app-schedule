# Web Purple Web Site

## How to start the project?
***
## Fork repo
Fork [repo](https://github.com/WebPurple/app-schedule) to you own git hub account.
***

## Clone or download
Clone your own repo by git:
```
git clone https://github.com/rakotoz/app-schedule.git
```
or download it and unzip to the folder
---
***
## Install dependencies
Open the folder with a project and use
```
npm install
```
or 
```
yarn install
```
via terminal
***
## Install Android studio

Download an [android studio](https://developer.android.com/studio/) and install it.

>## **Important!</font>**
> Check that Hyper-V is enabled on your PC and HAXM is installed

## Install adb

* Download the [Windows zip](https://dl.google.com/android/repository/platform-tools-latest-windows.zip) from Google.
* Extract it somewhere - for example, %USERPROFILE%\adb-fastboot
* Open the Start menu, and type “advanced system settings”
* Select “View advanced system settings”
* Click on the Advanced tab
* Open the “Environment Variables” window
* Select the Path variable under “System Variables” and click the * “Edit” button
* Click the “Edit Text” button
* Append ;%USERPROFILE%\adb-fastboot\platform-tools to the end of the existing Path definition (the semi-colon separates each path entry)
* Install the [universal adb driver](https://github.com/koush/UniversalAdbDriver)
* Reboot your PC