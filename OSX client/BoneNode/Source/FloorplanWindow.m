//
//  FloorplanWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 02-04-15.
//
//

#import "FloorplanWindow.h"
#import "PrefClockView.h"

@interface FloorplanWindow ()


@end

@interface NSUserNotification (CFIPrivate)
- (void)set_identityImage:(NSImage *)image;
@end

@implementation FloorplanWindow

- (void)windowDidLoad {
    [super windowDidLoad];
    [self.webView  setMainFrameURL:[self appURL]];
    [[self.webView windowScriptObject] setValue:self forKey:@"app"];
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivesetBBBNotification:)
                                                 name:@"setBBBNotification"
                                               object:nil];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receivesendserialNotification:)
                                                 name:@"sendserialNotification"
                                               object:nil];
}

- (NSString *)appURL {
    return @"http://192.168.7.2:4000/xcode/floorplan/";
}

+ (BOOL)isSelectorExcludedFromWebScript:(SEL)aSelector { return NO; }

- (void) receivesendserialNotification:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"sendserialNotification"])
    {
        id win = [self.webView windowScriptObject];
        NSString* str = [notification object];
        NSString* startstr = @"SendDueSerial('";
        NSString* endstr = @"')";
        NSString* strRR = [NSString stringWithFormat:@"%@%@%@", startstr, str, endstr];
        [win evaluateWebScript:strRR ];
    }
    
}

- (void) receivesetBBBNotification:(NSNotification *) notification
{
    if ([[notification name] isEqualToString:@"setBBBNotification"])
    {
        id win = [self.webView windowScriptObject];
        if ([[notification object] isEqualToString:@"setTimeDate"])
            [win evaluateWebScript:@"setBBBtime()"];
    }
    //NSLog(@"%@", [notification object]);
}

- (void)showNotification:(NSString *)message
{
    NSString *msgTitle = [[message componentsSeparatedByString:@";"] objectAtIndex:0];
    NSString *msgInfo = [[message componentsSeparatedByString:@";"] objectAtIndex:1];
    NSUserNotification *notification = [[NSUserNotification alloc] init];
    [notification setTitle:msgTitle];
    [notification setInformativeText:msgInfo];
    [notification set_identityImageHasBorder:NO];
    NSUserNotificationCenter *center = [NSUserNotificationCenter defaultUserNotificationCenter];
    [center setDelegate:self];
    [center deliverNotification:notification];
}

- (void)pushAllValues:(NSString *)message
{
    NSString *timedateString = @"";
    NSArray * words = [message componentsSeparatedByString:@"*"];
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        if ([varid  isEqual: @"1003"]){
            timedateString = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        }
        if ([varid  isEqual: @"1004"]){
            timedateString = [timedateString stringByAppendingString: @"*"];
            timedateString = [timedateString stringByAppendingString: [[word componentsSeparatedByString:@"#"] objectAtIndex:1]];
        }
    }
    //NSLog(@"%@", timedateString);
    [[NSNotificationCenter defaultCenter]postNotificationName:@"timedateNotification" object:timedateString];
    [[NSNotificationCenter defaultCenter]postNotificationName:@"MainNotification" object:message];
}

- (void)deviceChange:(NSString *)message
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"deviceChangeNotification" object:message];
    //NSLog(@"%@", message);
}

- (void)serverUpdate:(NSString *)message 
{
    [[NSNotificationCenter defaultCenter]postNotificationName:@"serverUpdateNotification" object:message];
    //NSLog(@"%@", message);
}

- (void)MAction01:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"runActionID('1')"];
}

- (void)MAction02:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"runActionID('2')"];
}

- (BOOL)userNotificationCenter:(NSUserNotificationCenter *)center shouldPresentNotification:(NSUserNotification *)notification
{
    return YES;
}

- (void)MenuUpdateDevices:(id)sender {
    id win = [self.webView windowScriptObject];
    [win evaluateWebScript:@"updateLayoutAll()"];
}

- (void) dealloc
{
    [[NSNotificationCenter defaultCenter] removeObserver:self];
    [super dealloc];
}

@end
