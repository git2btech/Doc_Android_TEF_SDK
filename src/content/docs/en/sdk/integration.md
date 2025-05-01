---
title: SDK Integration
---

Once you get access to the SDK file, you can integrate it into your Android app in three simple steps: 

1 - Copy the SDK file to some folder within your android application project, for example `./app/libs/` 

2 - Add the SDK to the dependencies of the project's gradlew file (`./app/build.gradle.kts`) 

``` 
//... 
implementation(files("libs/lib-release.aar")) 
//... 
``` 

_(make sure you use the same path from where you copied the SDK .aar file)_ 

3 - To make HTTP requests from the SDK we depend on a library that must also be added to the project dependencies (`./app/build.gradle.kts`) 

``` 
//... 
implementation(platform("com.squareup.okhttp3:okhttp-bom:4.12.0")) 

implementation("com.squareup.okhttp3:okhttp") 
implementation("com.squareup.okhttp3:logging-interceptor") 
//... 
``` 

That's it, you can start using the SDK!