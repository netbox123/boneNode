//
//  FloorplanWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "FloorplanWindow.h"

@interface FloorplanWindow ()


@end

@implementation FloorplanWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    [self.webView  setMainFrameURL:[self appURL]];

    [[self.webView windowScriptObject] setValue:self forKey:@"app"];
}

- (NSString *)appURL {
    return @"http://192.168.7.2:4000/xcode/floorplan/";
}

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector { return NO; }

- (void)showMessage:(NSString *)message
{
    NSRunAlertPanel(@"Message from JavaScript", message, nil, nil, nil);
}

- (void)MAction01:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"SendDueSerial('37-off-0;36-off-0;24-off-0;30-off-0;25-off-0;23-off-0;31-off-0;26-off-0;28-off-0;33-off-0;35-off-0;27-off-0;39-off-0;32-off-0;34-off-0;29-off-0;')"];
}

- (void)MAction02:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"SendDueSerial('37-on-100;36-on-100;23-on-100;31-on-100;')"];
}

@end
