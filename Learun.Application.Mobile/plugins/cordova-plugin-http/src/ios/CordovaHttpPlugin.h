#import <Foundation/Foundation.h>

#import <Cordova/CDVPlugin.h>

@interface CordovaHttpPlugin : CDVPlugin

- (void)enableSSLPinning:(CDVInvokedUrlCommand*)command;
- (void)acceptAllCerts:(CDVInvokedUrlCommand*)command;
- (void)validateDomainName:(CDVInvokedUrlCommand*)command;
- (void)post:(CDVInvokedUrlCommand*)command;
- (void)get:(CDVInvokedUrlCommand*)command;
- (void)uploadFile:(CDVInvokedUrlCommand*)command;
- (void)downloadFile:(CDVInvokedUrlCommand*)command;

@end