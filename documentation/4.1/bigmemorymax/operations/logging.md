---
---
# Logging {#Logging}

{toc|2:3}

## Introduction
BigMemory Max uses the SLF4J logging facade, so you can plug in your own logging framework. This page covers Ehcache logging. For more information about slf4j in general, refer to the [SLF4J](http://www.slf4j.org) site.

## SLF4J Logging {#SLF4J-Logging}
With SLF4J, users must choose a concrete logging implementation at deploy time. The options include Maven and the download kit.

### Concrete Logging Implementation Use in Maven
The maven dependency declarations are reproduced here for convenience. Add *one* of these to your Maven POM.

    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-jdk14</artifactId>
        <version>1.5.8</version>
    </dependency>
     <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
        <version>1.5.8</version>
    </dependency>
     <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-simple</artifactId>
        <version>1.5.8</version>
    </dependency>

### Concrete Logging Implemenation Use in the Download Kit
The slf4j-api jar is in the kit along with the BigMemory Max jars so that, if the app does not already use SLF4J, you have everything you need.
Additional concrete logging implementations can be downloaded from [SLF4J website](http://www.slf4j.org).

## Recommended Logging Levels
BigMemory Max seeks to trade off informing production support developers or important messages and cluttering the log. <a id="ERROR"></a>ERROR messages should not occur in normal production and indicate that action should be taken.

<a id="WARN"></a>WARN messages generally indicate a configuration change should be made or an unusual event has occurred. DEBUG and TRACE messages are for development use. All DEBUG level statements are surrounded with a guard so that no performance cost is incurred unless the logging level is set. Setting the logging level to DEBUG should provide more information on the source of any problems. Many logging systems enable a logging level change to be made without restarting the application.
