//
//  FloorplanWindow.h
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h> 

@interface FloorplanWindow : NSWindowController
@property (assign) IBOutlet id webView;
@property(nonatomic, readonly, strong) WebScriptObject *windowScriptObject;
- (NSString *)appURL;

- (void) receivesetBBBNotification:(NSNotification *) notification;

- (void)showNotification:(NSString *)message;
- (void)pushAllValues:(NSString *)message;
- (void)deviceChange:(NSString *)message;
- (void)serverUpdate:(NSString *)message;

- (void)MAction01:(id)sender;
- (void)MAction02:(id)sender;

- (void)MenuUpdateDevices:(id)sender;


@end

